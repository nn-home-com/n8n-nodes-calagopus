import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IN8nHttpFullResponse,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { ApplicationError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import {
	commonProperties,
	operationByValue,
	operationProperties,
	resourceOptions,
} from './operations';
import type { OperationSpec } from './operations';

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

function getHeader(headers: IDataObject, name: string): string | undefined {
	const value = headers[name.toLowerCase()];

	if (Array.isArray(value)) {
		return value.length > 0 ? String(value[0]) : undefined;
	}

	return value === undefined || value === null ? undefined : String(value);
}

/**
 * Extracts the file name from a Content-Disposition header, preferring the
 * RFC 5987 `filename*` parameter over the plain `filename` parameter.
 */
function parseContentDispositionFileName(header: string | undefined): string | undefined {
	if (!header) {
		return undefined;
	}

	const extended = /filename\*\s*=\s*(?:UTF-8|utf-8)''([^;]+)/.exec(header);
	if (extended) {
		try {
			return decodeURIComponent(extended[1].trim());
		} catch {
			// Fall back to the plain filename parameter.
		}
	}

	const plain = /filename\s*=\s*"?([^";]+)"?/.exec(header);
	return plain ? plain[1].trim() : undefined;
}

function parseMultilineList(value: string): string[] {
	return value
		.split(/\r?\n/)
		.map((line) => line.trim())
		.filter((line) => line.length > 0);
}

function addStringIfNotEmpty(body: IDataObject, key: string, value: string): void {
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
		case 'serverDatabaseInstances.setPowerState':
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
			addStringIfNotEmpty(
				body,
				'backup_group_uuid',
				this.getNodeParameter('backupGroupUuidBody', itemIndex, '') as string,
			);
			break;

		case 'serverBackups.restore':
			body.truncate_directory = this.getNodeParameter(
				'truncateDirectory',
				itemIndex,
				false,
			) as boolean;
			body.restore_startup = this.getNodeParameter('restoreStartup', itemIndex, false) as boolean;
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

async function setRequestBody(
	this: IExecuteFunctions,
	operation: OperationSpec,
	itemIndex: number,
	requestOptions: IHttpRequestOptions,
): Promise<void> {
	if (operation.body === 'binary') {
		const binaryPropertyName = this.getNodeParameter('binaryPropertyName', itemIndex) as string;
		const binaryData = this.helpers.assertBinaryData(itemIndex, binaryPropertyName);

		requestOptions.body = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);
		requestOptions.json = false;
		requestOptions.headers = {
			...requestOptions.headers,
			'Content-Type': binaryData.mimeType || 'application/octet-stream',
		};
		return;
	}

	const bodyMode = this.getNodeParameter('bodyMode', itemIndex, operation.body) as string;

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

async function requestBinary(
	this: IExecuteFunctions,
	itemIndex: number,
	requestOptions: IHttpRequestOptions,
): Promise<INodeExecutionData> {
	const response = (await this.helpers.httpRequestWithAuthentication.call(this, 'calagopusApi', {
		...requestOptions,
		json: false,
		encoding: 'arraybuffer',
		returnFullResponse: true,
		headers: {
			...requestOptions.headers,
			Accept: '*/*',
		},
	})) as IN8nHttpFullResponse;

	const headers = (response.headers ?? {}) as IDataObject;
	const statusCode = response.statusCode;
	const content = Buffer.from(response.body as ArrayBuffer);

	// Only reachable with "Ignore HTTP Status Errors": surface the error body as JSON.
	if (statusCode >= 400) {
		const text = content.toString('utf8');
		let body: unknown = text;
		try {
			body = JSON.parse(text);
		} catch {
			// Keep the plain text body.
		}

		return {
			json: { statusCode, body } as IDataObject,
			pairedItem: itemIndex,
		};
	}

	const mimeType = getHeader(headers, 'content-type') ?? 'application/octet-stream';
	const fileName = parseContentDispositionFileName(getHeader(headers, 'content-disposition'));
	const binaryPropertyName = this.getNodeParameter(
		'binaryOutputPropertyName',
		itemIndex,
		'data',
	) as string;
	const binaryData = await this.helpers.prepareBinaryData(content, fileName, mimeType);

	const json: IDataObject = {
		fileName: binaryData.fileName,
		mimeType: binaryData.mimeType,
		fileSize: content.length,
	};

	if (requestOptions.returnFullResponse === true) {
		json.statusCode = statusCode;
		json.headers = headers;
	}

	return {
		json,
		binary: { [binaryPropertyName]: binaryData },
		pairedItem: itemIndex,
	};
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

				for (const identifier of operation.identifiers) {
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
					await setRequestBody.call(this, operation, itemIndex, requestOptions);
				}

				if (operation.response === 'binary') {
					returnData.push(await requestBinary.call(this, itemIndex, requestOptions));
					continue;
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
