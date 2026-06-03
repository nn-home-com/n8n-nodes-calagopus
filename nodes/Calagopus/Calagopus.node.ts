import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { ApplicationError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import {
	commonProperties,
	defaultBodyModeByOperation,
	operationByValue,
	operationProperties,
	resourceOptions,
} from './operations';

function parseJsonParameter(value: string, parameterName: string): IDataObject {
	if (value.trim() === '') {
		return {};
	}

	const parsed = JSON.parse(value) as unknown;

	if (parsed === null || Array.isArray(parsed) || typeof parsed !== 'object') {
		throw new ApplicationError(`${parameterName} must be a JSON object`);
	}

	return parsed as IDataObject;
}

function normalizePath(path: string): string {
	if (path.startsWith('/')) {
		return path;
	}

	return `/${path}`;
}

function toJsonObject(response: unknown): IDataObject {
	if (response === undefined || response === null) {
		return { success: true };
	}

	if (Array.isArray(response)) {
		return { data: response };
	}

	if (typeof response === 'object') {
		return response as IDataObject;
	}

	return { data: response };
}

function parseMultilineList(value: string): string[] {
	return value
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter((line) => line.length > 0);
}

function addStringIfNotEmpty(
	body: IDataObject,
	key: string,
	value: string,
): void {
	if (value.trim() === '') {
		return;
	}

	body[key] = value;
}

function buildStructuredBody(
	this: IExecuteFunctions,
	operationValue: string,
	itemIndex: number,
): IDataObject {
	const body: IDataObject = {};

	switch (operationValue) {
		case 'clientServer.sendCommand':
			addStringIfNotEmpty(
				body,
				'command',
				this.getNodeParameter('consoleCommand', itemIndex, '') as string,
			);
			break;

		case 'clientServer.setPowerState':
			body.action = this.getNodeParameter('powerAction', itemIndex, 'start') as string;
			break;

		case 'serverBackups.create':
			addStringIfNotEmpty(
				body,
				'name',
				this.getNodeParameter('backupName', itemIndex, '') as string,
			);
			body.ignored_files = parseMultilineList(
				this.getNodeParameter('backupIgnoredFiles', itemIndex, '') as string,
			);
			break;

		case 'serverBackups.restore':
			body.truncate_directory = this.getNodeParameter(
				'truncateDirectory',
				itemIndex,
				false,
			) as boolean;
			body.restore_startup = this.getNodeParameter(
				'restoreStartup',
				itemIndex,
				false,
			) as boolean;
			break;

		case 'serverBackups.update':
			addStringIfNotEmpty(
				body,
				'name',
				this.getNodeParameter('backupName', itemIndex, '') as string,
			);
			body.locked = this.getNodeParameter('backupLocked', itemIndex, false) as boolean;
			break;

		case 'serverDatabases.create':
			addStringIfNotEmpty(
				body,
				'name',
				this.getNodeParameter('databaseName', itemIndex, '') as string,
			);
			addStringIfNotEmpty(
				body,
				'database_host_uuid',
				this.getNodeParameter('databaseHostUuidBody', itemIndex, '') as string,
			);
			break;

		case 'serverDatabases.update':
			body.locked = this.getNodeParameter('databaseLocked', itemIndex, false) as boolean;
			break;

		case 'serverSettings.install':
			body.truncate_directory = this.getNodeParameter(
				'truncateDirectory',
				itemIndex,
				false,
			) as boolean;
			break;

		case 'serverSettings.rename':
			addStringIfNotEmpty(
				body,
				'name',
				this.getNodeParameter('serverName', itemIndex, '') as string,
			);
			addStringIfNotEmpty(
				body,
				'description',
				this.getNodeParameter('serverDescription', itemIndex, '') as string,
			);
			break;

		case 'serverSettings.updateAutoKill':
			body.enabled = this.getNodeParameter('autoKillEnabled', itemIndex, false) as boolean;
			body.seconds = this.getNodeParameter('autoKillSeconds', itemIndex, 30) as number;
			break;

		case 'serverSettings.updateAutoStart':
			body.behavior = this.getNodeParameter(
				'autoStartBehavior',
				itemIndex,
				'unless_stopped',
			) as string;
			break;

		case 'serverSettings.updateTimezone':
			addStringIfNotEmpty(
				body,
				'timezone',
				this.getNodeParameter('serverTimezone', itemIndex, '') as string,
			);
			break;

		case 'serverStartup.updateCommand':
			addStringIfNotEmpty(
				body,
				'command',
				this.getNodeParameter('startupCommand', itemIndex, '') as string,
			);
			break;

		case 'serverStartup.updateDockerImage':
			addStringIfNotEmpty(
				body,
				'image',
				this.getNodeParameter('startupDockerImage', itemIndex, '') as string,
			);
			break;
	}

	return body;
}

export class Calagopus implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Calagopus',
		name: 'calagopus',
		icon: { light: 'file:calagopus.svg', dark: 'file:calagopus.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Calagopus API',
		defaults: {
			name: 'Calagopus',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'calagopusApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: resourceOptions,
				default: 'clientServer',
			},
			...operationProperties,
			...commonProperties,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('calagopusApi');
		const baseURL = String(credentials.baseUrl).replace(/\/+$/, '');

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operationValue = this.getNodeParameter('operation', itemIndex) as string;
				const operation = operationByValue.get(operationValue);

				if (!operation) {
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operationValue}`, {
						itemIndex,
					});
				}

				const method =
					operation.value === 'custom.request'
						? (this.getNodeParameter('customMethod', itemIndex) as IHttpRequestMethods)
						: operation.method;
				let url =
					operation.value === 'custom.request'
						? normalizePath(this.getNodeParameter('customPath', itemIndex) as string)
						: operation.path;

				for (const identifier of operation.identifiers ?? []) {
					const value = encodeURIComponent(this.getNodeParameter(identifier, itemIndex) as string);
					url = url.replace(`{${identifier}}`, value);
				}

				const requestOptions: IHttpRequestOptions = {
					baseURL,
					url,
					method,
					json: true,
					qs: parseJsonParameter(
						this.getNodeParameter('queryJson', itemIndex, '{}') as string,
						'Query Parameters JSON',
					),
					headers: {
						Accept: 'application/json',
					},
				};

				const additionalOptions = this.getNodeParameter(
					'additionalOptions',
					itemIndex,
					{},
				) as IDataObject;

				if (additionalOptions.ignoreHttpStatusErrors === true) {
					requestOptions.ignoreHttpStatusErrors = true;
				}

				if (additionalOptions.returnFullResponse === true) {
					requestOptions.returnFullResponse = true;
				}

				if (typeof additionalOptions.timeout === 'number' && additionalOptions.timeout > 0) {
					requestOptions.timeout = additionalOptions.timeout;
				}

				if (operation.hasBody) {
					const defaultBodyMode = defaultBodyModeByOperation.get(operation.value) ?? 'json';
					const bodyMode = this.getNodeParameter('bodyMode', itemIndex, defaultBodyMode) as string;

					if (bodyMode === 'json') {
						const structuredBody = buildStructuredBody.call(this, operation.value, itemIndex);
						const jsonBody = parseJsonParameter(
							this.getNodeParameter('bodyJson', itemIndex, '{}') as string,
							'Body JSON',
						);
						requestOptions.body = {
							...structuredBody,
							...jsonBody,
						};
						requestOptions.headers = {
							...requestOptions.headers,
							'Content-Type': 'application/json',
						};
					} else if (bodyMode === 'raw') {
						requestOptions.body = this.getNodeParameter('rawBody', itemIndex, '') as string;
						requestOptions.json = false;
						requestOptions.headers = {
							...requestOptions.headers,
							'Content-Type': 'text/plain',
						};
					}
				}

				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					'calagopusApi',
					requestOptions,
				);

				returnData.push({
					json: toJsonObject(response),
					pairedItem: itemIndex,
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : String(error),
						},
						pairedItem: itemIndex,
					});
					continue;
				}

				throw new NodeOperationError(this.getNode(), error, { itemIndex });
			}
		}

		return [returnData];
	}
}
