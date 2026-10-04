#!/usr/bin/env node
// Compares the operations exposed by the node against the HTTP routes of a
// Calagopus Panel source checkout.
//
// The panel registers its routes with utoipa-axum: every router module nests
// child modules via `.nest("/segment", child::router(state))` and declares its
// handlers with `#[utoipa::path(method, path = "/...")]`. Walking that tree from
// `backend/src/routes/mod.rs` yields the full route table without building the
// panel.
//
// Usage:
//   node scripts/api-coverage.mjs <panel-checkout> [--strict] [--json]
//
// Exit codes:
//   0  every operation maps to an existing route (and, with --strict, every
//      route is covered by an operation)
//   1  at least one operation points to a route that does not exist
//   2  --strict was given and at least one route is not covered
//   64 invalid usage

import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Route prefixes that are intentionally not exposed as operations:
// - /api/auth: interactive login, registration and password reset flows
// - /api/remote: endpoints called by Wings and database agents, not by users
const EXCLUDED_PREFIXES = ['/api/auth/', '/api/remote/'];

// Routes registered outside the routes tree.
const EXTRA_ROUTES = ['GET /openapi.json'];

function usage(message) {
	if (message) {
		console.error(`error: ${message}\n`);
	}
	console.error('usage: node scripts/api-coverage.mjs <panel-checkout> [--strict] [--json]');
	process.exit(64);
}

function childModuleFile(parentFile, moduleName) {
	const directory =
		basename(parentFile) === 'mod.rs' ? dirname(parentFile) : parentFile.replace(/\.rs$/, '');

	for (const candidate of [
		join(directory, `${moduleName}.rs`),
		join(directory, moduleName, 'mod.rs'),
	]) {
		if (existsSync(candidate)) {
			return candidate;
		}
	}

	return undefined;
}

export function collectRoutes(panelRoot) {
	const routes = new Set(EXTRA_ROUTES);
	const unresolved = [];

	const walk = (file, prefix) => {
		const source = readFileSync(file, 'utf8');

		for (const match of source.matchAll(/utoipa::path\(\s*(\w+)\s*,\s*path\s*=\s*"([^"]*)"/g)) {
			const path = `${prefix}${match[2]}`.replace(/\/+$/, '') || '/';
			routes.add(`${match[1].toUpperCase()} ${path}`);
		}

		for (const match of source.matchAll(/\.nest\(\s*"([^"]*)"\s*,\s*((?:r#)?[\w:]+)::router\(/g)) {
			const moduleName = match[2].split('::').pop().replace(/^r#/, '');
			const child = childModuleFile(file, moduleName);

			if (child) {
				walk(child, `${prefix}${match[1]}`);
			} else {
				unresolved.push(`${file}: ${moduleName}`);
			}
		}
	};

	const entry = join(panelRoot, 'backend', 'src', 'routes', 'mod.rs');
	if (!existsSync(entry)) {
		usage(`${entry} not found; is this a Calagopus Panel checkout?`);
	}

	walk(entry, '');
	return { routes, unresolved };
}

/** Replaces every `{param}` with `{}` so differently named parameters compare equal. */
const normalize = (route) => route.replace(/\{[^}]+\}/g, '{}');

function loadOperations() {
	const require = createRequire(import.meta.url);
	const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
	const compiled = join(root, 'dist', 'nodes', 'Calagopus', 'operations.js');

	if (!existsSync(compiled)) {
		usage('dist/ not found; run `npm run build` first');
	}

	return require(compiled).operations;
}

function main() {
	const args = process.argv.slice(2);
	const strict = args.includes('--strict');
	const asJson = args.includes('--json');
	const positional = args.filter((arg) => !arg.startsWith('--'));

	if (positional.length !== 1) {
		usage();
	}

	const { routes, unresolved } = collectRoutes(resolve(positional[0]));
	const upstream = new Map(
		[...routes]
			.filter(
				(route) => !EXCLUDED_PREFIXES.some((prefix) => route.split(' ')[1].startsWith(prefix)),
			)
			.map((route) => [normalize(route), route]),
	);

	const operations = loadOperations();
	const covered = new Set();
	const stale = [];

	for (const operation of operations) {
		const key = normalize(`${operation.method} ${operation.path}`);
		if (upstream.has(key)) {
			covered.add(key);
		} else {
			stale.push(`${operation.method} ${operation.path} (${operation.value})`);
		}
	}

	const missing = [...upstream.entries()]
		.filter(([key]) => !covered.has(key))
		.map(([, route]) => route)
		.sort((a, b) => a.split(' ')[1].localeCompare(b.split(' ')[1]) || a.localeCompare(b));

	const summary = {
		routes: upstream.size,
		covered: covered.size,
		missing,
		stale: stale.sort(),
		unresolved,
	};

	if (asJson) {
		console.log(JSON.stringify(summary, null, 2));
	} else {
		const percent = ((covered.size / upstream.size) * 100).toFixed(1);
		console.log(`Covered ${covered.size} of ${upstream.size} panel routes (${percent}%).`);

		if (stale.length > 0) {
			console.log(`\nOperations without a matching panel route (${stale.length}):`);
			for (const entry of summary.stale) console.log(`  ${entry}`);
		}

		if (missing.length > 0) {
			console.log(`\nPanel routes without an operation (${missing.length}):`);
			for (const entry of missing) console.log(`  ${entry}`);
		}

		if (unresolved.length > 0) {
			console.log(`\nRouter modules that could not be resolved (${unresolved.length}):`);
			for (const entry of unresolved) console.log(`  ${entry}`);
		}
	}

	if (stale.length > 0) {
		process.exit(1);
	}

	if (strict && missing.length > 0) {
		process.exit(2);
	}
}

main();
