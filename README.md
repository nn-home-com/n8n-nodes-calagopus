# n8n-nodes-calagopus

This is an n8n community node for Calagopus, an open-source game server management panel.

Use it to automate Calagopus Panel actions from n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Install the package in a self-hosted n8n instance:

1. Open **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-calagopus`.
4. Accept the community-node warning and install the package.

For manual installation, install the npm package in the custom nodes directory of your n8n instance and restart n8n:

```bash
cd ~/.n8n/custom
npm install n8n-nodes-calagopus
```

See the [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) for Docker, environment-variable, and GUI installation options.

## Operations

The node includes Calagopus Panel operations for:

* Client account management (API keys, command snippets, SSH keys, security keys, OAuth links, sessions, two-factor, avatar, email, password), permissions, accessible servers, and server groups
* Server power, console, resources, activity, startup, settings, subusers, schedules, mounts, allocations, databases, backups, announcements, and files
* Admin users, servers, nodes, locations, mounts, roles, OAuth providers, nests, eggs, egg repositories, egg configurations, database hosts, backup configurations, announcements, assets, activity, settings, stats, system health, updates, and extensions
* Custom API requests for endpoints added by Calagopus updates or panel extensions

## Credentials

Create Calagopus API credentials in n8n with:

* Panel Base URL, for example `https://panel.your-domain.tld`
* API Token

The node sends the token as a bearer token in the `Authorization` header.

## Compatibility

Built for self-hosted n8n community-node installations. Compatibility should be validated against the n8n version used in your deployment.

## Usage

Most create, update, and action operations accept a JSON body. List operations accept optional query parameters as JSON, such as pagination or search filters supported by your Calagopus Panel version.

Run locally during development:

```bash
npm install
npm run dev
```

Then open the local n8n instance and add the Calagopus node to a workflow.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Calagopus documentation](https://calagopus.com/docs/)

## Version history

### 0.1.0

Initial release with Calagopus credentials, client operations, server operations, admin operations, and custom API requests.
