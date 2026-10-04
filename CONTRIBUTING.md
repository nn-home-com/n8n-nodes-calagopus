# Contributing

Thanks for helping improve the Calagopus node. Bug reports, endpoint requests and pull requests are welcome.

## Setup

Requirements: Node.js 22 or later and npm.

```bash
git clone https://github.com/nn-home-com/n8n-nodes-calagopus.git
cd n8n-nodes-calagopus
npm install
npm run dev
```

`npm run dev` starts a local n8n instance with the node loaded and rebuilds on change.

Before opening a pull request, make sure these pass:

```bash
npm run lint
npm run build
npm test
```

## Project layout

| Path | Purpose |
| --- | --- |
| `credentials/CalagopusApi.credentials.ts` | Credential type (panel URL and API token) |
| `nodes/Calagopus/operations.ts` | Operation table, path parameters and node properties |
| `nodes/Calagopus/Calagopus.node.ts` | Request execution: path, query, body and response handling |
| `scripts/api-coverage.mjs` | Compares the operation table with the routes of a panel checkout |
| `test/` | Unit tests, run against the compiled output in `dist/` |

## Adding or changing operations

Operations are declared in `nodes/Calagopus/operations.ts`, one `op()` call per endpoint:

```ts
op(
	'serverBackups', // resource value
	'Server Backups', // resource display name
	'Restore', // operation display name
	'serverBackups.restore', // operation value: <resource>.<camelCaseName>
	'POST',
	'/api/client/servers/{serverUuid}/backups/{backupUuid}/restore',
	'Restore a backup', // shown as description and action
	['serverUuid', 'backupUuid'], // every {placeholder} in the path
),
```

An optional last argument changes request and response handling:

| Option | Default | Use for |
| --- | --- | --- |
| `hasBody` | `true` except for GET and DELETE | DELETE endpoints that take a body |
| `body: 'raw'` | `'json'` | Endpoints that read a plain text body |
| `body: 'binary'` | `'json'` | Endpoints that stream an uploaded file |
| `response: 'binary'` | `'json'` | Endpoints that return a file download |

Conventions:

- Place the operation in its resource block. New resources go in alphabetically.
- Use the panel's naming: `Get`, `Get Many`, `Create`, `Update`, `Delete`, `Duplicate`. Name actions on sub-resources after the target, for example `Get Egg Variables` or `Create Mount Link`.
- Write descriptions in sentence case without a trailing period.
- A new path parameter needs an entry in the `IdentifierName` union and in `identifierLabels`. The tests fail if one is missing.
- Add dedicated input fields only for frequently used, stable payloads. Everything else is covered by Body JSON. Structured fields are mapped in `buildStructuredBody()` in `Calagopus.node.ts`.

### Checking against the panel

The panel version the node is verified against is set in `package.json` under `calagopus.panelVersion`. CI checks out that release and fails if any operation points to a route that does not exist there.

To see which panel routes are not covered yet:

```bash
git clone --depth 1 --branch release-<version> https://github.com/calagopus/panel.git ../panel
npm run build
npm run api:coverage -- ../panel --strict
```

The report lists panel routes without an operation and operations without a panel route. When you update the node for a new panel release, bump `calagopus.panelVersion` in the same pull request.

## Commits and pull requests

- Keep pull requests focused on one change.
- Write commit messages in the imperative mood, such as "Add server firewall operations". The changelog is generated from them.
- Add or update tests when you change request handling in `Calagopus.node.ts`.

## Releasing

Maintainers release from `main`:

```bash
npm run release
```

This runs the n8n release flow: it bumps the version, updates `CHANGELOG.md`, commits, tags, pushes and creates a GitHub release. The tag triggers the publish workflow, which publishes to npm with provenance using trusted publishing.
