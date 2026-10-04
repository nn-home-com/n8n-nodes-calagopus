import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { describe, it } from 'node:test';

const require = createRequire(import.meta.url);
const {
	operations,
	customOperation,
	operationByValue,
	operationProperties,
	commonProperties,
	resourceOptions,
} = require('../dist/nodes/Calagopus/operations.js');

const placeholders = (path) => [...path.matchAll(/\{(\w+)\}/g)].map((match) => match[1]);

describe('operations', () => {
	it('have unique values', () => {
		const values = operations.map((operation) => operation.value);
		assert.equal(new Set(values).size, values.length);
	});

	it('are unique per method and path', () => {
		const seen = new Map();
		for (const operation of operations) {
			// The OpenAPI document is intentionally offered under two resources.
			if (operation.path === '/openapi.json') continue;

			const key = `${operation.method} ${operation.path}`;
			assert.ok(!seen.has(key), `${operation.value} duplicates ${seen.get(key)} (${key})`);
			seen.set(key, operation.value);
		}
	});

	it('use the resource as value prefix', () => {
		for (const operation of operations) {
			assert.ok(
				operation.value.startsWith(`${operation.resource}.`),
				`${operation.value} does not belong to ${operation.resource}`,
			);
		}
	});

	it('use one display name per resource', () => {
		const names = new Map();
		for (const operation of operations) {
			const name = names.get(operation.resource) ?? operation.resourceName;
			assert.equal(operation.resourceName, name, operation.value);
			names.set(operation.resource, name);
		}
	});

	it('declare exactly the identifiers used in their path', () => {
		for (const operation of operations) {
			assert.deepEqual(
				[...operation.identifiers].sort(),
				placeholders(operation.path).sort(),
				operation.value,
			);
		}
	});

	it('only send bodies with methods that accept them, unless explicitly requested', () => {
		for (const operation of operations) {
			if (operation.method === 'GET') {
				assert.equal(operation.hasBody, false, operation.value);
			}
		}
	});

	it('are all reachable by value', () => {
		for (const operation of [...operations, customOperation]) {
			assert.equal(operationByValue.get(operation.value), operation);
		}
	});
});

describe('node properties', () => {
	const allProperties = [...operationProperties, ...commonProperties];

	it('offer an operation selector for every resource', () => {
		const resources = operationProperties.map(
			(property) => property.displayOptions.show.resource[0],
		);
		assert.deepEqual(resources.sort(), resourceOptions.map((option) => option.value).sort());
	});

	it('define an input field for every identifier', () => {
		const fields = new Set(allProperties.map((property) => property.name));
		for (const operation of operations) {
			for (const identifier of operation.identifiers) {
				assert.ok(fields.has(identifier), `missing field for ${identifier}`);
			}
		}
	});

	it('show identifier fields only for operations that use them', () => {
		const identifierNames = new Set(operations.flatMap((operation) => operation.identifiers));
		for (const property of allProperties.filter((property) => identifierNames.has(property.name))) {
			for (const value of property.displayOptions.show.operation) {
				assert.ok(
					operationByValue.get(value).identifiers.includes(property.name),
					`${property.name} is shown for ${value}`,
				);
			}
		}
	});

	it('show binary fields only for binary operations', () => {
		const shownFor = (name) =>
			allProperties
				.filter((property) => property.name === name)
				.flatMap((property) => property.displayOptions.show.operation);

		for (const value of shownFor('binaryPropertyName')) {
			assert.equal(operationByValue.get(value).body, 'binary', value);
		}
		for (const value of shownFor('binaryOutputPropertyName')) {
			assert.equal(operationByValue.get(value).response, 'binary', value);
		}
		for (const value of shownFor('bodyMode')) {
			assert.notEqual(operationByValue.get(value).body, 'binary', value);
		}
	});
});
