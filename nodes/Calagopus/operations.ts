import type { IHttpRequestMethods, INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export type IdentifierName =
	| 'allocationUuid'
	| 'announcementUuid'
	| 'apiKeyUuid'
	| 'backupConfigurationUuid'
	| 'backupUuid'
	| 'commandSnippetUuid'
	| 'databaseHostUuid'
	| 'databaseUuid'
	| 'eggConfigurationUuid'
	| 'eggRepositoryUuid'
	| 'eggUuid'
	| 'extensionPackageName'
	| 'hostUuid'
	| 'locationUuid'
	| 'mappingUuid'
	| 'mountUuid'
	| 'nestUuid'
	| 'nodeUuid'
	| 'oauthLinkUuid'
	| 'oauthProviderUuid'
	| 'operationUuid'
	| 'pullUuid'
	| 'revisionId'
	| 'roleUuid'
	| 'scheduleUuid'
	| 'securityKeyUuid'
	| 'serverGroupUuid'
	| 'serverUuid'
	| 'sessionUuid'
	| 'sshKeyUuid'
	| 'stepUuid'
	| 'subuserUuid'
	| 'templateIdentifier'
	| 'userUuid'
	| 'variableUuid';

export interface OperationSpec {
	name: string;
	value: string;
	resource: string;
	resourceName: string;
	method: IHttpRequestMethods;
	path: string;
	description: string;
	identifiers?: IdentifierName[];
	hasBody?: boolean;
	rawBody?: boolean;
}

const op = (
	resource: string,
	resourceName: string,
	name: string,
	value: string,
	method: IHttpRequestMethods,
	path: string,
	description: string,
	identifiers: IdentifierName[] = [],
	hasBody = !['GET', 'DELETE'].includes(method),
	rawBody = false,
): OperationSpec => ({
	resource,
	resourceName,
	name,
	value,
	method,
	path,
	description,
	identifiers,
	hasBody,
	rawBody,
});

export const operations: OperationSpec[] = [
	op('adminAnnouncements', 'Admin Announcements', 'Create', 'adminAnnouncements.create', 'POST', '/api/admin/announcements', 'Create an announcement'),
	op('adminAnnouncements', 'Admin Announcements', 'Delete', 'adminAnnouncements.delete', 'DELETE', '/api/admin/announcements/{announcementUuid}', 'Delete an announcement', ['announcementUuid']),
	op('adminAnnouncements', 'Admin Announcements', 'Get', 'adminAnnouncements.get', 'GET', '/api/admin/announcements/{announcementUuid}', 'Get an announcement', ['announcementUuid']),
	op('adminAnnouncements', 'Admin Announcements', 'Get Many', 'adminAnnouncements.getMany', 'GET', '/api/admin/announcements', 'List announcements'),
	op('adminAnnouncements', 'Admin Announcements', 'Update', 'adminAnnouncements.update', 'PATCH', '/api/admin/announcements/{announcementUuid}', 'Update an announcement', ['announcementUuid']),

	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Create', 'adminBackupConfigurations.create', 'POST', '/api/admin/backup-configurations', 'Create a backup configuration'),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Delete', 'adminBackupConfigurations.delete', 'DELETE', '/api/admin/backup-configurations/{backupConfigurationUuid}', 'Delete a backup configuration', ['backupConfigurationUuid']),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Get', 'adminBackupConfigurations.get', 'GET', '/api/admin/backup-configurations/{backupConfigurationUuid}', 'Get a backup configuration', ['backupConfigurationUuid']),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Get Backups', 'adminBackupConfigurations.getBackups', 'GET', '/api/admin/backup-configurations/{backupConfigurationUuid}/backups', 'List backups for a backup configuration', ['backupConfigurationUuid']),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Get Locations', 'adminBackupConfigurations.getLocations', 'GET', '/api/admin/backup-configurations/{backupConfigurationUuid}/locations', 'List locations using a backup configuration', ['backupConfigurationUuid']),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Get Many', 'adminBackupConfigurations.getMany', 'GET', '/api/admin/backup-configurations', 'List backup configurations'),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Get Nodes', 'adminBackupConfigurations.getNodes', 'GET', '/api/admin/backup-configurations/{backupConfigurationUuid}/nodes', 'List nodes using a backup configuration', ['backupConfigurationUuid']),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Get Servers', 'adminBackupConfigurations.getServers', 'GET', '/api/admin/backup-configurations/{backupConfigurationUuid}/servers', 'List servers using a backup configuration', ['backupConfigurationUuid']),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Get Stats', 'adminBackupConfigurations.getStats', 'GET', '/api/admin/backup-configurations/{backupConfigurationUuid}/stats', 'Get backup configuration statistics', ['backupConfigurationUuid']),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Update', 'adminBackupConfigurations.update', 'PATCH', '/api/admin/backup-configurations/{backupConfigurationUuid}', 'Update a backup configuration', ['backupConfigurationUuid']),

	op('adminDatabaseHosts', 'Admin Database Hosts', 'Create', 'adminDatabaseHosts.create', 'POST', '/api/admin/database-hosts', 'Create a database host'),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Delete', 'adminDatabaseHosts.delete', 'DELETE', '/api/admin/database-hosts/{databaseHostUuid}', 'Delete a database host', ['databaseHostUuid']),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Get', 'adminDatabaseHosts.get', 'GET', '/api/admin/database-hosts/{databaseHostUuid}', 'Get a database host', ['databaseHostUuid']),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Get Databases', 'adminDatabaseHosts.getDatabases', 'GET', '/api/admin/database-hosts/{databaseHostUuid}/databases', 'List databases on a host', ['databaseHostUuid']),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Get Many', 'adminDatabaseHosts.getMany', 'GET', '/api/admin/database-hosts', 'List database hosts'),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Test', 'adminDatabaseHosts.test', 'POST', '/api/admin/database-hosts/{databaseHostUuid}/test', 'Test a database host connection', ['databaseHostUuid']),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Update', 'adminDatabaseHosts.update', 'PATCH', '/api/admin/database-hosts/{databaseHostUuid}', 'Update a database host', ['databaseHostUuid']),

	op('adminEggConfigurations', 'Admin Egg Configurations', 'Create', 'adminEggConfigurations.create', 'POST', '/api/admin/egg-configurations', 'Create an egg configuration'),
	op('adminEggConfigurations', 'Admin Egg Configurations', 'Delete', 'adminEggConfigurations.delete', 'DELETE', '/api/admin/egg-configurations/{eggConfigurationUuid}', 'Delete an egg configuration', ['eggConfigurationUuid']),
	op('adminEggConfigurations', 'Admin Egg Configurations', 'Get', 'adminEggConfigurations.get', 'GET', '/api/admin/egg-configurations/{eggConfigurationUuid}', 'Get an egg configuration', ['eggConfigurationUuid']),
	op('adminEggConfigurations', 'Admin Egg Configurations', 'Get Many', 'adminEggConfigurations.getMany', 'GET', '/api/admin/egg-configurations', 'List egg configurations'),
	op('adminEggConfigurations', 'Admin Egg Configurations', 'Update', 'adminEggConfigurations.update', 'PATCH', '/api/admin/egg-configurations/{eggConfigurationUuid}', 'Update an egg configuration', ['eggConfigurationUuid']),

	op('adminEggRepositories', 'Admin Egg Repositories', 'Create', 'adminEggRepositories.create', 'POST', '/api/admin/egg-repositories', 'Create an egg repository'),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Delete', 'adminEggRepositories.delete', 'DELETE', '/api/admin/egg-repositories/{eggRepositoryUuid}', 'Delete an egg repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Get', 'adminEggRepositories.get', 'GET', '/api/admin/egg-repositories/{eggRepositoryUuid}', 'Get an egg repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Get Eggs', 'adminEggRepositories.getEggs', 'GET', '/api/admin/egg-repositories/{eggRepositoryUuid}/eggs', 'List eggs in an egg repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Get Many', 'adminEggRepositories.getMany', 'GET', '/api/admin/egg-repositories', 'List egg repositories'),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Install Egg', 'adminEggRepositories.installEgg', 'POST', '/api/admin/egg-repositories/{eggRepositoryUuid}/eggs/install', 'Install eggs from a repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Sync', 'adminEggRepositories.sync', 'POST', '/api/admin/egg-repositories/{eggRepositoryUuid}/sync', 'Sync an egg repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Update', 'adminEggRepositories.update', 'PATCH', '/api/admin/egg-repositories/{eggRepositoryUuid}', 'Update an egg repository', ['eggRepositoryUuid']),

	op('adminExtensions', 'Admin Extensions', 'Add', 'adminExtensions.add', 'POST', '/api/admin/extensions/manage', 'Add or install an extension'),
	op('adminExtensions', 'Admin Extensions', 'Get Build Logs', 'adminExtensions.getBuildLogs', 'GET', '/api/admin/extensions/manage/logs', 'Get extension build logs'),
	op('adminExtensions', 'Admin Extensions', 'Get Many', 'adminExtensions.getMany', 'GET', '/api/admin/extensions', 'List admin extensions'),
	op('adminExtensions', 'Admin Extensions', 'Get Status', 'adminExtensions.getStatus', 'GET', '/api/admin/extensions/manage/status', 'Get extension manager status'),
	op('adminExtensions', 'Admin Extensions', 'Rebuild', 'adminExtensions.rebuild', 'POST', '/api/admin/extensions/manage/rebuild', 'Rebuild extensions'),
	op('adminExtensions', 'Admin Extensions', 'Remove', 'adminExtensions.remove', 'DELETE', '/api/admin/extensions/manage/{extensionPackageName}', 'Remove an extension', ['extensionPackageName']),

	op('adminLocations', 'Admin Locations', 'Create', 'adminLocations.create', 'POST', '/api/admin/locations', 'Create a location'),
	op('adminLocations', 'Admin Locations', 'Create Database Host Link', 'adminLocations.createDatabaseHostLink', 'POST', '/api/admin/locations/{locationUuid}/database-hosts', 'Attach a database host to a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Delete', 'adminLocations.delete', 'DELETE', '/api/admin/locations/{locationUuid}', 'Delete a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Delete Database Host Link', 'adminLocations.deleteDatabaseHostLink', 'DELETE', '/api/admin/locations/{locationUuid}/database-hosts/{hostUuid}', 'Detach a database host from a location', ['locationUuid', 'hostUuid']),
	op('adminLocations', 'Admin Locations', 'Get', 'adminLocations.get', 'GET', '/api/admin/locations/{locationUuid}', 'Get a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Get Database Hosts', 'adminLocations.getDatabaseHosts', 'GET', '/api/admin/locations/{locationUuid}/database-hosts', 'List database hosts for a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Get Many', 'adminLocations.getMany', 'GET', '/api/admin/locations', 'List locations'),
	op('adminLocations', 'Admin Locations', 'Get Nodes', 'adminLocations.getNodes', 'GET', '/api/admin/locations/{locationUuid}/nodes', 'List nodes in a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Update', 'adminLocations.update', 'PATCH', '/api/admin/locations/{locationUuid}', 'Update a location', ['locationUuid']),

	op('adminMounts', 'Admin Mounts', 'Create', 'adminMounts.create', 'POST', '/api/admin/mounts', 'Create a mount'),
	op('adminMounts', 'Admin Mounts', 'Delete', 'adminMounts.delete', 'DELETE', '/api/admin/mounts/{mountUuid}', 'Delete a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Get', 'adminMounts.get', 'GET', '/api/admin/mounts/{mountUuid}', 'Get a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Get Many', 'adminMounts.getMany', 'GET', '/api/admin/mounts', 'List mounts'),
	op('adminMounts', 'Admin Mounts', 'Get Nest Eggs', 'adminMounts.getNestEggs', 'GET', '/api/admin/mounts/{mountUuid}/nest-eggs', 'List eggs attached to a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Get Nodes', 'adminMounts.getNodes', 'GET', '/api/admin/mounts/{mountUuid}/nodes', 'List nodes attached to a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Get Servers', 'adminMounts.getServers', 'GET', '/api/admin/mounts/{mountUuid}/servers', 'List servers attached to a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Update', 'adminMounts.update', 'PATCH', '/api/admin/mounts/{mountUuid}', 'Update a mount', ['mountUuid']),

	op('adminNests', 'Admin Nests', 'Create', 'adminNests.create', 'POST', '/api/admin/nests', 'Create a nest'),
	op('adminNests', 'Admin Nests', 'Create Egg', 'adminNests.createEgg', 'POST', '/api/admin/nests/{nestUuid}/eggs', 'Create an egg', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Delete', 'adminNests.delete', 'DELETE', '/api/admin/nests/{nestUuid}', 'Delete a nest', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Delete Egg', 'adminNests.deleteEgg', 'DELETE', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}', 'Delete an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Export Egg', 'adminNests.exportEgg', 'GET', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/export', 'Export an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Get', 'adminNests.get', 'GET', '/api/admin/nests/{nestUuid}', 'Get a nest', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Get All Eggs', 'adminNests.getAllEggs', 'GET', '/api/admin/nests/eggs', 'List all eggs'),
	op('adminNests', 'Admin Nests', 'Get Egg', 'adminNests.getEgg', 'GET', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}', 'Get an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Get Egg Mounts', 'adminNests.getEggMounts', 'GET', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/mounts', 'List egg mounts', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Get Egg Servers', 'adminNests.getEggServers', 'GET', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/servers', 'List servers using an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Get Egg Variables', 'adminNests.getEggVariables', 'GET', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/variables', 'List egg variables', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Get Eggs', 'adminNests.getEggs', 'GET', '/api/admin/nests/{nestUuid}/eggs', 'List eggs in a nest', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Get Many', 'adminNests.getMany', 'GET', '/api/admin/nests', 'List nests'),
	op('adminNests', 'Admin Nests', 'Import Egg', 'adminNests.importEgg', 'POST', '/api/admin/nests/{nestUuid}/eggs/import', 'Import an egg', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Move Egg', 'adminNests.moveEgg', 'POST', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/move', 'Move an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Update', 'adminNests.update', 'PATCH', '/api/admin/nests/{nestUuid}', 'Update a nest', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Update Egg', 'adminNests.updateEgg', 'PATCH', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}', 'Update an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Update Egg From Import', 'adminNests.updateEggFromImport', 'POST', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/update/import', 'Update an egg from import data', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Update Egg From Repository', 'adminNests.updateEggFromRepository', 'POST', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/update/repository', 'Update an egg from its repository', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Update Egg Variable Order', 'adminNests.updateEggVariableOrder', 'PUT', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/variables/order', 'Update egg variable order', ['nestUuid', 'eggUuid']),

	op('adminNodes', 'Admin Nodes', 'Create', 'adminNodes.create', 'POST', '/api/admin/nodes', 'Create a node'),
	op('adminNodes', 'Admin Nodes', 'Create Allocations', 'adminNodes.createAllocations', 'POST', '/api/admin/nodes/{nodeUuid}/allocations', 'Create node allocations', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Create Mount Link', 'adminNodes.createMountLink', 'POST', '/api/admin/nodes/{nodeUuid}/mounts', 'Attach a mount to a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Delete', 'adminNodes.delete', 'DELETE', '/api/admin/nodes/{nodeUuid}', 'Delete a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Delete Allocations', 'adminNodes.deleteAllocations', 'DELETE', '/api/admin/nodes/{nodeUuid}/allocations', 'Delete node allocations', ['nodeUuid'], true),
	op('adminNodes', 'Admin Nodes', 'Delete Backup', 'adminNodes.deleteBackup', 'DELETE', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}', 'Delete a node backup', ['nodeUuid', 'backupUuid'], true),
	op('adminNodes', 'Admin Nodes', 'Delete Mount Link', 'adminNodes.deleteMountLink', 'DELETE', '/api/admin/nodes/{nodeUuid}/mounts/{mountUuid}', 'Detach a mount from a node', ['nodeUuid', 'mountUuid']),
	op('adminNodes', 'Admin Nodes', 'Detach Backup', 'adminNodes.detachBackup', 'POST', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}/detach', 'Detach a node backup', ['nodeUuid', 'backupUuid']),
	op('adminNodes', 'Admin Nodes', 'Download Backup', 'adminNodes.downloadBackup', 'GET', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}/download', 'Get a node backup download URL', ['nodeUuid', 'backupUuid']),
	op('adminNodes', 'Admin Nodes', 'Get', 'adminNodes.get', 'GET', '/api/admin/nodes/{nodeUuid}', 'Get a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Allocations', 'adminNodes.getAllocations', 'GET', '/api/admin/nodes/{nodeUuid}/allocations', 'List node allocations', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Available Allocations', 'adminNodes.getAvailableAllocations', 'GET', '/api/admin/nodes/{nodeUuid}/allocations/available', 'List available node allocations', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Backups', 'adminNodes.getBackups', 'GET', '/api/admin/nodes/{nodeUuid}/backups', 'List node backups', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Config', 'adminNodes.getConfig', 'GET', '/api/admin/nodes/{nodeUuid}/config', 'Get node configuration', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Many', 'adminNodes.getMany', 'GET', '/api/admin/nodes', 'List nodes'),
	op('adminNodes', 'Admin Nodes', 'Get Mounts', 'adminNodes.getMounts', 'GET', '/api/admin/nodes/{nodeUuid}/mounts', 'List node mounts', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Server Resources', 'adminNodes.getServerResources', 'GET', '/api/admin/nodes/{nodeUuid}/servers/resources', 'Get server resources on a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Servers', 'adminNodes.getServers', 'GET', '/api/admin/nodes/{nodeUuid}/servers', 'List node servers', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Transferring Servers', 'adminNodes.getTransferringServers', 'GET', '/api/admin/nodes/{nodeUuid}/servers/transfers', 'List transferring servers on a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Reset Token', 'adminNodes.resetToken', 'POST', '/api/admin/nodes/{nodeUuid}/reset-token', 'Reset a node token', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Send Servers Power Action', 'adminNodes.sendServersPowerAction', 'POST', '/api/admin/nodes/{nodeUuid}/servers/power', 'Send a power action to multiple node servers', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Update', 'adminNodes.update', 'PATCH', '/api/admin/nodes/{nodeUuid}', 'Update a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Update Allocations', 'adminNodes.updateAllocations', 'PATCH', '/api/admin/nodes/{nodeUuid}/allocations', 'Update node allocations', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Update Config', 'adminNodes.updateConfig', 'PATCH', '/api/admin/nodes/{nodeUuid}/config', 'Update node configuration', ['nodeUuid']),

	op('adminOAuthProviders', 'Admin OAuth Providers', 'Create', 'adminOAuthProviders.create', 'POST', '/api/admin/oauth-providers', 'Create an OAuth provider'),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Create Mapping', 'adminOAuthProviders.createMapping', 'POST', '/api/admin/oauth-providers/{oauthProviderUuid}/mappings', 'Create an OAuth provider mapping', ['oauthProviderUuid']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Delete', 'adminOAuthProviders.delete', 'DELETE', '/api/admin/oauth-providers/{oauthProviderUuid}', 'Delete an OAuth provider', ['oauthProviderUuid']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Delete Mapping', 'adminOAuthProviders.deleteMapping', 'DELETE', '/api/admin/oauth-providers/{oauthProviderUuid}/mappings/{mappingUuid}', 'Delete an OAuth provider mapping', ['oauthProviderUuid', 'mappingUuid']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Get', 'adminOAuthProviders.get', 'GET', '/api/admin/oauth-providers/{oauthProviderUuid}', 'Get an OAuth provider', ['oauthProviderUuid']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Get Many', 'adminOAuthProviders.getMany', 'GET', '/api/admin/oauth-providers', 'List OAuth providers'),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Get Mappings', 'adminOAuthProviders.getMappings', 'GET', '/api/admin/oauth-providers/{oauthProviderUuid}/mappings', 'List OAuth provider mappings', ['oauthProviderUuid']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Get Users', 'adminOAuthProviders.getUsers', 'GET', '/api/admin/oauth-providers/{oauthProviderUuid}/users', 'List OAuth provider users', ['oauthProviderUuid']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Update', 'adminOAuthProviders.update', 'PATCH', '/api/admin/oauth-providers/{oauthProviderUuid}', 'Update an OAuth provider', ['oauthProviderUuid']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Update Mapping', 'adminOAuthProviders.updateMapping', 'PATCH', '/api/admin/oauth-providers/{oauthProviderUuid}/mappings/{mappingUuid}', 'Update an OAuth provider mapping', ['oauthProviderUuid', 'mappingUuid']),

	op('adminRoles', 'Admin Roles', 'Create', 'adminRoles.create', 'POST', '/api/admin/roles', 'Create a role'),
	op('adminRoles', 'Admin Roles', 'Delete', 'adminRoles.delete', 'DELETE', '/api/admin/roles/{roleUuid}', 'Delete a role', ['roleUuid']),
	op('adminRoles', 'Admin Roles', 'Get', 'adminRoles.get', 'GET', '/api/admin/roles/{roleUuid}', 'Get a role', ['roleUuid']),
	op('adminRoles', 'Admin Roles', 'Get Many', 'adminRoles.getMany', 'GET', '/api/admin/roles', 'List roles'),
	op('adminRoles', 'Admin Roles', 'Get Users', 'adminRoles.getUsers', 'GET', '/api/admin/roles/{roleUuid}/users', 'List users in a role', ['roleUuid']),
	op('adminRoles', 'Admin Roles', 'Update', 'adminRoles.update', 'PATCH', '/api/admin/roles/{roleUuid}', 'Update a role', ['roleUuid']),

	op('adminServers', 'Admin Servers', 'Cancel Transfer', 'adminServers.cancelTransfer', 'POST', '/api/admin/servers/{serverUuid}/transfer/cancel', 'Cancel a server transfer', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Clear State', 'adminServers.clearState', 'POST', '/api/admin/servers/{serverUuid}/clear-state', 'Clear server state', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Create', 'adminServers.create', 'POST', '/api/admin/servers', 'Create a server'),
	op('adminServers', 'Admin Servers', 'Create Allocation', 'adminServers.createAllocation', 'POST', '/api/admin/servers/{serverUuid}/allocations', 'Create a server allocation', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Create Mount Link', 'adminServers.createMountLink', 'POST', '/api/admin/servers/{serverUuid}/mounts', 'Attach a mount to a server', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Delete', 'adminServers.delete', 'DELETE', '/api/admin/servers/{serverUuid}', 'Delete a server', ['serverUuid'], true),
	op('adminServers', 'Admin Servers', 'Delete Allocation', 'adminServers.deleteAllocation', 'DELETE', '/api/admin/servers/{serverUuid}/allocations/{allocationUuid}', 'Delete a server allocation', ['serverUuid', 'allocationUuid']),
	op('adminServers', 'Admin Servers', 'Delete Mount Link', 'adminServers.deleteMountLink', 'DELETE', '/api/admin/servers/{serverUuid}/mounts/{mountUuid}', 'Detach a mount from a server', ['serverUuid', 'mountUuid']),
	op('adminServers', 'Admin Servers', 'Get', 'adminServers.get', 'GET', '/api/admin/servers/{serverUuid}', 'Get a server as admin', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Allocations', 'adminServers.getAllocations', 'GET', '/api/admin/servers/{serverUuid}/allocations', 'List server allocations as admin', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Available Mounts', 'adminServers.getAvailableMounts', 'GET', '/api/admin/servers/{serverUuid}/mounts/available', 'List mounts available to a server', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Backups', 'adminServers.getBackups', 'GET', '/api/admin/servers/{serverUuid}/backups', 'List server backups as admin', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Install Logs', 'adminServers.getInstallLogs', 'GET', '/api/admin/servers/{serverUuid}/logs/install', 'Get server install logs', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Logs', 'adminServers.getLogs', 'GET', '/api/admin/servers/{serverUuid}/logs', 'Get server logs', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Many', 'adminServers.getMany', 'GET', '/api/admin/servers', 'List servers as admin'),
	op('adminServers', 'Admin Servers', 'Get Mounts', 'adminServers.getMounts', 'GET', '/api/admin/servers/{serverUuid}/mounts', 'List server mounts as admin', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Variables', 'adminServers.getVariables', 'GET', '/api/admin/servers/{serverUuid}/variables', 'Get server variables as admin', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Start Transfer', 'adminServers.startTransfer', 'POST', '/api/admin/servers/{serverUuid}/transfer', 'Start a server transfer', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Update', 'adminServers.update', 'PATCH', '/api/admin/servers/{serverUuid}', 'Update a server as admin', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Update Allocation', 'adminServers.updateAllocation', 'PATCH', '/api/admin/servers/{serverUuid}/allocations/{allocationUuid}', 'Update a server allocation', ['serverUuid', 'allocationUuid']),
	op('adminServers', 'Admin Servers', 'Update Variables', 'adminServers.updateVariables', 'PUT', '/api/admin/servers/{serverUuid}/variables', 'Update server variables as admin', ['serverUuid']),

	op('adminSettings', 'Admin Settings', 'Get', 'adminSettings.get', 'GET', '/api/admin/settings', 'Get admin settings'),
	op('adminSettings', 'Admin Settings', 'Get Email Template', 'adminSettings.getEmailTemplate', 'GET', '/api/admin/system/email/templates/{templateIdentifier}', 'Get an email template', ['templateIdentifier']),
	op('adminSettings', 'Admin Settings', 'Get Email Templates', 'adminSettings.getEmailTemplates', 'GET', '/api/admin/system/email/templates', 'List email templates'),
	op('adminSettings', 'Admin Settings', 'Test Email', 'adminSettings.testEmail', 'POST', '/api/admin/system/email/test', 'Send a system email test'),
	op('adminSettings', 'Admin Settings', 'Update Activity Settings', 'adminSettings.updateActivity', 'PATCH', '/api/admin/settings/activity', 'Update activity settings'),
	op('adminSettings', 'Admin Settings', 'Update Application Settings', 'adminSettings.updateApplication', 'PATCH', '/api/admin/settings/application', 'Update application settings'),
	op('adminSettings', 'Admin Settings', 'Update Captcha Settings', 'adminSettings.updateCaptcha', 'PATCH', '/api/admin/settings/captcha', 'Update captcha settings'),
	op('adminSettings', 'Admin Settings', 'Update Email Settings', 'adminSettings.updateEmail', 'PATCH', '/api/admin/settings/email', 'Update email settings'),
	op('adminSettings', 'Admin Settings', 'Update Email Template', 'adminSettings.updateEmailTemplate', 'PUT', '/api/admin/system/email/templates/{templateIdentifier}', 'Update an email template', ['templateIdentifier']),
	op('adminSettings', 'Admin Settings', 'Update OOBE Settings', 'adminSettings.updateOobe', 'PATCH', '/api/admin/settings/oobe', 'Update OOBE settings'),
	op('adminSettings', 'Admin Settings', 'Update Ratelimit Settings', 'adminSettings.updateRatelimit', 'PATCH', '/api/admin/settings/ratelimit', 'Update rate limit settings'),
	op('adminSettings', 'Admin Settings', 'Update Server Settings', 'adminSettings.updateServer', 'PATCH', '/api/admin/settings/server', 'Update server settings'),
	op('adminSettings', 'Admin Settings', 'Update Storage Settings', 'adminSettings.updateStorage', 'PATCH', '/api/admin/settings/storage', 'Update storage settings'),
	op('adminSettings', 'Admin Settings', 'Update User Settings', 'adminSettings.updateUser', 'PATCH', '/api/admin/settings/user', 'Update user settings'),
	op('adminSettings', 'Admin Settings', 'Update WebAuthn Settings', 'adminSettings.updateWebauthn', 'PATCH', '/api/admin/settings/webauthn', 'Update WebAuthn settings'),

	op('adminStats', 'Admin Stats', 'Get Backup Stats', 'adminStats.getBackup', 'GET', '/api/admin/stats/backups', 'Get backup statistics'),
	op('adminStats', 'Admin Stats', 'Get General Stats', 'adminStats.getGeneral', 'GET', '/api/admin/stats/general', 'Get general admin statistics'),

	op('adminSystem', 'Admin System', 'Get Debug Mode', 'adminSystem.getDebugMode', 'GET', '/api/admin/system/debug', 'Get debug mode status'),
	op('adminSystem', 'Admin System', 'Get General Health', 'adminSystem.getGeneralHealth', 'GET', '/api/admin/system/health', 'Get general system health'),
	op('adminSystem', 'Admin System', 'Get Node Updates', 'adminSystem.getNodeUpdates', 'GET', '/api/admin/system/updates/nodes', 'Get node updates'),
	op('adminSystem', 'Admin System', 'Get Nodes Health', 'adminSystem.getNodesHealth', 'GET', '/api/admin/system/health/nodes', 'Get node health'),
	op('adminSystem', 'Admin System', 'Get OpenAPI Document', 'adminSystem.getOpenApi', 'GET', '/openapi.json', 'Get the Panel OpenAPI document'),
	op('adminSystem', 'Admin System', 'Get Overview', 'adminSystem.getOverview', 'GET', '/api/admin/system/overview', 'Get system overview'),
	op('adminSystem', 'Admin System', 'Get Telemetry', 'adminSystem.getTelemetry', 'GET', '/api/admin/system/telemetry', 'Get telemetry status'),
	op('adminSystem', 'Admin System', 'Get Update History', 'adminSystem.getUpdateHistory', 'GET', '/api/admin/system/updates/history', 'Get update history'),
	op('adminSystem', 'Admin System', 'Get Updates', 'adminSystem.getUpdates', 'GET', '/api/admin/system/updates', 'Get available updates'),
	op('adminSystem', 'Admin System', 'Recheck Updates', 'adminSystem.recheckUpdates', 'POST', '/api/admin/system/updates/recheck', 'Recheck available updates'),
	op('adminSystem', 'Admin System', 'Set Debug Mode', 'adminSystem.setDebugMode', 'PUT', '/api/admin/system/debug', 'Set debug mode'),

	op('adminUsers', 'Admin Users', 'Create', 'adminUsers.create', 'POST', '/api/admin/users', 'Create a user'),
	op('adminUsers', 'Admin Users', 'Create OAuth Link', 'adminUsers.createOAuthLink', 'POST', '/api/admin/users/{userUuid}/oauth-links', 'Create a user OAuth link', ['userUuid']),
	op('adminUsers', 'Admin Users', 'Delete', 'adminUsers.delete', 'DELETE', '/api/admin/users/{userUuid}', 'Delete a user', ['userUuid']),
	op('adminUsers', 'Admin Users', 'Delete OAuth Link', 'adminUsers.deleteOAuthLink', 'DELETE', '/api/admin/users/{userUuid}/oauth-links/{oauthLinkUuid}', 'Delete a user OAuth link', ['userUuid', 'oauthLinkUuid']),
	op('adminUsers', 'Admin Users', 'Disable Two-Factor', 'adminUsers.disableTwoFactor', 'DELETE', '/api/admin/users/{userUuid}/two-factor', 'Disable user two-factor authentication', ['userUuid']),
	op('adminUsers', 'Admin Users', 'Get', 'adminUsers.get', 'GET', '/api/admin/users/{userUuid}', 'Get a user', ['userUuid']),
	op('adminUsers', 'Admin Users', 'Get Activity', 'adminUsers.getActivity', 'GET', '/api/admin/users/{userUuid}/activity', 'Get user activity', ['userUuid']),
	op('adminUsers', 'Admin Users', 'Get Many', 'adminUsers.getMany', 'GET', '/api/admin/users', 'List users'),
	op('adminUsers', 'Admin Users', 'Get OAuth Links', 'adminUsers.getOAuthLinks', 'GET', '/api/admin/users/{userUuid}/oauth-links', 'List user OAuth links', ['userUuid']),
	op('adminUsers', 'Admin Users', 'Get Servers', 'adminUsers.getServers', 'GET', '/api/admin/users/{userUuid}/servers', 'List user servers', ['userUuid']),
	op('adminUsers', 'Admin Users', 'Send Password Reset Email', 'adminUsers.sendPasswordResetEmail', 'POST', '/api/admin/users/{userUuid}/email/reset-password', 'Send a password reset email', ['userUuid']),
	op('adminUsers', 'Admin Users', 'Update', 'adminUsers.update', 'PATCH', '/api/admin/users/{userUuid}', 'Update a user', ['userUuid']),

	op('clientAccount', 'Client Account', 'Delete API Key', 'clientAccount.deleteApiKey', 'DELETE', '/api/client/account/api-keys/{apiKeyUuid}', 'Delete an API key', ['apiKeyUuid']),
	op('clientAccount', 'Client Account', 'Delete Command Snippet', 'clientAccount.deleteCommandSnippet', 'DELETE', '/api/client/account/command-snippets/{commandSnippetUuid}', 'Delete a command snippet', ['commandSnippetUuid']),
	op('clientAccount', 'Client Account', 'Delete OAuth Link', 'clientAccount.deleteOAuthLink', 'DELETE', '/api/client/account/oauth-links/{oauthLinkUuid}', 'Delete an OAuth link', ['oauthLinkUuid']),
	op('clientAccount', 'Client Account', 'Delete Security Key', 'clientAccount.deleteSecurityKey', 'DELETE', '/api/client/account/security-keys/{securityKeyUuid}', 'Delete a security key', ['securityKeyUuid']),
	op('clientAccount', 'Client Account', 'Delete Session', 'clientAccount.deleteSession', 'DELETE', '/api/client/account/sessions/{sessionUuid}', 'Delete a session', ['sessionUuid']),
	op('clientAccount', 'Client Account', 'Delete SSH Key', 'clientAccount.deleteSshKey', 'DELETE', '/api/client/account/ssh-keys/{sshKeyUuid}', 'Delete an SSH key', ['sshKeyUuid']),
	op('clientAccount', 'Client Account', 'Get Permissions', 'clientAccount.getPermissions', 'GET', '/api/client/permissions', 'Get available API permissions'),
	op('clientAccount', 'Client Account', 'Recreate API Key', 'clientAccount.recreateApiKey', 'POST', '/api/client/account/api-keys/{apiKeyUuid}/recreate', 'Recreate an API key', ['apiKeyUuid']),
	op('clientAccount', 'Client Account', 'Security Key Challenge', 'clientAccount.securityKeyChallenge', 'POST', '/api/client/account/security-keys/{securityKeyUuid}/challenge', 'Create a security key challenge', ['securityKeyUuid']),
	op('clientAccount', 'Client Account', 'Update API Key', 'clientAccount.updateApiKey', 'PATCH', '/api/client/account/api-keys/{apiKeyUuid}', 'Update an API key', ['apiKeyUuid']),
	op('clientAccount', 'Client Account', 'Update Security Key', 'clientAccount.updateSecurityKey', 'PATCH', '/api/client/account/security-keys/{securityKeyUuid}', 'Update a security key', ['securityKeyUuid']),
	op('clientAccount', 'Client Account', 'Update SSH Key', 'clientAccount.updateSshKey', 'PATCH', '/api/client/account/ssh-keys/{sshKeyUuid}', 'Update an SSH key', ['sshKeyUuid']),

	op('clientServer', 'Client Server', 'Get', 'clientServer.get', 'GET', '/api/client/servers/{serverUuid}', 'Get a server', ['serverUuid']),
	op('clientServer', 'Client Server', 'Get Activity', 'clientServer.getActivity', 'GET', '/api/client/servers/{serverUuid}/activity', 'Get server activity', ['serverUuid']),
	op('clientServer', 'Client Server', 'Get Command Snippets For Egg', 'clientServer.getEggCommandSnippets', 'GET', '/api/client/servers/eggs/{eggUuid}/command-snippets', 'Get command snippets for an egg', ['eggUuid']),
	op('clientServer', 'Client Server', 'Get Many', 'clientServer.getMany', 'GET', '/api/client', 'List accessible servers'),
	op('clientServer', 'Client Server', 'Get Node Resources', 'clientServer.getNodeResources', 'GET', '/api/client/servers/nodes/{nodeUuid}/resources', 'Get client node resources', ['nodeUuid']),
	op('clientServer', 'Client Server', 'Get Resources', 'clientServer.getResources', 'GET', '/api/client/servers/{serverUuid}/resources', 'Get server runtime resources', ['serverUuid']),
	op('clientServer', 'Client Server', 'Get Server Group Servers', 'clientServer.getServerGroupServers', 'GET', '/api/client/servers/groups/{serverGroupUuid}', 'Get servers in a server group', ['serverGroupUuid']),
	op('clientServer', 'Client Server', 'Get Websocket Token', 'clientServer.getWebsocketToken', 'GET', '/api/client/servers/{serverUuid}/websocket', 'Get server websocket connection details', ['serverUuid']),
	op('clientServer', 'Client Server', 'Send Command', 'clientServer.sendCommand', 'POST', '/api/client/servers/{serverUuid}/command', 'Send a console command', ['serverUuid']),
	op('clientServer', 'Client Server', 'Set Power State', 'clientServer.setPowerState', 'POST', '/api/client/servers/{serverUuid}/power', 'Send a power signal', ['serverUuid']),
	op('clientServer', 'Client Server', 'Update Server Group', 'clientServer.updateServerGroup', 'PATCH', '/api/client/servers/groups/{serverGroupUuid}', 'Update a server group', ['serverGroupUuid']),

	op('serverAllocations', 'Server Allocations', 'Create', 'serverAllocations.create', 'POST', '/api/client/servers/{serverUuid}/allocations', 'Create a server allocation', ['serverUuid']),
	op('serverAllocations', 'Server Allocations', 'Delete', 'serverAllocations.delete', 'DELETE', '/api/client/servers/{serverUuid}/allocations/{allocationUuid}', 'Delete a server allocation', ['serverUuid', 'allocationUuid']),
	op('serverAllocations', 'Server Allocations', 'Get Many', 'serverAllocations.getMany', 'GET', '/api/client/servers/{serverUuid}/allocations', 'List server allocations', ['serverUuid']),
	op('serverAllocations', 'Server Allocations', 'Update', 'serverAllocations.update', 'PATCH', '/api/client/servers/{serverUuid}/allocations/{allocationUuid}', 'Update a server allocation', ['serverUuid', 'allocationUuid']),

	op('serverAnnouncements', 'Server Announcements', 'Get Many', 'serverAnnouncements.getMany', 'GET', '/api/client/servers/{serverUuid}/announcements', 'List server announcements', ['serverUuid']),

	op('serverBackups', 'Server Backups', 'Start Backup', 'serverBackups.create', 'POST', '/api/client/servers/{serverUuid}/backups', 'Start a backup', ['serverUuid']),
	op('serverBackups', 'Server Backups', 'Delete', 'serverBackups.delete', 'DELETE', '/api/client/servers/{serverUuid}/backups/{backupUuid}', 'Delete a backup', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Download', 'serverBackups.download', 'GET', '/api/client/servers/{serverUuid}/backups/{backupUuid}/download', 'Get a backup download URL', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Get', 'serverBackups.get', 'GET', '/api/client/servers/{serverUuid}/backups/{backupUuid}', 'Get a backup', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Get Many', 'serverBackups.getMany', 'GET', '/api/client/servers/{serverUuid}/backups', 'List backups', ['serverUuid']),
	op('serverBackups', 'Server Backups', 'Restore', 'serverBackups.restore', 'POST', '/api/client/servers/{serverUuid}/backups/{backupUuid}/restore', 'Restore a backup', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Update', 'serverBackups.update', 'PATCH', '/api/client/servers/{serverUuid}/backups/{backupUuid}', 'Update a backup', ['serverUuid', 'backupUuid']),

	op('serverDatabases', 'Server Databases', 'Create', 'serverDatabases.create', 'POST', '/api/client/servers/{serverUuid}/databases', 'Create a database', ['serverUuid']),
	op('serverDatabases', 'Server Databases', 'Delete', 'serverDatabases.delete', 'DELETE', '/api/client/servers/{serverUuid}/databases/{databaseUuid}', 'Delete a database', ['serverUuid', 'databaseUuid']),
	op('serverDatabases', 'Server Databases', 'Get Hosts', 'serverDatabases.getHosts', 'GET', '/api/client/servers/{serverUuid}/databases/hosts', 'List available database hosts', ['serverUuid']),
	op('serverDatabases', 'Server Databases', 'Get Many', 'serverDatabases.getMany', 'GET', '/api/client/servers/{serverUuid}/databases', 'List databases', ['serverUuid']),
	op('serverDatabases', 'Server Databases', 'Get Size', 'serverDatabases.getSize', 'GET', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/size', 'Get database size', ['serverUuid', 'databaseUuid']),
	op('serverDatabases', 'Server Databases', 'Recreate', 'serverDatabases.recreate', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/recreate', 'Recreate a database', ['serverUuid', 'databaseUuid']),
	op('serverDatabases', 'Server Databases', 'Rotate Password', 'serverDatabases.rotatePassword', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/rotate-password', 'Rotate database password', ['serverUuid', 'databaseUuid']),
	op('serverDatabases', 'Server Databases', 'Update', 'serverDatabases.update', 'PATCH', '/api/client/servers/{serverUuid}/databases/{databaseUuid}', 'Update a database', ['serverUuid', 'databaseUuid']),

	op('serverFiles', 'Server Files', 'Cancel Operation', 'serverFiles.cancelOperation', 'DELETE', '/api/client/servers/{serverUuid}/files/operations/{operationUuid}', 'Cancel a file operation', ['serverUuid', 'operationUuid']),
	op('serverFiles', 'Server Files', 'Change Permissions', 'serverFiles.chmod', 'PUT', '/api/client/servers/{serverUuid}/files/chmod', 'Change file permissions', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Compress', 'serverFiles.compress', 'POST', '/api/client/servers/{serverUuid}/files/compress', 'Compress files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Copy', 'serverFiles.copy', 'POST', '/api/client/servers/{serverUuid}/files/copy', 'Copy a file', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Copy Many', 'serverFiles.copyMany', 'POST', '/api/client/servers/{serverUuid}/files/copy-many', 'Copy multiple files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Copy Remote', 'serverFiles.copyRemote', 'POST', '/api/client/servers/{serverUuid}/files/copy-remote', 'Copy files from a remote source', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Create Directory', 'serverFiles.createDirectory', 'POST', '/api/client/servers/{serverUuid}/files/create-directory', 'Create a directory', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Decompress', 'serverFiles.decompress', 'POST', '/api/client/servers/{serverUuid}/files/decompress', 'Decompress an archive', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Delete', 'serverFiles.delete', 'POST', '/api/client/servers/{serverUuid}/files/delete', 'Delete files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Contents', 'serverFiles.getContents', 'GET', '/api/client/servers/{serverUuid}/files/contents', 'Get file contents', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Fingerprint', 'serverFiles.getFingerprint', 'GET', '/api/client/servers/{serverUuid}/files/fingerprint', 'Get a file fingerprint', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Largest Directories', 'serverFiles.getLargestDirectories', 'GET', '/api/client/servers/{serverUuid}/files/largest-directories', 'Get largest directories', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Operation', 'serverFiles.getOperation', 'GET', '/api/client/servers/{serverUuid}/files/operations/{operationUuid}', 'Get a file operation', ['serverUuid', 'operationUuid']),
	op('serverFiles', 'Server Files', 'Get Operations', 'serverFiles.getOperations', 'GET', '/api/client/servers/{serverUuid}/files/operations', 'List file operations', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Pull', 'serverFiles.getPull', 'GET', '/api/client/servers/{serverUuid}/files/pull/{pullUuid}', 'Get a remote pull operation', ['serverUuid', 'pullUuid']),
	op('serverFiles', 'Server Files', 'Get Revisions', 'serverFiles.getRevisions', 'GET', '/api/client/servers/{serverUuid}/files/revisions', 'List file revisions', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Revision Content', 'serverFiles.getRevisionContent', 'GET', '/api/client/servers/{serverUuid}/files/revisions/{revisionId}', 'Get file revision content', ['serverUuid', 'revisionId']),
	op('serverFiles', 'Server Files', 'Get Upload URL', 'serverFiles.getUploadUrl', 'GET', '/api/client/servers/{serverUuid}/files/upload', 'Get a file upload URL', ['serverUuid']),
	op('serverFiles', 'Server Files', 'List', 'serverFiles.list', 'GET', '/api/client/servers/{serverUuid}/files/list', 'List files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Pull', 'serverFiles.pull', 'POST', '/api/client/servers/{serverUuid}/files/pull', 'Start a remote file pull', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Query Pull', 'serverFiles.queryPull', 'POST', '/api/client/servers/{serverUuid}/files/pull/query', 'Query a remote file pull URL', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Rename', 'serverFiles.rename', 'PUT', '/api/client/servers/{serverUuid}/files/rename', 'Rename files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Search', 'serverFiles.search', 'GET', '/api/client/servers/{serverUuid}/files/search', 'Search server files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Write', 'serverFiles.write', 'POST', '/api/client/servers/{serverUuid}/files/write', 'Write file contents', ['serverUuid'], true, true),

	op('serverMounts', 'Server Mounts', 'Attach', 'serverMounts.attach', 'POST', '/api/client/servers/{serverUuid}/mounts', 'Attach a mount', ['serverUuid']),
	op('serverMounts', 'Server Mounts', 'Detach', 'serverMounts.detach', 'DELETE', '/api/client/servers/{serverUuid}/mounts/{mountUuid}', 'Detach a mount', ['serverUuid', 'mountUuid']),
	op('serverMounts', 'Server Mounts', 'Get Many', 'serverMounts.getMany', 'GET', '/api/client/servers/{serverUuid}/mounts', 'List server mounts', ['serverUuid']),

	op('serverSchedules', 'Server Schedules', 'Abort', 'serverSchedules.abort', 'POST', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/abort', 'Abort a schedule', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Create', 'serverSchedules.create', 'POST', '/api/client/servers/{serverUuid}/schedules', 'Create a schedule', ['serverUuid']),
	op('serverSchedules', 'Server Schedules', 'Create Step', 'serverSchedules.createStep', 'POST', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/steps', 'Create a schedule step', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Delete', 'serverSchedules.delete', 'DELETE', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}', 'Delete a schedule', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Delete Step', 'serverSchedules.deleteStep', 'DELETE', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/steps/{stepUuid}', 'Delete a schedule step', ['serverUuid', 'scheduleUuid', 'stepUuid']),
	op('serverSchedules', 'Server Schedules', 'Export', 'serverSchedules.export', 'GET', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/export', 'Export a schedule', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Get', 'serverSchedules.get', 'GET', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}', 'Get a schedule', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Get Many', 'serverSchedules.getMany', 'GET', '/api/client/servers/{serverUuid}/schedules', 'List schedules', ['serverUuid']),
	op('serverSchedules', 'Server Schedules', 'Get Status', 'serverSchedules.getStatus', 'GET', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/status', 'Get schedule status', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Get Steps', 'serverSchedules.getSteps', 'GET', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/steps', 'List schedule steps', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Import', 'serverSchedules.import', 'POST', '/api/client/servers/{serverUuid}/schedules/import', 'Import a schedule', ['serverUuid']),
	op('serverSchedules', 'Server Schedules', 'Trigger', 'serverSchedules.trigger', 'POST', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/trigger', 'Trigger a schedule', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Update', 'serverSchedules.update', 'PATCH', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}', 'Update a schedule', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Update Step', 'serverSchedules.updateStep', 'PATCH', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/steps/{stepUuid}', 'Update a schedule step', ['serverUuid', 'scheduleUuid', 'stepUuid']),
	op('serverSchedules', 'Server Schedules', 'Update Step Order', 'serverSchedules.updateStepOrder', 'PUT', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/steps/order', 'Update schedule step order', ['serverUuid', 'scheduleUuid']),

	op('serverSettings', 'Server Settings', 'Cancel Install', 'serverSettings.cancelInstall', 'POST', '/api/client/servers/{serverUuid}/settings/install/cancel', 'Cancel server installation', ['serverUuid']),
	op('serverSettings', 'Server Settings', 'Install', 'serverSettings.install', 'POST', '/api/client/servers/{serverUuid}/settings/install', 'Install or reinstall a server', ['serverUuid']),
	op('serverSettings', 'Server Settings', 'Rename', 'serverSettings.rename', 'POST', '/api/client/servers/{serverUuid}/settings/rename', 'Rename a server', ['serverUuid']),
	op('serverSettings', 'Server Settings', 'Update Auto Kill', 'serverSettings.updateAutoKill', 'PUT', '/api/client/servers/{serverUuid}/settings/auto-kill', 'Update auto-kill settings', ['serverUuid']),
	op('serverSettings', 'Server Settings', 'Update Auto Start', 'serverSettings.updateAutoStart', 'PUT', '/api/client/servers/{serverUuid}/settings/auto-start', 'Update auto-start settings', ['serverUuid']),
	op('serverSettings', 'Server Settings', 'Update Timezone', 'serverSettings.updateTimezone', 'PUT', '/api/client/servers/{serverUuid}/settings/timezone', 'Update server timezone', ['serverUuid']),

	op('serverStartup', 'Server Startup', 'Get Variables', 'serverStartup.getVariables', 'GET', '/api/client/servers/{serverUuid}/startup/variables', 'Get startup variables', ['serverUuid']),
	op('serverStartup', 'Server Startup', 'Update Command', 'serverStartup.updateCommand', 'PUT', '/api/client/servers/{serverUuid}/startup/command', 'Update startup command', ['serverUuid']),
	op('serverStartup', 'Server Startup', 'Update Docker Image', 'serverStartup.updateDockerImage', 'PUT', '/api/client/servers/{serverUuid}/startup/docker-image', 'Update Docker image', ['serverUuid']),
	op('serverStartup', 'Server Startup', 'Update Variables', 'serverStartup.updateVariables', 'PUT', '/api/client/servers/{serverUuid}/startup/variables', 'Update startup variables', ['serverUuid']),

	op('serverSubusers', 'Server Subusers', 'Create', 'serverSubusers.create', 'POST', '/api/client/servers/{serverUuid}/subusers', 'Create a subuser', ['serverUuid']),
	op('serverSubusers', 'Server Subusers', 'Delete', 'serverSubusers.delete', 'DELETE', '/api/client/servers/{serverUuid}/subusers/{subuserUuid}', 'Delete a subuser', ['serverUuid', 'subuserUuid']),
	op('serverSubusers', 'Server Subusers', 'Get', 'serverSubusers.get', 'GET', '/api/client/servers/{serverUuid}/subusers/{subuserUuid}', 'Get a subuser', ['serverUuid', 'subuserUuid']),
	op('serverSubusers', 'Server Subusers', 'Get Many', 'serverSubusers.getMany', 'GET', '/api/client/servers/{serverUuid}/subusers', 'List subusers', ['serverUuid']),
	op('serverSubusers', 'Server Subusers', 'Update', 'serverSubusers.update', 'PATCH', '/api/client/servers/{serverUuid}/subusers/{subuserUuid}', 'Update a subuser', ['serverUuid', 'subuserUuid']),

	op('system', 'System', 'Get Announcements', 'system.getAnnouncements', 'GET', '/api/announcements', 'Get public announcements'),
	op('system', 'System', 'Get OpenAPI Document', 'system.getOpenApi', 'GET', '/openapi.json', 'Get the Panel OpenAPI document'),
	op('system', 'System', 'Get Public Settings', 'system.getPublicSettings', 'GET', '/api/settings', 'Get public panel settings'),
];

export const customOperation: OperationSpec = op(
	'custom',
	'Custom Request',
	'Request',
	'custom.request',
	'GET',
	'',
	'Make a custom Calagopus API request',
	[],
	true,
);

const allOperations = [...operations, customOperation];

const operationValuesUsing = (identifier: IdentifierName): string[] =>
	allOperations
		.filter((operation) => operation.identifiers?.includes(identifier))
		.map((operation) => operation.value);

const bodyOperationValues = allOperations
	.filter((operation) => operation.hasBody)
	.map((operation) => operation.value);

const rawBodyOperationValues = allOperations
	.filter((operation) => operation.rawBody)
	.map((operation) => operation.value);

const showForJsonBody = (operation: string[]) => ({
	operation,
	bodyMode: ['json'],
});

const structuredBodyProperties: INodeProperties[] = [
	{
		displayName: 'Command',
		name: 'consoleCommand',
		type: 'string',
		required: true,
		displayOptions: { show: showForJsonBody(['clientServer.sendCommand']) },
		default: '',
		description: 'The console command to send to the server',
	},
	{
		displayName: 'Power Action',
		name: 'powerAction',
		type: 'options',
		required: true,
		displayOptions: { show: showForJsonBody(['clientServer.setPowerState']) },
		options: [
			{ name: 'Kill', value: 'kill' },
			{ name: 'Restart', value: 'restart' },
			{ name: 'Start', value: 'start' },
			{ name: 'Stop', value: 'stop' },
		],
		default: 'start',
		description: 'The power action to send',
	},
	{
		displayName: 'Backup Name',
		name: 'backupName',
		type: 'string',
		displayOptions: { show: showForJsonBody(['serverBackups.create', 'serverBackups.update']) },
		default: '',
		description: 'The backup name. Leave empty on create to use the panel default.',
	},
	{
		displayName: 'Ignored Files',
		name: 'backupIgnoredFiles',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		displayOptions: { show: showForJsonBody(['serverBackups.create']) },
		default: '',
		placeholder: '*.log\ncache/\ntmp/**',
		description: 'Files or patterns to exclude from the backup, one per line',
	},
	{
		displayName: 'Locked',
		name: 'backupLocked',
		type: 'boolean',
		displayOptions: { show: showForJsonBody(['serverBackups.update']) },
		default: false,
		description: 'Whether the backup should be locked',
	},
	{
		displayName: 'Truncate Directory',
		name: 'truncateDirectory',
		type: 'boolean',
		displayOptions: {
			show: showForJsonBody(['serverBackups.restore', 'serverSettings.install']),
		},
		default: false,
		description: 'Whether to empty the server directory before restoring or reinstalling',
	},
	{
		displayName: 'Restore Startup',
		name: 'restoreStartup',
		type: 'boolean',
		displayOptions: { show: showForJsonBody(['serverBackups.restore']) },
		default: false,
		description: 'Whether to restore startup variables from backup metadata',
	},
	{
		displayName: 'Database Name',
		name: 'databaseName',
		type: 'string',
		required: true,
		displayOptions: { show: showForJsonBody(['serverDatabases.create']) },
		default: '',
		description: 'The name to create on the selected database host',
	},
	{
		displayName: 'Database Host UUID',
		name: 'databaseHostUuidBody',
		type: 'string',
		required: true,
		displayOptions: { show: showForJsonBody(['serverDatabases.create']) },
		default: '',
		description: 'The host UUID where the database should be created',
	},
	{
		displayName: 'Locked',
		name: 'databaseLocked',
		type: 'boolean',
		displayOptions: { show: showForJsonBody(['serverDatabases.update']) },
		default: false,
		description: 'Whether the database should be locked',
	},
	{
		displayName: 'Server Name',
		name: 'serverName',
		type: 'string',
		displayOptions: { show: showForJsonBody(['serverSettings.rename']) },
		default: '',
		description: 'The new server name',
	},
	{
		displayName: 'Description',
		name: 'serverDescription',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		displayOptions: { show: showForJsonBody(['serverSettings.rename']) },
		default: '',
		description: 'The new server description. Leave empty to keep the current description.',
	},
	{
		displayName: 'Enabled',
		name: 'autoKillEnabled',
		type: 'boolean',
		displayOptions: { show: showForJsonBody(['serverSettings.updateAutoKill']) },
		default: false,
		description: 'Whether auto-kill should be enabled',
	},
	{
		displayName: 'Seconds',
		name: 'autoKillSeconds',
		type: 'number',
		displayOptions: { show: showForJsonBody(['serverSettings.updateAutoKill']) },
		default: 30,
		description: 'Seconds to wait before killing the server',
		typeOptions: {
			minValue: 1,
			maxValue: 3600,
		},
	},
	{
		displayName: 'Auto Start Behavior',
		name: 'autoStartBehavior',
		type: 'options',
		displayOptions: { show: showForJsonBody(['serverSettings.updateAutoStart']) },
		options: [
			{ name: 'Always', value: 'always' },
			{ name: 'Never', value: 'never' },
			{ name: 'Unless Stopped', value: 'unless_stopped' },
		],
		default: 'unless_stopped',
		description: 'When Calagopus should automatically start the server',
	},
	{
		displayName: 'Timezone',
		name: 'serverTimezone',
		type: 'string',
		displayOptions: { show: showForJsonBody(['serverSettings.updateTimezone']) },
		default: '',
		placeholder: 'Europe/Berlin',
		description: 'The server timezone. Use Body JSON with {"timezone": null} to clear it.',
	},
	{
		displayName: 'Startup Command',
		name: 'startupCommand',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		displayOptions: { show: showForJsonBody(['serverStartup.updateCommand']) },
		default: '',
		description: 'The server startup command',
	},
	{
		displayName: 'Docker Image',
		name: 'startupDockerImage',
		type: 'string',
		displayOptions: { show: showForJsonBody(['serverStartup.updateDockerImage']) },
		default: '',
		description: 'The Docker image to use for the server',
	},
];

const uniqueResources = new Map<string, string>();
for (const operation of allOperations) {
	uniqueResources.set(operation.resource, operation.resourceName);
}

export const resourceOptions: INodePropertyOptions[] = [...uniqueResources.entries()]
	.map(([value, name]) => ({ name, value }))
	.sort((a, b) => a.name.localeCompare(b.name));

export const operationProperties: INodeProperties[] = resourceOptions.map((resource) => {
	const options = allOperations
		.filter((operation) => operation.resource === resource.value)
		.map((operation) => ({
			name: operation.name,
			value: operation.value,
			description: operation.description,
			action: operation.description,
		}))
		.sort((a, b) => a.name.localeCompare(b.name));

	// eslint-disable-next-line n8n-nodes-base/node-param-default-missing
	return {
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [resource.value as string],
			},
		},
		options,
		default: options[0]!.value,
	};
});

const identifierLabels: Record<IdentifierName, { displayName: string; description: string }> = {
	allocationUuid: {
		displayName: 'Allocation UUID',
		description: 'The allocation UUID',
	},
	announcementUuid: {
		displayName: 'Announcement UUID',
		description: 'The announcement UUID',
	},
	apiKeyUuid: {
		displayName: 'API Key UUID',
		description: 'The API key UUID',
	},
	backupConfigurationUuid: {
		displayName: 'Backup Configuration UUID',
		description: 'The backup configuration UUID',
	},
	backupUuid: {
		displayName: 'Backup UUID',
		description: 'The backup UUID',
	},
	commandSnippetUuid: {
		displayName: 'Command Snippet UUID',
		description: 'The command snippet UUID',
	},
	databaseHostUuid: {
		displayName: 'Database Host UUID',
		description: 'The database host UUID',
	},
	databaseUuid: {
		displayName: 'Database UUID',
		description: 'The database UUID',
	},
	eggConfigurationUuid: {
		displayName: 'Egg Configuration UUID',
		description: 'The egg configuration UUID',
	},
	eggRepositoryUuid: {
		displayName: 'Egg Repository UUID',
		description: 'The egg repository UUID',
	},
	eggUuid: {
		displayName: 'Egg UUID',
		description: 'The egg UUID',
	},
	extensionPackageName: {
		displayName: 'Extension Package Name',
		description: 'The extension package name',
	},
	hostUuid: {
		displayName: 'Host UUID',
		description: 'The database host UUID for a nested route',
	},
	locationUuid: {
		displayName: 'Location UUID',
		description: 'The location UUID',
	},
	mappingUuid: {
		displayName: 'Mapping UUID',
		description: 'The mapping UUID',
	},
	mountUuid: {
		displayName: 'Mount UUID',
		description: 'The mount UUID',
	},
	nestUuid: {
		displayName: 'Nest UUID',
		description: 'The nest UUID',
	},
	nodeUuid: {
		displayName: 'Node UUID',
		description: 'The node UUID',
	},
	oauthLinkUuid: {
		displayName: 'OAuth Link UUID',
		description: 'The OAuth link UUID',
	},
	oauthProviderUuid: {
		displayName: 'OAuth Provider UUID',
		description: 'The OAuth provider UUID',
	},
	operationUuid: {
		displayName: 'Operation UUID',
		description: 'The operation UUID',
	},
	pullUuid: {
		displayName: 'Pull UUID',
		description: 'The remote file pull UUID',
	},
	revisionId: {
		displayName: 'Revision ID',
		description: 'The file revision ID',
	},
	roleUuid: {
		displayName: 'Role UUID',
		description: 'The role UUID',
	},
	scheduleUuid: {
		displayName: 'Schedule UUID',
		description: 'The schedule UUID',
	},
	securityKeyUuid: {
		displayName: 'Security Key UUID',
		description: 'The security key UUID',
	},
	serverGroupUuid: {
		displayName: 'Server Group UUID',
		description: 'The server group UUID',
	},
	serverUuid: {
		displayName: 'Server UUID',
		description: 'The server UUID or identifier',
	},
	sessionUuid: {
		displayName: 'Session UUID',
		description: 'The session UUID',
	},
	sshKeyUuid: {
		displayName: 'SSH Key UUID',
		description: 'The SSH key UUID',
	},
	stepUuid: {
		displayName: 'Step UUID',
		description: 'The schedule step UUID',
	},
	subuserUuid: {
		displayName: 'Subuser UUID',
		description: 'The subuser UUID',
	},
	templateIdentifier: {
		displayName: 'Template Identifier',
		description: 'The email template identifier',
	},
	userUuid: {
		displayName: 'User UUID',
		description: 'The user UUID',
	},
	variableUuid: {
		displayName: 'Variable UUID',
		description: 'The variable UUID',
	},
};

const identifierProperties = (Object.keys(identifierLabels) as IdentifierName[])
	.map((identifier): INodeProperties | undefined => {
		const operationValues = operationValuesUsing(identifier);

		if (operationValues.length === 0) {
			return undefined;
		}

		return {
			displayName: identifierLabels[identifier].displayName,
			name: identifier,
			type: 'string',
			required: true,
			default: '',
			description: identifierLabels[identifier].description,
			displayOptions: {
				show: {
					operation: operationValues,
				},
			},
		};
	})
	.filter((property): property is INodeProperties => property !== undefined);

export const commonProperties: INodeProperties[] = [
	...identifierProperties,
	{
		displayName: 'HTTP Method',
		name: 'customMethod',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['custom'],
			},
		},
		options: [
			{ name: 'DELETE', value: 'DELETE' },
			{ name: 'GET', value: 'GET' },
			{ name: 'PATCH', value: 'PATCH' },
			{ name: 'POST', value: 'POST' },
			{ name: 'PUT', value: 'PUT' },
		],
		default: 'GET',
	},
	{
		displayName: 'Path',
		name: 'customPath',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['custom'],
			},
		},
		default: '',
		placeholder: '/api/client/permissions',
		description: 'The API path to request, with or without a leading slash',
	},
	{
		displayName: 'Query Parameters JSON',
		name: 'queryJson',
		type: 'json',
		default: '{}',
		description: 'Query parameters to send as a JSON object',
	},
	{
		displayName: 'Body Mode',
		name: 'bodyMode',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				operation: bodyOperationValues,
			},
		},
		options: [
			{ name: 'JSON', value: 'json' },
			{ name: 'Raw Text', value: 'raw' },
			{ name: 'None', value: 'none' },
		],
		default: 'json',
	},
	...structuredBodyProperties,
	{
		displayName: 'Body JSON',
		name: 'bodyJson',
		type: 'json',
		displayOptions: {
			show: {
				bodyMode: ['json'],
				operation: bodyOperationValues,
			},
		},
		default: '{}',
		description: 'Request body to send as a JSON object',
	},
	{
		displayName: 'Raw Body',
		name: 'rawBody',
		type: 'string',
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				bodyMode: ['raw'],
				operation: bodyOperationValues,
			},
		},
		default: '',
		description: 'Request body to send as plain text',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		options: [
			{
				displayName: 'Ignore HTTP Status Errors',
				name: 'ignoreHttpStatusErrors',
				type: 'boolean',
				default: false,
				description: 'Whether to return error responses instead of failing the workflow item',
			},
			{
				displayName: 'Return Full Response',
				name: 'returnFullResponse',
				type: 'boolean',
				default: false,
				description: 'Whether to return status, headers, and body instead of only the response body',
			},
			{
				displayName: 'Timeout',
				name: 'timeout',
				type: 'number',
				default: 0,
				description: 'Request timeout in milliseconds. Set to 0 to use n8n defaults.',
				typeOptions: {
					minValue: 0,
				},
			},
		],
	},
];

export const defaultBodyModeByOperation = new Map(
	rawBodyOperationValues.map((operationValue) => [operationValue, 'raw']),
);

export const operationByValue = new Map(allOperations.map((operation) => [operation.value, operation]));
