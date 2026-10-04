import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { describe, it } from 'node:test';

const require = createRequire(import.meta.url);
const { Calagopus } = require('../dist/nodes/Calagopus/Calagopus.node.js');

/**
 * Builds a minimal IExecuteFunctions stand-in that records outgoing requests
 * and answers them with `respond(requestOptions)`.
 */
function createContext({ parameters, respond, binary = {}, continueOnFail = false }) {
	const requests = [];

	const context = {
		getInputData: () => [{ json: {}, binary }],
		getCredentials: async () => ({ baseUrl: 'https://panel.example.com/', apiToken: 'token' }),
		getNode: () => ({ name: 'Calagopus', type: 'calagopus', typeVersion: 1, parameters: {} }),
		getNodeParameter: (name, _itemIndex, fallback) => {
			if (name in parameters) return parameters[name];
			if (fallback !== undefined) return fallback;
			throw new Error(`Unexpected parameter lookup: ${name}`);
		},
		continueOnFail: () => continueOnFail,
		helpers: {
			httpRequestWithAuthentication: async (credentialsType, requestOptions) => {
				assert.equal(credentialsType, 'calagopusApi');
				requests.push(requestOptions);
				return respond(requestOptions);
			},
			assertBinaryData: (_itemIndex, propertyName) => {
				if (!binary[propertyName]) throw new Error(`No binary data in ${propertyName}`);
				return binary[propertyName];
			},
			getBinaryDataBuffer: async (_itemIndex, propertyName) =>
				Buffer.from(binary[propertyName].data, 'base64'),
			prepareBinaryData: async (buffer, fileName, mimeType) => ({
				data: buffer.toString('base64'),
				fileName,
				mimeType,
			}),
		},
	};

	return { context, requests };
}

const run = (context) => new Calagopus().execute.call(context);

