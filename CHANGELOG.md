# Changelog

## Unreleased

- Synced operations with the current Calagopus API.
- Fixed operations whose method or path changed: list accessible servers (`/api/client/servers`), general system health, file search (now `POST`), set debug mode (now `POST`), add extension (now `PUT /extensions/manage/add`), and admin settings update (consolidated into a single `PUT /api/admin/settings`).
- Removed operations no longer offered by the API: list/get file operations, get remote file pull, and get a single subuser.
- Added full client account management (account, API keys, command snippets, SSH keys, security keys, OAuth links, sessions, two-factor, avatar, email, password, activity, logout).
- Added client server groups (list, create, update order, delete) and client egg/log operations.
- Added admin Activity and Assets resources, plus duplicate actions across announcements, egg configurations, locations, mounts, nests/eggs, OAuth providers, roles, and nodes.
- Added admin node backup get/reattach/restore, capacity, token, system logs/overview/stats, and server transfer operations.
- Added admin nest egg variable and egg mount management, external-ID lookups, and OAuth mapping/user lookups.

## 0.1.1

- Added structured fields for common server operations.
- Added backup fields for starting and updating backups, including ignored files.
- Added structured fields for power actions, commands, database changes, server settings, and startup settings.
- Ensured builds clean the previous `dist` output before compiling.

## 0.1.0

Initial release with Calagopus credentials, client operations, server operations, admin operations, and custom API requests.
