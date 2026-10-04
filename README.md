# n8n-nodes-calagopus

[![npm](https://img.shields.io/npm/v/n8n-nodes-calagopus)](https://www.npmjs.com/package/n8n-nodes-calagopus)
[![CI](https://github.com/nn-home-com/n8n-nodes-calagopus/actions/workflows/ci.yml/badge.svg)](https://github.com/nn-home-com/n8n-nodes-calagopus/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

An [n8n](https://n8n.io/) community node for [Calagopus](https://calagopus.com/), the open-source game server management panel.

Use it to automate everything the Calagopus Panel API offers from your n8n workflows: provision servers, run backups, manage eggs and nodes, administer users, or react to panel state in any other integration n8n supports.

- [Installation](#installation)
- [Credentials](#credentials)
- [Operations](#operations)
- [Usage](#usage)
- [Compatibility](#compatibility)
- [Development](#development)
- [Resources](#resources)

## Installation

In a self-hosted n8n instance:

1. Open **Settings → Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-calagopus`.
4. Accept the community node notice and install.

For manual installation, install the package into the custom nodes directory and restart n8n:

```bash
cd ~/.n8n/custom
npm install n8n-nodes-calagopus
```

See the [n8n community nodes guide](https://docs.n8n.io/integrations/community-nodes/installation/) for Docker and environment-variable based setups.

## Credentials

Create an API key in your Calagopus Panel account settings, then add a **Calagopus API** credential in n8n:

| Field          | Description                                           |
| -------------- | ----------------------------------------------------- |
| Panel Base URL | The URL of your panel, e.g. `https://panel.example.com` |
| API Token      | The API key. It is sent as a bearer token.            |

The key's permissions decide which operations succeed. Admin operations require an account with admin permissions. n8n validates the credential by requesting `/api/client/permissions`.

## Operations

The node covers every user-facing endpoint of the Calagopus Panel API, which is 559 operations across 43 resources. Coverage is checked in CI against the [supported panel version](#compatibility).

| Area    | Resources |
| ------- | --------- |
| Account | Client Account (profile, API keys, SSH and security keys, sessions, two-factor, OAuth links, command snippets, synced settings) |
| Servers | Client Server, Allocations, Announcements, Backups, Backup Groups, Databases, Database Instances, Database Explorer, Database Instance Explorer, Devices, Files, Firewall, Mounts, Schedules, Settings, Startup, Subusers, Tunnel |
| Admin   | Activity, Announcements, Assets, Backup Configurations, Database Hosts, Database Agent Hosts, Database Agent Templates, Devices, Egg Configurations, Egg Repositories, Extensions, Locations, Mounts, Nests and Eggs, Nodes, OAuth Providers, Roles, Servers, Settings, Stats, System, System Backup Policies, Users |
| Public  | System (announcements, languages, public settings, OpenAPI document) |

Endpoints for interactive sign-in (`/api/auth`) and for Wings and database agent communication (`/api/remote`) are intentionally not exposed.

**Custom Request** lets you call any other path with your credential, for example endpoints added by panel extensions.

## Usage

### Path parameters

Every UUID or name in the endpoint path, such as the server or backup UUID, has its own field. Values are URL-encoded automatically.

### Query parameters

List operations accept query parameters as a JSON object in **Query Parameters JSON**, for example:

```json
{ "page": 2, "per_page": 50, "search": "survival" }
```

### Request bodies

Operations that send a body offer three modes:

- **JSON** (default): the object in **Body JSON** is sent as the request body. Common operations also have dedicated fields, such as the power action, backup name or startup command. Body JSON is merged on top of these fields, so you can always set additional or overriding properties.
- **Raw Text**: the text is sent as `text/plain`. This is the default for **Server Files → Write**.
- **None**: no body is sent.

Refer to your panel's API reference at `/api` for the accepted fields of each endpoint.

### Files

Database dump imports read the file from a binary field of the input item (default `data`). Database exports return the downloaded file in a binary field of the output item, with `fileName`, `mimeType` and `fileSize` in the item JSON. Combine them with nodes such as **Read/Write Files from Disk**, **FTP** or **S3** to move dumps in and out of the panel.

### Error handling

By default, HTTP errors fail the item. Under **Additional Options** you can enable **Ignore HTTP Status Errors** to receive the error response instead, or **Return Full Response** to include status code and headers. The node supports n8n's **Continue On Fail** setting.

## Compatibility

| Component       | Supported version                              |
| --------------- | ---------------------------------------------- |
| Calagopus Panel | 1.2.4 (operations are verified against its routes) |
| n8n             | Self-hosted instances with community node support |

Older panel releases work for every endpoint they already provide. Calling an endpoint that your panel does not have yet returns `404 Not Found`.

A scheduled workflow compares the node with the latest panel release every week, so new and changed endpoints are picked up quickly.

## Development

Requirements: Node.js 22 or later.

```bash
npm install
npm run dev       # start a local n8n instance with the node loaded
npm run build     # compile to dist/
npm run lint      # n8n community node lint rules
npm test          # unit tests (requires a build)
```

To check the node against a Calagopus Panel checkout:

```bash
git clone --depth 1 --branch release-1.2.4 https://github.com/calagopus/panel.git ../panel
npm run build
npm run api:coverage -- ../panel            # fails if an operation targets a missing route
npm run api:coverage -- ../panel --strict   # also fails if a panel route has no operation
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add operations and release new versions.

## Resources

- [Calagopus documentation](https://calagopus.com/docs/)
- [Calagopus Panel source](https://github.com/calagopus/panel)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE)