describe('Calagopus node', () => {
	it('fills path parameters and merges structured fields with the JSON body', async () => {
		const { context, requests } = createContext({
			parameters: {
				operation: 'serverBackups.create',
				serverUuid: 'a1b2',
				queryJson: '{}',
				additionalOptions: {},
				bodyMode: 'json',
				backupName: 'nightly',
				backupIgnoredFiles: '*.log\n\ncache/\n',
				backupGroupUuidBody: 'group-1',
				bodyJson: '{"name": "override"}',
			},
			respond: () => ({ backup: { uuid: 'b1' } }),
		});

		const [[item]] = await run(context);

		assert.equal(requests[0].baseURL, 'https://panel.example.com');
		assert.equal(requests[0].url, '/api/client/servers/a1b2/backups');
		assert.equal(requests[0].method, 'POST');
		assert.deepEqual(requests[0].body, {
			name: 'override',
			ignored_files: ['*.log', 'cache/'],
			backup_group_uuid: 'group-1',
		});
		assert.deepEqual(item.json, { backup: { uuid: 'b1' } });
	});

	it('url-encodes identifiers', async () => {
		const { context, requests } = createContext({
			parameters: {
				operation: 'adminSettings.deleteEmailVariable',
				emailVariableName: 'support url',
				queryJson: '{}',
				additionalOptions: {},
			},
			respond: () => ({}),
		});

		await run(context);

		assert.equal(requests[0].url, '/api/admin/system/email/variables/support%20url');
		assert.equal(requests[0].body, undefined);
	});

	it('sends the power action for database instances', async () => {
		const { context, requests } = createContext({
			parameters: {
				operation: 'serverDatabaseInstances.setPowerState',
				serverUuid: 's1',
				databaseInstanceUuid: 'i1',
				queryJson: '{}',
				additionalOptions: {},
				bodyMode: 'json',
				powerAction: 'restart',
				bodyJson: '{}',
			},
			respond: () => ({}),
		});

		await run(context);

		assert.equal(requests[0].url, '/api/client/servers/s1/databases/instances/i1/power');
		assert.deepEqual(requests[0].body, { action: 'restart' });
	});

	it('defaults file writes to a raw text body', async () => {
		const { context, requests } = createContext({
			parameters: {
				operation: 'serverFiles.write',
				serverUuid: 's1',
				queryJson: '{"file": "/server.properties"}',
				additionalOptions: {},
				rawBody: 'motd=hello',
			},
			respond: () => ({}),
		});

		await run(context);

		assert.equal(requests[0].body, 'motd=hello');
		assert.equal(requests[0].json, false);
		assert.deepEqual(requests[0].qs, { file: '/server.properties' });
		assert.equal(requests[0].headers['Content-Type'], 'text/plain');
	});

	it('uploads binary input data', async () => {
		const { context, requests } = createContext({
			parameters: {
				operation: 'serverDatabaseInstances.importDatabase',
				serverUuid: 's1',
				databaseInstanceUuid: 'i1',
				databaseUuid: 'd1',
				queryJson: '{}',
				additionalOptions: {},
				binaryPropertyName: 'dump',
			},
			binary: {
				dump: {
					data: Buffer.from('CREATE TABLE t ();').toString('base64'),
					mimeType: 'application/sql',
				},
			},
			respond: () => ({}),
		});

		await run(context);

		assert.equal(
			requests[0].url,
			'/api/client/servers/s1/databases/instances/i1/databases/d1/import',
		);
		assert.equal(requests[0].body.toString(), 'CREATE TABLE t ();');
		assert.equal(requests[0].json, false);
		assert.equal(requests[0].headers['Content-Type'], 'application/sql');
	});

	it('returns downloaded files as binary data', async () => {
		const { context, requests } = createContext({
			parameters: {
				operation: 'serverDatabaseInstances.exportDatabase',
				serverUuid: 's1',
				databaseInstanceUuid: 'i1',
				databaseUuid: 'd1',
				queryJson: '{}',
				additionalOptions: {},
				binaryOutputPropertyName: 'export',
			},
			respond: () => ({
				statusCode: 200,
				headers: {
					'content-type': 'application/octet-stream',
					'content-disposition': 'attachment; filename="app.sql"',
				},
				body: new TextEncoder().encode('-- dump').buffer,
			}),
		});

		const [[item]] = await run(context);

		assert.equal(requests[0].encoding, 'arraybuffer');
		assert.equal(requests[0].returnFullResponse, true);
		assert.deepEqual(item.json, {
			fileName: 'app.sql',
			mimeType: 'application/octet-stream',
			fileSize: 7,
		});
		assert.equal(Buffer.from(item.binary.export.data, 'base64').toString(), '-- dump');
	});

	it('prefers the RFC 5987 file name of a download', async () => {
		const { context } = createContext({
			parameters: {
				operation: 'serverDatabaseInstances.export',
				serverUuid: 's1',
				databaseInstanceUuid: 'i1',
				queryJson: '{}',
				additionalOptions: {},
				binaryOutputPropertyName: 'data',
			},
			respond: () => ({
				statusCode: 200,
				headers: {
					'content-disposition': `attachment; filename="fallback.rdb"; filename*=UTF-8''cache%20dump.rdb`,
				},
				body: new ArrayBuffer(0),
			}),
		});

		const [[item]] = await run(context);

		assert.equal(item.json.fileName, 'cache dump.rdb');
		assert.equal(item.json.mimeType, 'application/octet-stream');
	});

	it('returns error bodies of ignored download failures as JSON', async () => {
		const { context } = createContext({
			parameters: {
				operation: 'serverDatabaseInstances.export',
				serverUuid: 's1',
				databaseInstanceUuid: 'i1',
				queryJson: '{}',
				additionalOptions: { ignoreHttpStatusErrors: true },
				binaryOutputPropertyName: 'data',
			},
			respond: () => ({
				statusCode: 400,
				headers: { 'content-type': 'application/json' },
				body: new TextEncoder().encode('{"errors":["only redis"]}').buffer,
			}),
		});

		const [[item]] = await run(context);

		assert.deepEqual(item.json, { statusCode: 400, body: { errors: ['only redis'] } });
		assert.equal(item.binary, undefined);
	});

	it('reports failures per item when continue on fail is enabled', async () => {
		const { context } = createContext({
			parameters: {
				operation: 'clientAccount.get',
				queryJson: 'not json',
				additionalOptions: {},
			},
			respond: () => ({}),
			continueOnFail: true,
		});

		const [[item]] = await run(context);

		assert.match(item.json.error, /JSON/);
		assert.equal(item.pairedItem, 0);
	});
});
