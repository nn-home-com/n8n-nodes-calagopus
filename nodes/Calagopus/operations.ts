import type { IHttpRequestMethods, INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export type IdentifierName =
	| 'allocationUuid'
	| 'announcementUuid'
	| 'apiKeyIdentifier'
	| 'apiKeyUuid'
	| 'backupConfigurationUuid'
	| 'backupGroupUuid'
	| 'backupUuid'
	| 'commandSnippetUuid'
	| 'connectionUuid'
	| 'databaseAgentHostUuid'
	| 'databaseAgentTemplateUuid'
	| 'databaseHostUuid'
	| 'databaseInstanceUuid'
	| 'databaseUserUuid'
	| 'databaseUuid'
	| 'deviceUuid'
	| 'eggConfigurationUuid'
	| 'eggRepositoryUuid'
	| 'eggUuid'
	| 'emailVariableName'
	| 'extensionPackageName'
	| 'externalServerId'
	| 'externalUserId'
	| 'hostUuid'
	| 'locationUuid'
	| 'logFile'
	| 'mappingUuid'
	| 'mountUuid'
	| 'nestUuid'
	| 'nodeUuid'
	| 'oauthLinkUuid'
	| 'oauthProviderUuid'
	| 'oauthUserIdentifier'
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
	| 'systemBackupPolicyUuid'
	| 'templateIdentifier'
	| 'userUuid'
	| 'variableUuid';

/**
 * How the request body of an operation is sent.
 *
 * - `json`: a JSON object, optionally prefilled from structured fields
 * - `raw`: plain text, e.g. file contents
 * - `binary`: the contents of a binary property of the input item, e.g. a database dump
 */
export type BodyFormat = 'json' | 'raw' | 'binary';

/**
 * How the response of an operation is returned.
 *
 * - `json`: the parsed response body as item JSON
 * - `binary`: the response body as item binary data, e.g. an exported file
 */
export type ResponseFormat = 'json' | 'binary';

export interface OperationSpec {
	name: string;
	value: string;
	resource: string;
	resourceName: string;
	method: IHttpRequestMethods;
	path: string;
	description: string;
	identifiers: IdentifierName[];
	hasBody: boolean;
	body: BodyFormat;
	response: ResponseFormat;
}

interface OperationOptions {
	/** Defaults to `true` for every method except GET and DELETE. */
	hasBody?: boolean;
	body?: BodyFormat;
	response?: ResponseFormat;
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
	{
		hasBody = !['GET', 'DELETE'].includes(method),
		body = 'json',
		response = 'json',
	}: OperationOptions = {},
): OperationSpec => ({
	resource,
	resourceName,
	name,
	value,
	method,
	path,
	description,
	identifiers,
	hasBody: hasBody || body !== 'json',
	body,
	response,
});

export const operations: OperationSpec[] = [
	op('adminActivity', 'Admin Activity', 'Get Many', 'adminActivity.getMany', 'GET', '/api/admin/activity', 'List admin activity'),

	op('adminAnnouncements', 'Admin Announcements', 'Create', 'adminAnnouncements.create', 'POST', '/api/admin/announcements', 'Create an announcement'),
	op('adminAnnouncements', 'Admin Announcements', 'Delete', 'adminAnnouncements.delete', 'DELETE', '/api/admin/announcements/{announcementUuid}', 'Delete an announcement', ['announcementUuid']),
	op('adminAnnouncements', 'Admin Announcements', 'Get', 'adminAnnouncements.get', 'GET', '/api/admin/announcements/{announcementUuid}', 'Get an announcement', ['announcementUuid']),
	op('adminAnnouncements', 'Admin Announcements', 'Get Many', 'adminAnnouncements.getMany', 'GET', '/api/admin/announcements', 'List announcements'),
	op('adminAnnouncements', 'Admin Announcements', 'Update', 'adminAnnouncements.update', 'PATCH', '/api/admin/announcements/{announcementUuid}', 'Update an announcement', ['announcementUuid']),
	op('adminAnnouncements', 'Admin Announcements', 'Duplicate', 'adminAnnouncements.duplicate', 'POST', '/api/admin/announcements/{announcementUuid}/duplicate', 'Duplicate an announcement', ['announcementUuid']),

	op('adminAssets', 'Admin Assets', 'Get Many', 'adminAssets.getMany', 'GET', '/api/admin/assets', 'List assets'),
	op('adminAssets', 'Admin Assets', 'Upload', 'adminAssets.upload', 'PUT', '/api/admin/assets', 'Upload an asset'),
	op('adminAssets', 'Admin Assets', 'Delete', 'adminAssets.delete', 'POST', '/api/admin/assets/delete', 'Delete an asset'),
	op('adminAssets', 'Admin Assets', 'Search', 'adminAssets.search', 'POST', '/api/admin/assets/search', 'Search assets'),

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
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Delete Failed Backups', 'adminBackupConfigurations.deleteFailedBackups', 'POST', '/api/admin/backup-configurations/{backupConfigurationUuid}/backups/delete-failed', 'Queue deletion of all failed backups for a backup configuration', ['backupConfigurationUuid']),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Duplicate', 'adminBackupConfigurations.duplicate', 'POST', '/api/admin/backup-configurations/{backupConfigurationUuid}/duplicate', 'Duplicate a backup configuration', ['backupConfigurationUuid']),
	op('adminBackupConfigurations', 'Admin Backup Configurations', 'Test', 'adminBackupConfigurations.test', 'POST', '/api/admin/backup-configurations/test', 'Test a backup configuration on a node'),

	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Create', 'adminDatabaseAgentHosts.create', 'POST', '/api/admin/database-agent-hosts', 'Create a database agent host'),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Delete', 'adminDatabaseAgentHosts.delete', 'DELETE', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}', 'Delete a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Delete Failed Backups', 'adminDatabaseAgentHosts.deleteFailedBackups', 'POST', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/backups/delete-failed', 'Queue deletion of all failed backups on a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Delete Instance', 'adminDatabaseAgentHosts.deleteInstance', 'DELETE', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/instances/{databaseInstanceUuid}', 'Delete a database instance', ['databaseAgentHostUuid', 'databaseInstanceUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get', 'adminDatabaseAgentHosts.get', 'GET', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}', 'Get a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get Backups', 'adminDatabaseAgentHosts.getBackups', 'GET', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/backups', 'List backups on a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get Capacities', 'adminDatabaseAgentHosts.getCapacities', 'GET', '/api/admin/database-agent-hosts/capacities', 'Get the capacity of all database agent hosts'),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get Capacity', 'adminDatabaseAgentHosts.getCapacity', 'GET', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/capacity', 'Get the capacity of a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get Config', 'adminDatabaseAgentHosts.getConfig', 'GET', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/config', 'Get the database agent configuration', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get Instance', 'adminDatabaseAgentHosts.getInstance', 'GET', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/instances/{databaseInstanceUuid}', 'Get a database instance', ['databaseAgentHostUuid', 'databaseInstanceUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get Instances', 'adminDatabaseAgentHosts.getInstances', 'GET', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/instances', 'List database instances on a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get Many', 'adminDatabaseAgentHosts.getMany', 'GET', '/api/admin/database-agent-hosts', 'List database agent hosts'),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get System Overview', 'adminDatabaseAgentHosts.getSystemOverview', 'GET', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/system/overview', 'Get the system overview of a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get System Stats', 'adminDatabaseAgentHosts.getSystemStats', 'GET', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/system/stats', 'Get system statistics of a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Get Token', 'adminDatabaseAgentHosts.getToken', 'GET', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/token', 'Get the database agent host token', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Reset Token', 'adminDatabaseAgentHosts.resetToken', 'POST', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/reset-token', 'Reset the database agent host token', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Test', 'adminDatabaseAgentHosts.test', 'POST', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/test', 'Test the connection to a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Update', 'adminDatabaseAgentHosts.update', 'PATCH', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}', 'Update a database agent host', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Update Config', 'adminDatabaseAgentHosts.updateConfig', 'PATCH', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/config', 'Update the database agent configuration', ['databaseAgentHostUuid']),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Update Default Config', 'adminDatabaseAgentHosts.updateDefaultConfig', 'PATCH', '/api/admin/database-agent-hosts/config', 'Update the default database agent configuration'),
	op('adminDatabaseAgentHosts', 'Admin Database Agent Hosts', 'Update Instance', 'adminDatabaseAgentHosts.updateInstance', 'PATCH', '/api/admin/database-agent-hosts/{databaseAgentHostUuid}/instances/{databaseInstanceUuid}', 'Update a database instance', ['databaseAgentHostUuid', 'databaseInstanceUuid']),

	op('adminDatabaseAgentTemplates', 'Admin Database Agent Templates', 'Create', 'adminDatabaseAgentTemplates.create', 'POST', '/api/admin/database-agent-templates', 'Create a database agent template'),
	op('adminDatabaseAgentTemplates', 'Admin Database Agent Templates', 'Delete', 'adminDatabaseAgentTemplates.delete', 'DELETE', '/api/admin/database-agent-templates/{databaseAgentTemplateUuid}', 'Delete a database agent template', ['databaseAgentTemplateUuid']),
	op('adminDatabaseAgentTemplates', 'Admin Database Agent Templates', 'Duplicate', 'adminDatabaseAgentTemplates.duplicate', 'POST', '/api/admin/database-agent-templates/{databaseAgentTemplateUuid}/duplicate', 'Duplicate a database agent template', ['databaseAgentTemplateUuid']),
	op('adminDatabaseAgentTemplates', 'Admin Database Agent Templates', 'Get', 'adminDatabaseAgentTemplates.get', 'GET', '/api/admin/database-agent-templates/{databaseAgentTemplateUuid}', 'Get a database agent template', ['databaseAgentTemplateUuid']),
	op('adminDatabaseAgentTemplates', 'Admin Database Agent Templates', 'Get Instances', 'adminDatabaseAgentTemplates.getInstances', 'GET', '/api/admin/database-agent-templates/{databaseAgentTemplateUuid}/instances', 'List database instances using a template', ['databaseAgentTemplateUuid']),
	op('adminDatabaseAgentTemplates', 'Admin Database Agent Templates', 'Get Many', 'adminDatabaseAgentTemplates.getMany', 'GET', '/api/admin/database-agent-templates', 'List database agent templates'),
	op('adminDatabaseAgentTemplates', 'Admin Database Agent Templates', 'Update', 'adminDatabaseAgentTemplates.update', 'PATCH', '/api/admin/database-agent-templates/{databaseAgentTemplateUuid}', 'Update a database agent template', ['databaseAgentTemplateUuid']),
	op('adminDatabaseAgentTemplates', 'Admin Database Agent Templates', 'Update Instances', 'adminDatabaseAgentTemplates.updateInstances', 'POST', '/api/admin/database-agent-templates/{databaseAgentTemplateUuid}/instances/update', 'Apply the current template specification to its database instances', ['databaseAgentTemplateUuid']),

	op('adminDatabaseHosts', 'Admin Database Hosts', 'Create', 'adminDatabaseHosts.create', 'POST', '/api/admin/database-hosts', 'Create a database host'),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Delete', 'adminDatabaseHosts.delete', 'DELETE', '/api/admin/database-hosts/{databaseHostUuid}', 'Delete a database host', ['databaseHostUuid']),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Get', 'adminDatabaseHosts.get', 'GET', '/api/admin/database-hosts/{databaseHostUuid}', 'Get a database host', ['databaseHostUuid']),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Get Databases', 'adminDatabaseHosts.getDatabases', 'GET', '/api/admin/database-hosts/{databaseHostUuid}/databases', 'List databases on a host', ['databaseHostUuid']),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Get Many', 'adminDatabaseHosts.getMany', 'GET', '/api/admin/database-hosts', 'List database hosts'),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Test', 'adminDatabaseHosts.test', 'POST', '/api/admin/database-hosts/{databaseHostUuid}/test', 'Test a database host connection', ['databaseHostUuid']),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Update', 'adminDatabaseHosts.update', 'PATCH', '/api/admin/database-hosts/{databaseHostUuid}', 'Update a database host', ['databaseHostUuid']),
	op('adminDatabaseHosts', 'Admin Database Hosts', 'Delete Database', 'adminDatabaseHosts.deleteDatabase', 'DELETE', '/api/admin/database-hosts/{databaseHostUuid}/databases/{databaseUuid}', 'Delete a database on a database host', ['databaseHostUuid', 'databaseUuid']),

	op('adminDevices', 'Admin Devices', 'Create', 'adminDevices.create', 'POST', '/api/admin/devices', 'Create a device'),
	op('adminDevices', 'Admin Devices', 'Delete', 'adminDevices.delete', 'DELETE', '/api/admin/devices/{deviceUuid}', 'Delete a device', ['deviceUuid']),
	op('adminDevices', 'Admin Devices', 'Duplicate', 'adminDevices.duplicate', 'POST', '/api/admin/devices/{deviceUuid}/duplicate', 'Duplicate a device', ['deviceUuid']),
	op('adminDevices', 'Admin Devices', 'Get', 'adminDevices.get', 'GET', '/api/admin/devices/{deviceUuid}', 'Get a device', ['deviceUuid']),
	op('adminDevices', 'Admin Devices', 'Get Many', 'adminDevices.getMany', 'GET', '/api/admin/devices', 'List devices'),
	op('adminDevices', 'Admin Devices', 'Get Nest Eggs', 'adminDevices.getNestEggs', 'GET', '/api/admin/devices/{deviceUuid}/nest-eggs', 'List eggs attached to a device', ['deviceUuid']),
	op('adminDevices', 'Admin Devices', 'Get Nodes', 'adminDevices.getNodes', 'GET', '/api/admin/devices/{deviceUuid}/nodes', 'List nodes attached to a device', ['deviceUuid']),
	op('adminDevices', 'Admin Devices', 'Get Servers', 'adminDevices.getServers', 'GET', '/api/admin/devices/{deviceUuid}/servers', 'List servers attached to a device', ['deviceUuid']),
	op('adminDevices', 'Admin Devices', 'Update', 'adminDevices.update', 'PATCH', '/api/admin/devices/{deviceUuid}', 'Update a device', ['deviceUuid']),

	op('adminEggConfigurations', 'Admin Egg Configurations', 'Create', 'adminEggConfigurations.create', 'POST', '/api/admin/egg-configurations', 'Create an egg configuration'),
	op('adminEggConfigurations', 'Admin Egg Configurations', 'Delete', 'adminEggConfigurations.delete', 'DELETE', '/api/admin/egg-configurations/{eggConfigurationUuid}', 'Delete an egg configuration', ['eggConfigurationUuid']),
	op('adminEggConfigurations', 'Admin Egg Configurations', 'Get', 'adminEggConfigurations.get', 'GET', '/api/admin/egg-configurations/{eggConfigurationUuid}', 'Get an egg configuration', ['eggConfigurationUuid']),
	op('adminEggConfigurations', 'Admin Egg Configurations', 'Get Many', 'adminEggConfigurations.getMany', 'GET', '/api/admin/egg-configurations', 'List egg configurations'),
	op('adminEggConfigurations', 'Admin Egg Configurations', 'Update', 'adminEggConfigurations.update', 'PATCH', '/api/admin/egg-configurations/{eggConfigurationUuid}', 'Update an egg configuration', ['eggConfigurationUuid']),
	op('adminEggConfigurations', 'Admin Egg Configurations', 'Duplicate', 'adminEggConfigurations.duplicate', 'POST', '/api/admin/egg-configurations/{eggConfigurationUuid}/duplicate', 'Duplicate an egg configuration', ['eggConfigurationUuid']),

	op('adminEggRepositories', 'Admin Egg Repositories', 'Create', 'adminEggRepositories.create', 'POST', '/api/admin/egg-repositories', 'Create an egg repository'),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Delete', 'adminEggRepositories.delete', 'DELETE', '/api/admin/egg-repositories/{eggRepositoryUuid}', 'Delete an egg repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Get', 'adminEggRepositories.get', 'GET', '/api/admin/egg-repositories/{eggRepositoryUuid}', 'Get an egg repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Get Eggs', 'adminEggRepositories.getEggs', 'GET', '/api/admin/egg-repositories/{eggRepositoryUuid}/eggs', 'List eggs in an egg repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Get Many', 'adminEggRepositories.getMany', 'GET', '/api/admin/egg-repositories', 'List egg repositories'),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Install Egg', 'adminEggRepositories.installEgg', 'POST', '/api/admin/egg-repositories/{eggRepositoryUuid}/eggs/install', 'Install eggs from a repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Install Egg From Repository', 'adminEggRepositories.installRepoEgg', 'POST', '/api/admin/egg-repositories/{eggRepositoryUuid}/eggs/{eggUuid}/install', 'Install a specific egg from a repository', ['eggRepositoryUuid', 'eggUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Sync', 'adminEggRepositories.sync', 'POST', '/api/admin/egg-repositories/{eggRepositoryUuid}/sync', 'Sync an egg repository', ['eggRepositoryUuid']),
	op('adminEggRepositories', 'Admin Egg Repositories', 'Update', 'adminEggRepositories.update', 'PATCH', '/api/admin/egg-repositories/{eggRepositoryUuid}', 'Update an egg repository', ['eggRepositoryUuid']),

	op('adminExtensions', 'Admin Extensions', 'Add', 'adminExtensions.add', 'PUT', '/api/admin/extensions/manage/add', 'Add or install an extension'),
	op('adminExtensions', 'Admin Extensions', 'Get Build Logs', 'adminExtensions.getBuildLogs', 'GET', '/api/admin/extensions/manage/logs', 'Get extension build logs'),
	op('adminExtensions', 'Admin Extensions', 'Get Many', 'adminExtensions.getMany', 'GET', '/api/admin/extensions', 'List admin extensions'),
	op('adminExtensions', 'Admin Extensions', 'Get Status', 'adminExtensions.getStatus', 'GET', '/api/admin/extensions/manage/status', 'Get extension manager status'),
	op('adminExtensions', 'Admin Extensions', 'Rebuild', 'adminExtensions.rebuild', 'POST', '/api/admin/extensions/manage/rebuild', 'Rebuild extensions'),
	op('adminExtensions', 'Admin Extensions', 'Remove', 'adminExtensions.remove', 'DELETE', '/api/admin/extensions/manage/{extensionPackageName}', 'Remove an extension', ['extensionPackageName']),
	op('adminExtensions', 'Admin Extensions', 'Cancel Rebuild', 'adminExtensions.cancelRebuild', 'POST', '/api/admin/extensions/manage/rebuild/cancel', 'Cancel a running extension rebuild'),
	op('adminExtensions', 'Admin Extensions', 'Restart Panel', 'adminExtensions.restart', 'POST', '/api/admin/extensions/manage/restart', 'Restart the panel to apply extension changes'),
	op('adminExtensions', 'Admin Extensions', 'Update', 'adminExtensions.update', 'PATCH', '/api/admin/extensions/{extensionPackageName}', 'Enable or disable an extension', ['extensionPackageName']),

	op('adminLocations', 'Admin Locations', 'Create', 'adminLocations.create', 'POST', '/api/admin/locations', 'Create a location'),
	op('adminLocations', 'Admin Locations', 'Create Database Host Link', 'adminLocations.createDatabaseHostLink', 'POST', '/api/admin/locations/{locationUuid}/database-hosts', 'Attach a database host to a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Delete', 'adminLocations.delete', 'DELETE', '/api/admin/locations/{locationUuid}', 'Delete a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Delete Database Host Link', 'adminLocations.deleteDatabaseHostLink', 'DELETE', '/api/admin/locations/{locationUuid}/database-hosts/{hostUuid}', 'Detach a database host from a location', ['locationUuid', 'hostUuid']),
	op('adminLocations', 'Admin Locations', 'Get', 'adminLocations.get', 'GET', '/api/admin/locations/{locationUuid}', 'Get a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Get Database Hosts', 'adminLocations.getDatabaseHosts', 'GET', '/api/admin/locations/{locationUuid}/database-hosts', 'List database hosts for a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Get Many', 'adminLocations.getMany', 'GET', '/api/admin/locations', 'List locations'),
	op('adminLocations', 'Admin Locations', 'Get Nodes', 'adminLocations.getNodes', 'GET', '/api/admin/locations/{locationUuid}/nodes', 'List nodes in a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Update', 'adminLocations.update', 'PATCH', '/api/admin/locations/{locationUuid}', 'Update a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Duplicate', 'adminLocations.duplicate', 'POST', '/api/admin/locations/{locationUuid}/duplicate', 'Duplicate a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Create Database Agent Host Link', 'adminLocations.createDatabaseAgentHostLink', 'POST', '/api/admin/locations/{locationUuid}/database-agent-hosts', 'Link a database agent host to a location', ['locationUuid']),
	op('adminLocations', 'Admin Locations', 'Delete Database Agent Host Link', 'adminLocations.deleteDatabaseAgentHostLink', 'DELETE', '/api/admin/locations/{locationUuid}/database-agent-hosts/{databaseAgentHostUuid}', 'Unlink a database agent host from a location', ['locationUuid', 'databaseAgentHostUuid']),
	op('adminLocations', 'Admin Locations', 'Get Database Agent Hosts', 'adminLocations.getDatabaseAgentHosts', 'GET', '/api/admin/locations/{locationUuid}/database-agent-hosts', 'List database agent hosts linked to a location', ['locationUuid']),

	op('adminMounts', 'Admin Mounts', 'Create', 'adminMounts.create', 'POST', '/api/admin/mounts', 'Create a mount'),
	op('adminMounts', 'Admin Mounts', 'Delete', 'adminMounts.delete', 'DELETE', '/api/admin/mounts/{mountUuid}', 'Delete a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Get', 'adminMounts.get', 'GET', '/api/admin/mounts/{mountUuid}', 'Get a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Get Many', 'adminMounts.getMany', 'GET', '/api/admin/mounts', 'List mounts'),
	op('adminMounts', 'Admin Mounts', 'Get Nest Eggs', 'adminMounts.getNestEggs', 'GET', '/api/admin/mounts/{mountUuid}/nest-eggs', 'List eggs attached to a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Get Nodes', 'adminMounts.getNodes', 'GET', '/api/admin/mounts/{mountUuid}/nodes', 'List nodes attached to a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Get Servers', 'adminMounts.getServers', 'GET', '/api/admin/mounts/{mountUuid}/servers', 'List servers attached to a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Update', 'adminMounts.update', 'PATCH', '/api/admin/mounts/{mountUuid}', 'Update a mount', ['mountUuid']),
	op('adminMounts', 'Admin Mounts', 'Duplicate', 'adminMounts.duplicate', 'POST', '/api/admin/mounts/{mountUuid}/duplicate', 'Duplicate a mount', ['mountUuid']),

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
	op('adminNests', 'Admin Nests', 'Delete Eggs', 'adminNests.deleteEggs', 'POST', '/api/admin/nests/{nestUuid}/eggs/delete', 'Bulk delete eggs in a nest', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Move Eggs', 'adminNests.moveEggs', 'POST', '/api/admin/nests/{nestUuid}/eggs/move', 'Bulk move eggs in a nest', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Update Eggs From Repository', 'adminNests.updateEggsFromRepository', 'POST', '/api/admin/nests/{nestUuid}/eggs/update/repository', 'Bulk update nest eggs from their repository', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Duplicate Egg', 'adminNests.duplicateEgg', 'POST', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/duplicate', 'Duplicate an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Create Egg Mount', 'adminNests.createEggMount', 'POST', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/mounts', 'Attach a mount to an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Delete Egg Mount', 'adminNests.deleteEggMount', 'DELETE', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/mounts/{mountUuid}', 'Detach a mount from an egg', ['nestUuid', 'eggUuid', 'mountUuid']),
	op('adminNests', 'Admin Nests', 'Create Egg Variable', 'adminNests.createEggVariable', 'POST', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/variables', 'Create an egg variable', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Delete Egg Variable', 'adminNests.deleteEggVariable', 'DELETE', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/variables/{variableUuid}', 'Delete an egg variable', ['nestUuid', 'eggUuid', 'variableUuid']),
	op('adminNests', 'Admin Nests', 'Update Egg Variable', 'adminNests.updateEggVariable', 'PATCH', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/variables/{variableUuid}', 'Update an egg variable', ['nestUuid', 'eggUuid', 'variableUuid']),
	op('adminNests', 'Admin Nests', 'Create Egg Device', 'adminNests.createEggDevice', 'POST', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/devices', 'Attach a device to an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Delete Egg Device', 'adminNests.deleteEggDevice', 'DELETE', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/devices/{deviceUuid}', 'Detach a device from an egg', ['nestUuid', 'eggUuid', 'deviceUuid']),
	op('adminNests', 'Admin Nests', 'Duplicate Egg Variable', 'adminNests.duplicateEggVariable', 'POST', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/variables/{variableUuid}/duplicate', 'Duplicate an egg variable', ['nestUuid', 'eggUuid', 'variableUuid']),
	op('adminNests', 'Admin Nests', 'Get Egg Devices', 'adminNests.getEggDevices', 'GET', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/devices', 'List devices attached to an egg', ['nestUuid', 'eggUuid']),
	op('adminNests', 'Admin Nests', 'Import Eggs From URLs', 'adminNests.importEggsFromUrls', 'POST', '/api/admin/nests/{nestUuid}/eggs/import/url', 'Import one or more eggs from URLs', ['nestUuid']),
	op('adminNests', 'Admin Nests', 'Update Egg From URL', 'adminNests.updateEggFromUrl', 'POST', '/api/admin/nests/{nestUuid}/eggs/{eggUuid}/update/import/url', 'Update an egg from an egg file URL', ['nestUuid', 'eggUuid']),

	op('adminNodes', 'Admin Nodes', 'Create', 'adminNodes.create', 'POST', '/api/admin/nodes', 'Create a node'),
	op('adminNodes', 'Admin Nodes', 'Create Allocations', 'adminNodes.createAllocations', 'POST', '/api/admin/nodes/{nodeUuid}/allocations', 'Create node allocations', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Create Mount Link', 'adminNodes.createMountLink', 'POST', '/api/admin/nodes/{nodeUuid}/mounts', 'Attach a mount to a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Delete', 'adminNodes.delete', 'DELETE', '/api/admin/nodes/{nodeUuid}', 'Delete a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Delete Allocations', 'adminNodes.deleteAllocations', 'DELETE', '/api/admin/nodes/{nodeUuid}/allocations', 'Delete node allocations', ['nodeUuid'], { hasBody: true }),
	op('adminNodes', 'Admin Nodes', 'Delete Backup', 'adminNodes.deleteBackup', 'DELETE', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}', 'Delete a node backup', ['nodeUuid', 'backupUuid'], { hasBody: true }),
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
	op('adminNodes', 'Admin Nodes', 'Get Transferring Servers', 'adminNodes.getTransferringServers', 'GET', '/api/admin/nodes/{nodeUuid}/transfers/servers', 'List transferring servers on a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Reset Token', 'adminNodes.resetToken', 'POST', '/api/admin/nodes/{nodeUuid}/reset-token', 'Reset a node token', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Send Servers Power Action', 'adminNodes.sendServersPowerAction', 'POST', '/api/admin/nodes/{nodeUuid}/servers/power', 'Send a power action to multiple node servers', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Update', 'adminNodes.update', 'PATCH', '/api/admin/nodes/{nodeUuid}', 'Update a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Update Allocations', 'adminNodes.updateAllocations', 'PATCH', '/api/admin/nodes/{nodeUuid}/allocations', 'Update node allocations', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Update Config', 'adminNodes.updateConfig', 'PATCH', '/api/admin/nodes/{nodeUuid}/config', 'Update node configuration', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Update Default Config', 'adminNodes.updateDefaultConfig', 'PATCH', '/api/admin/nodes/config', 'Update default node configuration'),
	op('adminNodes', 'Admin Nodes', 'Get Backup', 'adminNodes.getBackup', 'GET', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}', 'Get a node backup', ['nodeUuid', 'backupUuid']),
	op('adminNodes', 'Admin Nodes', 'Reattach Backup', 'adminNodes.reattachBackup', 'POST', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}/reattach', 'Reattach a node backup', ['nodeUuid', 'backupUuid']),
	op('adminNodes', 'Admin Nodes', 'Restore Backup', 'adminNodes.restoreBackup', 'POST', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}/restore', 'Restore a node backup', ['nodeUuid', 'backupUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Capacity', 'adminNodes.getCapacity', 'GET', '/api/admin/nodes/{nodeUuid}/capacity', 'Get node capacity', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Duplicate', 'adminNodes.duplicate', 'POST', '/api/admin/nodes/{nodeUuid}/duplicate', 'Duplicate a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Transfer Servers', 'adminNodes.transferServers', 'POST', '/api/admin/nodes/{nodeUuid}/servers/transfer', 'Transfer servers from a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get System Logs', 'adminNodes.getSystemLogs', 'GET', '/api/admin/nodes/{nodeUuid}/system/logs', 'List node system logs', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get System Log', 'adminNodes.getSystemLog', 'GET', '/api/admin/nodes/{nodeUuid}/system/logs/{logFile}', 'Get a node system log file', ['nodeUuid', 'logFile']),
	op('adminNodes', 'Admin Nodes', 'Get System Overview', 'adminNodes.getSystemOverview', 'GET', '/api/admin/nodes/{nodeUuid}/system/overview', 'Get node system overview', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get System Stats', 'adminNodes.getSystemStats', 'GET', '/api/admin/nodes/{nodeUuid}/system/stats', 'Get node system statistics', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Token', 'adminNodes.getToken', 'GET', '/api/admin/nodes/{nodeUuid}/token', 'Get a node token', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Check Device Access', 'adminNodes.checkDeviceAccess', 'GET', '/api/admin/nodes/{nodeUuid}/devices/{deviceUuid}/allowed', 'Check whether a device is allowed on a node', ['nodeUuid', 'deviceUuid']),
	op('adminNodes', 'Admin Nodes', 'Check Mount Access', 'adminNodes.checkMountAccess', 'GET', '/api/admin/nodes/{nodeUuid}/mounts/{mountUuid}/allowed', 'Check whether a mount is allowed on a node', ['nodeUuid', 'mountUuid']),
	op('adminNodes', 'Admin Nodes', 'Create Database Agent Host Link', 'adminNodes.createDatabaseAgentHostLink', 'POST', '/api/admin/nodes/{nodeUuid}/database-agent-hosts', 'Link a database agent host to a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Create Database Host Link', 'adminNodes.createDatabaseHostLink', 'POST', '/api/admin/nodes/{nodeUuid}/database-hosts', 'Link a database host to a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Create Device Link', 'adminNodes.createDeviceLink', 'POST', '/api/admin/nodes/{nodeUuid}/devices', 'Attach a device to a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Create Enrollment', 'adminNodes.createEnrollment', 'POST', '/api/admin/nodes/{nodeUuid}/enrollment', 'Create an enrollment code for a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Create Tunnel', 'adminNodes.createTunnel', 'POST', '/api/admin/nodes/{nodeUuid}/tunnel', 'Enable the tunnel on a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Delete Database Agent Host Link', 'adminNodes.deleteDatabaseAgentHostLink', 'DELETE', '/api/admin/nodes/{nodeUuid}/database-agent-hosts/{databaseAgentHostUuid}', 'Unlink a database agent host from a node', ['nodeUuid', 'databaseAgentHostUuid']),
	op('adminNodes', 'Admin Nodes', 'Delete Database Host Link', 'adminNodes.deleteDatabaseHostLink', 'DELETE', '/api/admin/nodes/{nodeUuid}/database-hosts/{databaseHostUuid}', 'Unlink a database host from a node', ['nodeUuid', 'databaseHostUuid']),
	op('adminNodes', 'Admin Nodes', 'Delete Device Link', 'adminNodes.deleteDeviceLink', 'DELETE', '/api/admin/nodes/{nodeUuid}/devices/{deviceUuid}', 'Detach a device from a node', ['nodeUuid', 'deviceUuid']),
	op('adminNodes', 'Admin Nodes', 'Delete Failed Backups', 'adminNodes.deleteFailedBackups', 'POST', '/api/admin/nodes/{nodeUuid}/backups/delete-failed', 'Queue deletion of all failed backups on a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Delete Tunnel', 'adminNodes.deleteTunnel', 'DELETE', '/api/admin/nodes/{nodeUuid}/tunnel', 'Disable the tunnel on a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Export Backup', 'adminNodes.exportBackup', 'POST', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}/export', 'Export a node backup', ['nodeUuid', 'backupUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Allocation IPs', 'adminNodes.getAllocationIps', 'GET', '/api/admin/nodes/{nodeUuid}/allocations/ips', 'List IP addresses used by node allocations', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Capacities', 'adminNodes.getCapacities', 'GET', '/api/admin/nodes/capacities', 'Get the capacity of all nodes'),
	op('adminNodes', 'Admin Nodes', 'Get Database Agent Hosts', 'adminNodes.getDatabaseAgentHosts', 'GET', '/api/admin/nodes/{nodeUuid}/database-agent-hosts', 'List database agent hosts linked to a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Database Hosts', 'adminNodes.getDatabaseHosts', 'GET', '/api/admin/nodes/{nodeUuid}/database-hosts', 'List database hosts linked to a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Devices', 'adminNodes.getDevices', 'GET', '/api/admin/nodes/{nodeUuid}/devices', 'List devices attached to a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get System IPs', 'adminNodes.getSystemIps', 'GET', '/api/admin/nodes/{nodeUuid}/system/ips', 'List IP addresses available on the node host', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Transfers', 'adminNodes.getTransfers', 'GET', '/api/admin/nodes/{nodeUuid}/transfers', 'List server transfers on a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Tunnel', 'adminNodes.getTunnel', 'GET', '/api/admin/nodes/{nodeUuid}/tunnel', 'Get the tunnel configuration of a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Get Tunnel Metrics', 'adminNodes.getTunnelMetrics', 'GET', '/api/admin/nodes/{nodeUuid}/tunnel/metrics', 'Get tunnel metrics of a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Pair', 'adminNodes.pair', 'POST', '/api/admin/nodes/{nodeUuid}/pair', 'Pair a node with Wings using a pairing code', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Probe', 'adminNodes.probe', 'POST', '/api/admin/nodes/probe', 'Probe a Wings instance before pairing'),
	op('adminNodes', 'Admin Nodes', 'Query Backup', 'adminNodes.queryBackup', 'GET', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}/query', 'Get the archive format and size of a node backup', ['nodeUuid', 'backupUuid']),
	op('adminNodes', 'Admin Nodes', 'Reassign Backup', 'adminNodes.reassignBackup', 'POST', '/api/admin/nodes/{nodeUuid}/backups/{backupUuid}/reassign', 'Reassign a database backup to another database instance', ['nodeUuid', 'backupUuid']),
	op('adminNodes', 'Admin Nodes', 'Rotate Tunnel Credentials', 'adminNodes.rotateTunnelCredentials', 'POST', '/api/admin/nodes/{nodeUuid}/tunnel/rotate', 'Rotate the tunnel credentials of a node', ['nodeUuid']),
	op('adminNodes', 'Admin Nodes', 'Update Tunnel', 'adminNodes.updateTunnel', 'PATCH', '/api/admin/nodes/{nodeUuid}/tunnel', 'Update the tunnel configuration of a node', ['nodeUuid']),

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
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Duplicate', 'adminOAuthProviders.duplicate', 'POST', '/api/admin/oauth-providers/{oauthProviderUuid}/duplicate', 'Duplicate an OAuth provider', ['oauthProviderUuid']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Get Mapping', 'adminOAuthProviders.getMapping', 'GET', '/api/admin/oauth-providers/{oauthProviderUuid}/mappings/{mappingUuid}', 'Get an OAuth provider mapping', ['oauthProviderUuid', 'mappingUuid']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Get User By Identifier', 'adminOAuthProviders.getUserByIdentifier', 'GET', '/api/admin/oauth-providers/{oauthProviderUuid}/users/identifier/{oauthUserIdentifier}', 'Get an OAuth provider user by identifier', ['oauthProviderUuid', 'oauthUserIdentifier']),
	op('adminOAuthProviders', 'Admin OAuth Providers', 'Discover', 'adminOAuthProviders.discover', 'POST', '/api/admin/oauth-providers/discover', 'Discover OAuth provider settings from a .well-known configuration URL'),

	op('adminRoles', 'Admin Roles', 'Create', 'adminRoles.create', 'POST', '/api/admin/roles', 'Create a role'),
	op('adminRoles', 'Admin Roles', 'Delete', 'adminRoles.delete', 'DELETE', '/api/admin/roles/{roleUuid}', 'Delete a role', ['roleUuid']),
	op('adminRoles', 'Admin Roles', 'Get', 'adminRoles.get', 'GET', '/api/admin/roles/{roleUuid}', 'Get a role', ['roleUuid']),
	op('adminRoles', 'Admin Roles', 'Get Many', 'adminRoles.getMany', 'GET', '/api/admin/roles', 'List roles'),
	op('adminRoles', 'Admin Roles', 'Get Users', 'adminRoles.getUsers', 'GET', '/api/admin/roles/{roleUuid}/users', 'List users in a role', ['roleUuid']),
	op('adminRoles', 'Admin Roles', 'Update', 'adminRoles.update', 'PATCH', '/api/admin/roles/{roleUuid}', 'Update a role', ['roleUuid']),
	op('adminRoles', 'Admin Roles', 'Duplicate', 'adminRoles.duplicate', 'POST', '/api/admin/roles/{roleUuid}/duplicate', 'Duplicate a role', ['roleUuid']),

	op('adminServers', 'Admin Servers', 'Cancel Transfer', 'adminServers.cancelTransfer', 'POST', '/api/admin/servers/{serverUuid}/transfer/cancel', 'Cancel a server transfer', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Clear State', 'adminServers.clearState', 'POST', '/api/admin/servers/{serverUuid}/clear-state', 'Clear server state', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Create', 'adminServers.create', 'POST', '/api/admin/servers', 'Create a server'),
	op('adminServers', 'Admin Servers', 'Create Allocation', 'adminServers.createAllocation', 'POST', '/api/admin/servers/{serverUuid}/allocations', 'Create a server allocation', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Create Mount Link', 'adminServers.createMountLink', 'POST', '/api/admin/servers/{serverUuid}/mounts', 'Attach a mount to a server', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Delete', 'adminServers.delete', 'DELETE', '/api/admin/servers/{serverUuid}', 'Delete a server', ['serverUuid'], { hasBody: true }),
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
	op('adminServers', 'Admin Servers', 'Deploy', 'adminServers.deploy', 'POST', '/api/admin/servers/deploy', 'Deploy a server'),
	op('adminServers', 'Admin Servers', 'Get By External ID', 'adminServers.getByExternalId', 'GET', '/api/admin/servers/external/{externalServerId}', 'Get a server by external ID', ['externalServerId']),
	op('adminServers', 'Admin Servers', 'Create Device Link', 'adminServers.createDeviceLink', 'POST', '/api/admin/servers/{serverUuid}/devices', 'Attach a device to a server', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Delete Device Link', 'adminServers.deleteDeviceLink', 'DELETE', '/api/admin/servers/{serverUuid}/devices/{deviceUuid}', 'Detach a device from a server', ['serverUuid', 'deviceUuid']),
	op('adminServers', 'Admin Servers', 'Delete Failed Backups', 'adminServers.deleteFailedBackups', 'POST', '/api/admin/servers/{serverUuid}/backups/delete-failed', 'Queue deletion of all failed backups of a server', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Available Devices', 'adminServers.getAvailableDevices', 'GET', '/api/admin/servers/{serverUuid}/devices/available', 'List devices that can be attached to a server', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Database Instances', 'adminServers.getDatabaseInstances', 'GET', '/api/admin/servers/{serverUuid}/databases/instances', 'List database instances of a server', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Databases', 'adminServers.getDatabases', 'GET', '/api/admin/servers/{serverUuid}/databases', 'List databases of a server', ['serverUuid']),
	op('adminServers', 'Admin Servers', 'Get Devices', 'adminServers.getDevices', 'GET', '/api/admin/servers/{serverUuid}/devices', 'List devices attached to a server', ['serverUuid']),

	op('adminSettings', 'Admin Settings', 'Get', 'adminSettings.get', 'GET', '/api/admin/settings', 'Get admin settings'),
	op('adminSettings', 'Admin Settings', 'Get Email Template', 'adminSettings.getEmailTemplate', 'GET', '/api/admin/system/email/templates/{templateIdentifier}', 'Get an email template', ['templateIdentifier']),
	op('adminSettings', 'Admin Settings', 'Get Email Templates', 'adminSettings.getEmailTemplates', 'GET', '/api/admin/system/email/templates', 'List email templates'),
	op('adminSettings', 'Admin Settings', 'Test Email', 'adminSettings.testEmail', 'POST', '/api/admin/system/email/test', 'Send a system email test'),
	op('adminSettings', 'Admin Settings', 'Update', 'adminSettings.update', 'PUT', '/api/admin/settings', 'Update admin settings'),
	op('adminSettings', 'Admin Settings', 'Update Email Template', 'adminSettings.updateEmailTemplate', 'PUT', '/api/admin/system/email/templates/{templateIdentifier}', 'Update an email template', ['templateIdentifier']),
	op('adminSettings', 'Admin Settings', 'Create Email Template Variable', 'adminSettings.createEmailTemplateVariable', 'POST', '/api/admin/system/email/templates/{templateIdentifier}/variables', 'Create a variable for an email template', ['templateIdentifier']),
	op('adminSettings', 'Admin Settings', 'Create Email Variable', 'adminSettings.createEmailVariable', 'POST', '/api/admin/system/email/variables', 'Create a global email variable'),
	op('adminSettings', 'Admin Settings', 'Delete Email Template Variable', 'adminSettings.deleteEmailTemplateVariable', 'DELETE', '/api/admin/system/email/templates/{templateIdentifier}/variables/{emailVariableName}', 'Delete a variable of an email template', ['templateIdentifier', 'emailVariableName']),
	op('adminSettings', 'Admin Settings', 'Delete Email Variable', 'adminSettings.deleteEmailVariable', 'DELETE', '/api/admin/system/email/variables/{emailVariableName}', 'Delete a global email variable', ['emailVariableName']),
	op('adminSettings', 'Admin Settings', 'Get Email Template Variables', 'adminSettings.getEmailTemplateVariables', 'GET', '/api/admin/system/email/templates/{templateIdentifier}/variables', 'List variables of an email template', ['templateIdentifier']),
	op('adminSettings', 'Admin Settings', 'Get Email Variables', 'adminSettings.getEmailVariables', 'GET', '/api/admin/system/email/variables', 'List global email variables'),
	op('adminSettings', 'Admin Settings', 'Update Email Template Variable', 'adminSettings.updateEmailTemplateVariable', 'PUT', '/api/admin/system/email/templates/{templateIdentifier}/variables/{emailVariableName}', 'Update a variable of an email template', ['templateIdentifier', 'emailVariableName']),
	op('adminSettings', 'Admin Settings', 'Update Email Variable', 'adminSettings.updateEmailVariable', 'PUT', '/api/admin/system/email/variables/{emailVariableName}', 'Update a global email variable', ['emailVariableName']),

	op('adminStats', 'Admin Stats', 'Get Backup Stats', 'adminStats.getBackup', 'GET', '/api/admin/stats/backups', 'Get backup statistics'),
	op('adminStats', 'Admin Stats', 'Get General Stats', 'adminStats.getGeneral', 'GET', '/api/admin/stats/general', 'Get general admin statistics'),

	op('adminSystem', 'Admin System', 'Get Debug Mode', 'adminSystem.getDebugMode', 'GET', '/api/admin/system/debug', 'Get debug mode status'),
	op('adminSystem', 'Admin System', 'Get General Health', 'adminSystem.getGeneralHealth', 'GET', '/api/admin/system/health/general', 'Get general system health'),
	op('adminSystem', 'Admin System', 'Get Node Updates', 'adminSystem.getNodeUpdates', 'GET', '/api/admin/system/updates/nodes', 'Get node updates'),
	op('adminSystem', 'Admin System', 'Get Nodes Health', 'adminSystem.getNodesHealth', 'GET', '/api/admin/system/health/nodes', 'Get node health'),
	op('adminSystem', 'Admin System', 'Get OpenAPI Document', 'adminSystem.getOpenApi', 'GET', '/openapi.json', 'Get the Panel OpenAPI document'),
	op('adminSystem', 'Admin System', 'Get Overview', 'adminSystem.getOverview', 'GET', '/api/admin/system/overview', 'Get system overview'),
	op('adminSystem', 'Admin System', 'Get Telemetry', 'adminSystem.getTelemetry', 'GET', '/api/admin/system/telemetry', 'Get telemetry status'),
	op('adminSystem', 'Admin System', 'Get Update History', 'adminSystem.getUpdateHistory', 'GET', '/api/admin/system/updates/history', 'Get update history'),
	op('adminSystem', 'Admin System', 'Get Updates', 'adminSystem.getUpdates', 'GET', '/api/admin/system/updates', 'Get available updates'),
	op('adminSystem', 'Admin System', 'Recheck Updates', 'adminSystem.recheckUpdates', 'POST', '/api/admin/system/updates/recheck', 'Recheck available updates'),
	op('adminSystem', 'Admin System', 'Set Debug Mode', 'adminSystem.setDebugMode', 'POST', '/api/admin/system/debug', 'Set debug mode'),
	op('adminSystem', 'Admin System', 'Get Database Agent Host Updates', 'adminSystem.getDatabaseAgentHostUpdates', 'GET', '/api/admin/system/updates/database-agent-hosts', 'List available database agent host updates'),

	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Create', 'adminSystemBackupPolicies.create', 'POST', '/api/admin/system-backup-policies', 'Create a system backup policy'),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Create Database Agent Host Link', 'adminSystemBackupPolicies.createDatabaseAgentHostLink', 'POST', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/database-agent-hosts', 'Add a database agent host to a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Create Location Link', 'adminSystemBackupPolicies.createLocationLink', 'POST', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/locations', 'Add a location to a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Create Node Link', 'adminSystemBackupPolicies.createNodeLink', 'POST', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/nodes', 'Add a node to a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Create Server Link', 'adminSystemBackupPolicies.createServerLink', 'POST', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/servers', 'Add a server to a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Delete', 'adminSystemBackupPolicies.delete', 'DELETE', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}', 'Delete a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Delete Database Agent Host Link', 'adminSystemBackupPolicies.deleteDatabaseAgentHostLink', 'DELETE', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/database-agent-hosts/{databaseAgentHostUuid}', 'Remove a database agent host from a system backup policy', ['systemBackupPolicyUuid', 'databaseAgentHostUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Delete Failed Backups', 'adminSystemBackupPolicies.deleteFailedBackups', 'POST', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/backups/delete-failed', 'Queue deletion of all failed backups of a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Delete Location Link', 'adminSystemBackupPolicies.deleteLocationLink', 'DELETE', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/locations/{locationUuid}', 'Remove a location from a system backup policy', ['systemBackupPolicyUuid', 'locationUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Delete Node Link', 'adminSystemBackupPolicies.deleteNodeLink', 'DELETE', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/nodes/{nodeUuid}', 'Remove a node from a system backup policy', ['systemBackupPolicyUuid', 'nodeUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Delete Server Link', 'adminSystemBackupPolicies.deleteServerLink', 'DELETE', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/servers/{serverUuid}', 'Remove a server from a system backup policy', ['systemBackupPolicyUuid', 'serverUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Get', 'adminSystemBackupPolicies.get', 'GET', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}', 'Get a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Get Backups', 'adminSystemBackupPolicies.getBackups', 'GET', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/backups', 'List backups created by a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Get Database Agent Hosts', 'adminSystemBackupPolicies.getDatabaseAgentHosts', 'GET', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/database-agent-hosts', 'List database agent hosts in a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Get Locations', 'adminSystemBackupPolicies.getLocations', 'GET', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/locations', 'List locations in a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Get Many', 'adminSystemBackupPolicies.getMany', 'GET', '/api/admin/system-backup-policies', 'List system backup policies'),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Get Nodes', 'adminSystemBackupPolicies.getNodes', 'GET', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/nodes', 'List nodes in a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Get Servers', 'adminSystemBackupPolicies.getServers', 'GET', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/servers', 'List servers in a system backup policy', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Trigger', 'adminSystemBackupPolicies.trigger', 'POST', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}/trigger', 'Run a system backup policy now', ['systemBackupPolicyUuid']),
	op('adminSystemBackupPolicies', 'Admin System Backup Policies', 'Update', 'adminSystemBackupPolicies.update', 'PATCH', '/api/admin/system-backup-policies/{systemBackupPolicyUuid}', 'Update a system backup policy', ['systemBackupPolicyUuid']),

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
	op('adminUsers', 'Admin Users', 'Get By External ID', 'adminUsers.getByExternalId', 'GET', '/api/admin/users/external/{externalUserId}', 'Get a user by external ID', ['externalUserId']),
	op('adminUsers', 'Admin Users', 'Get OAuth Link', 'adminUsers.getOAuthLink', 'GET', '/api/admin/users/{userUuid}/oauth-links/{oauthLinkUuid}', 'Get a user OAuth link', ['userUuid', 'oauthLinkUuid']),
	op('adminUsers', 'Admin Users', 'Verify Email', 'adminUsers.verifyEmail', 'POST', '/api/admin/users/{userUuid}/email/verify', 'Mark the email address of a user as verified', ['userUuid']),

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
	op('clientAccount', 'Client Account', 'Get', 'clientAccount.get', 'GET', '/api/client/account', 'Get the authenticated account'),
	op('clientAccount', 'Client Account', 'Update', 'clientAccount.update', 'PATCH', '/api/client/account', 'Update the authenticated account'),
	op('clientAccount', 'Client Account', 'Get Activity', 'clientAccount.getActivity', 'GET', '/api/client/account/activity', 'Get account activity'),
	op('clientAccount', 'Client Account', 'Get API Keys', 'clientAccount.getApiKeys', 'GET', '/api/client/account/api-keys', 'List API keys'),
	op('clientAccount', 'Client Account', 'Create API Key', 'clientAccount.createApiKey', 'POST', '/api/client/account/api-keys', 'Create an API key'),
	op('clientAccount', 'Client Account', 'Delete Avatar', 'clientAccount.deleteAvatar', 'DELETE', '/api/client/account/avatar', 'Delete the account avatar'),
	op('clientAccount', 'Client Account', 'Update Avatar', 'clientAccount.updateAvatar', 'PUT', '/api/client/account/avatar', 'Update the account avatar'),
	op('clientAccount', 'Client Account', 'Get Command Snippets', 'clientAccount.getCommandSnippets', 'GET', '/api/client/account/command-snippets', 'List command snippets'),
	op('clientAccount', 'Client Account', 'Create Command Snippet', 'clientAccount.createCommandSnippet', 'POST', '/api/client/account/command-snippets', 'Create a command snippet'),
	op('clientAccount', 'Client Account', 'Update Command Snippet', 'clientAccount.updateCommandSnippet', 'PATCH', '/api/client/account/command-snippets/{commandSnippetUuid}', 'Update a command snippet', ['commandSnippetUuid']),
	op('clientAccount', 'Client Account', 'Update Email', 'clientAccount.updateEmail', 'PUT', '/api/client/account/email', 'Update the account email'),
	op('clientAccount', 'Client Account', 'Logout', 'clientAccount.logout', 'POST', '/api/client/account/logout', 'Log out the current session'),
	op('clientAccount', 'Client Account', 'Get OAuth Links', 'clientAccount.getOAuthLinks', 'GET', '/api/client/account/oauth-links', 'List OAuth links'),
	op('clientAccount', 'Client Account', 'Get OAuth Link', 'clientAccount.getOAuthLink', 'GET', '/api/client/account/oauth-links/{oauthLinkUuid}', 'Get an OAuth link', ['oauthLinkUuid']),
	op('clientAccount', 'Client Account', 'Update Password', 'clientAccount.updatePassword', 'PUT', '/api/client/account/password', 'Update the account password'),
	op('clientAccount', 'Client Account', 'Get Security Keys', 'clientAccount.getSecurityKeys', 'GET', '/api/client/account/security-keys', 'List security keys'),
	op('clientAccount', 'Client Account', 'Create Security Key', 'clientAccount.createSecurityKey', 'POST', '/api/client/account/security-keys', 'Create a security key'),
	op('clientAccount', 'Client Account', 'Get Sessions', 'clientAccount.getSessions', 'GET', '/api/client/account/sessions', 'List sessions'),
	op('clientAccount', 'Client Account', 'Get SSH Keys', 'clientAccount.getSshKeys', 'GET', '/api/client/account/ssh-keys', 'List SSH keys'),
	op('clientAccount', 'Client Account', 'Create SSH Key', 'clientAccount.createSshKey', 'POST', '/api/client/account/ssh-keys', 'Create an SSH key'),
	op('clientAccount', 'Client Account', 'Import SSH Key', 'clientAccount.importSshKey', 'POST', '/api/client/account/ssh-keys/import', 'Import an SSH key'),
	op('clientAccount', 'Client Account', 'Disable Two-Factor', 'clientAccount.disableTwoFactor', 'DELETE', '/api/client/account/two-factor', 'Disable two-factor authentication'),
	op('clientAccount', 'Client Account', 'Get Two-Factor', 'clientAccount.getTwoFactor', 'GET', '/api/client/account/two-factor', 'Get two-factor authentication setup details'),
	op('clientAccount', 'Client Account', 'Enable Two-Factor', 'clientAccount.enableTwoFactor', 'POST', '/api/client/account/two-factor', 'Enable two-factor authentication'),
	op('clientAccount', 'Client Account', 'Delete Sessions', 'clientAccount.deleteSessions', 'DELETE', '/api/client/account/sessions', 'Revoke all other sessions of the account'),
	op('clientAccount', 'Client Account', 'Disable Email Two-Factor', 'clientAccount.disableEmailTwoFactor', 'DELETE', '/api/client/account/two-factor/email', 'Disable email-based two-factor authentication', [], { hasBody: true }),
	op('clientAccount', 'Client Account', 'Duplicate API Key', 'clientAccount.duplicateApiKey', 'POST', '/api/client/account/api-keys/{apiKeyUuid}/duplicate', 'Duplicate an API key', ['apiKeyUuid']),
	op('clientAccount', 'Client Account', 'Duplicate Command Snippet', 'clientAccount.duplicateCommandSnippet', 'POST', '/api/client/account/command-snippets/{commandSnippetUuid}/duplicate', 'Duplicate a command snippet', ['commandSnippetUuid']),
	op('clientAccount', 'Client Account', 'Enable Email Two-Factor', 'clientAccount.enableEmailTwoFactor', 'POST', '/api/client/account/two-factor/email', 'Enable email-based two-factor authentication'),
	op('clientAccount', 'Client Account', 'Get API Key By Identifier', 'clientAccount.getApiKeyByIdentifier', 'GET', '/api/client/account/api-keys/identifier/{apiKeyIdentifier}', 'Get an API key by its identifier', ['apiKeyIdentifier']),
	op('clientAccount', 'Client Account', 'Get Settings', 'clientAccount.getSettings', 'GET', '/api/client/account/settings', 'Get the synced account settings'),
	op('clientAccount', 'Client Account', 'Resend Verification Email', 'clientAccount.resendVerificationEmail', 'POST', '/api/client/account/email/resend-verification', 'Resend the email address verification email'),
	op('clientAccount', 'Client Account', 'Update Password Login', 'clientAccount.updatePasswordLogin', 'PUT', '/api/client/account/password-login', 'Enable or disable password login for the account'),
	op('clientAccount', 'Client Account', 'Update Settings', 'clientAccount.updateSettings', 'PATCH', '/api/client/account/settings', 'Update the synced account settings'),

	op('clientServer', 'Client Server', 'Get', 'clientServer.get', 'GET', '/api/client/servers/{serverUuid}', 'Get a server', ['serverUuid']),
	op('clientServer', 'Client Server', 'Get Activity', 'clientServer.getActivity', 'GET', '/api/client/servers/{serverUuid}/activity', 'Get server activity', ['serverUuid']),
	op('clientServer', 'Client Server', 'Get Command Snippets For Egg', 'clientServer.getEggCommandSnippets', 'GET', '/api/client/servers/eggs/{eggUuid}/command-snippets', 'Get command snippets for an egg', ['eggUuid']),
	op('clientServer', 'Client Server', 'Get Many', 'clientServer.getMany', 'GET', '/api/client/servers', 'List accessible servers'),
	op('clientServer', 'Client Server', 'Get Node Resources', 'clientServer.getNodeResources', 'GET', '/api/client/servers/nodes/{nodeUuid}/resources', 'Get client node resources', ['nodeUuid']),
	op('clientServer', 'Client Server', 'Get Resources', 'clientServer.getResources', 'GET', '/api/client/servers/{serverUuid}/resources', 'Get server runtime resources', ['serverUuid']),
	op('clientServer', 'Client Server', 'Get Server Group Servers', 'clientServer.getServerGroupServers', 'GET', '/api/client/servers/groups/{serverGroupUuid}', 'Get servers in a server group', ['serverGroupUuid']),
	op('clientServer', 'Client Server', 'Get Websocket Token', 'clientServer.getWebsocketToken', 'GET', '/api/client/servers/{serverUuid}/websocket', 'Get server websocket connection details', ['serverUuid']),
	op('clientServer', 'Client Server', 'Send Command', 'clientServer.sendCommand', 'POST', '/api/client/servers/{serverUuid}/command', 'Send a console command', ['serverUuid']),
	op('clientServer', 'Client Server', 'Set Power State', 'clientServer.setPowerState', 'POST', '/api/client/servers/{serverUuid}/power', 'Send a power signal', ['serverUuid']),
	op('clientServer', 'Client Server', 'Update Server Group', 'clientServer.updateServerGroup', 'PATCH', '/api/client/servers/groups/{serverGroupUuid}', 'Update a server group', ['serverGroupUuid']),
	op('clientServer', 'Client Server', 'Get Eggs', 'clientServer.getEggs', 'GET', '/api/client/servers/eggs', 'List eggs available to the client'),
	op('clientServer', 'Client Server', 'Get Server Groups', 'clientServer.getServerGroups', 'GET', '/api/client/servers/groups', 'List server groups'),
	op('clientServer', 'Client Server', 'Create Server Group', 'clientServer.createServerGroup', 'POST', '/api/client/servers/groups', 'Create a server group'),
	op('clientServer', 'Client Server', 'Update Server Group Order', 'clientServer.updateServerGroupOrder', 'PUT', '/api/client/servers/groups/order', 'Update server group order'),
	op('clientServer', 'Client Server', 'Delete Server Group', 'clientServer.deleteServerGroup', 'DELETE', '/api/client/servers/groups/{serverGroupUuid}', 'Delete a server group', ['serverGroupUuid']),
	op('clientServer', 'Client Server', 'Get Logs', 'clientServer.getLogs', 'GET', '/api/client/servers/{serverUuid}/logs', 'Get server logs', ['serverUuid']),

	op('serverAllocations', 'Server Allocations', 'Create', 'serverAllocations.create', 'POST', '/api/client/servers/{serverUuid}/allocations', 'Create a server allocation', ['serverUuid']),
	op('serverAllocations', 'Server Allocations', 'Delete', 'serverAllocations.delete', 'DELETE', '/api/client/servers/{serverUuid}/allocations/{allocationUuid}', 'Delete a server allocation', ['serverUuid', 'allocationUuid']),
	op('serverAllocations', 'Server Allocations', 'Get Many', 'serverAllocations.getMany', 'GET', '/api/client/servers/{serverUuid}/allocations', 'List server allocations', ['serverUuid']),
	op('serverAllocations', 'Server Allocations', 'Update', 'serverAllocations.update', 'PATCH', '/api/client/servers/{serverUuid}/allocations/{allocationUuid}', 'Update a server allocation', ['serverUuid', 'allocationUuid']),

	op('serverAnnouncements', 'Server Announcements', 'Get Many', 'serverAnnouncements.getMany', 'GET', '/api/client/servers/{serverUuid}/announcements', 'List server announcements', ['serverUuid']),

	op('serverBackupGroups', 'Server Backup Groups', 'Create', 'serverBackupGroups.create', 'POST', '/api/client/servers/{serverUuid}/backups/groups', 'Create a backup group', ['serverUuid']),
	op('serverBackupGroups', 'Server Backup Groups', 'Delete', 'serverBackupGroups.delete', 'DELETE', '/api/client/servers/{serverUuid}/backups/groups/{backupGroupUuid}', 'Delete a backup group', ['serverUuid', 'backupGroupUuid']),
	op('serverBackupGroups', 'Server Backup Groups', 'Get', 'serverBackupGroups.get', 'GET', '/api/client/servers/{serverUuid}/backups/groups/{backupGroupUuid}', 'Get a backup group', ['serverUuid', 'backupGroupUuid']),
	op('serverBackupGroups', 'Server Backup Groups', 'Get Many', 'serverBackupGroups.getMany', 'GET', '/api/client/servers/{serverUuid}/backups/groups', 'List backup groups', ['serverUuid']),
	op('serverBackupGroups', 'Server Backup Groups', 'Update', 'serverBackupGroups.update', 'PATCH', '/api/client/servers/{serverUuid}/backups/groups/{backupGroupUuid}', 'Update a backup group', ['serverUuid', 'backupGroupUuid']),
	op('serverBackupGroups', 'Server Backup Groups', 'Update Order', 'serverBackupGroups.updateOrder', 'PUT', '/api/client/servers/{serverUuid}/backups/groups/order', 'Update the order of backup groups', ['serverUuid']),

	op('serverBackups', 'Server Backups', 'Start Backup', 'serverBackups.create', 'POST', '/api/client/servers/{serverUuid}/backups', 'Start a backup', ['serverUuid']),
	op('serverBackups', 'Server Backups', 'Delete', 'serverBackups.delete', 'DELETE', '/api/client/servers/{serverUuid}/backups/{backupUuid}', 'Delete a backup', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Download', 'serverBackups.download', 'GET', '/api/client/servers/{serverUuid}/backups/{backupUuid}/download', 'Get a backup download URL', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Get', 'serverBackups.get', 'GET', '/api/client/servers/{serverUuid}/backups/{backupUuid}', 'Get a backup', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Get Many', 'serverBackups.getMany', 'GET', '/api/client/servers/{serverUuid}/backups', 'List backups', ['serverUuid']),
	op('serverBackups', 'Server Backups', 'Restore', 'serverBackups.restore', 'POST', '/api/client/servers/{serverUuid}/backups/{backupUuid}/restore', 'Restore a backup', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Update', 'serverBackups.update', 'PATCH', '/api/client/servers/{serverUuid}/backups/{backupUuid}', 'Update a backup', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Clear Failed Restore', 'serverBackups.clearFailedRestore', 'POST', '/api/client/servers/{serverUuid}/backups/unlock', 'Clear the failed backup restore state of a server', ['serverUuid']),
	op('serverBackups', 'Server Backups', 'Delete Many', 'serverBackups.deleteMany', 'DELETE', '/api/client/servers/{serverUuid}/backups', 'Delete multiple backups', ['serverUuid'], { hasBody: true }),
	op('serverBackups', 'Server Backups', 'Export', 'serverBackups.export', 'POST', '/api/client/servers/{serverUuid}/backups/{backupUuid}/export', 'Export a backup to the server file system', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Get System Backups', 'serverBackups.getSystemBackups', 'GET', '/api/client/servers/{serverUuid}/backups/system', 'List backups created by system backup policies', ['serverUuid']),
	op('serverBackups', 'Server Backups', 'Get Usage', 'serverBackups.getUsage', 'GET', '/api/client/servers/{serverUuid}/backups/usage', 'Get backup storage usage', ['serverUuid']),
	op('serverBackups', 'Server Backups', 'Query', 'serverBackups.query', 'GET', '/api/client/servers/{serverUuid}/backups/{backupUuid}/query', 'Get the archive format and size of a backup', ['serverUuid', 'backupUuid']),
	op('serverBackups', 'Server Backups', 'Update Many', 'serverBackups.updateMany', 'PATCH', '/api/client/servers/{serverUuid}/backups', 'Update multiple backups', ['serverUuid']),

	op('serverDatabaseExplorer', 'Server Database Explorer', 'Run Query', 'serverDatabaseExplorer.runQuery', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/query', 'Run an SQL query against a database', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Get Rows', 'serverDatabaseExplorer.getRows', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/rows', 'Browse the rows of a table', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Insert Rows', 'serverDatabaseExplorer.insertRows', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/rows/insert', 'Insert rows into a table', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Update Rows', 'serverDatabaseExplorer.updateRows', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/rows/update', 'Update rows in a table', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Delete Rows', 'serverDatabaseExplorer.deleteRows', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/rows/delete', 'Delete rows from a table', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Get Schema', 'serverDatabaseExplorer.getSchema', 'GET', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/schema', 'Get the database schema', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Get Column Types', 'serverDatabaseExplorer.getColumnTypes', 'GET', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/tables/types', 'List the column types supported by the database', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Create Table', 'serverDatabaseExplorer.createTable', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/tables', 'Create a table', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Rename Table', 'serverDatabaseExplorer.renameTable', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/tables/rename', 'Rename a table', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Delete Table', 'serverDatabaseExplorer.deleteTable', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/tables/delete', 'Delete a table', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Create Column', 'serverDatabaseExplorer.createColumn', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/tables/columns', 'Add a column to a table', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Rename Column', 'serverDatabaseExplorer.renameColumn', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/tables/columns/rename', 'Rename a table column', ['serverUuid', 'databaseUuid']),
	op('serverDatabaseExplorer', 'Server Database Explorer', 'Delete Column', 'serverDatabaseExplorer.deleteColumn', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/explorer/tables/columns/delete', 'Delete a table column', ['serverUuid', 'databaseUuid']),

	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Run Query', 'serverDatabaseInstanceExplorer.runQuery', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/query', 'Run an SQL query against a database', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Get Rows', 'serverDatabaseInstanceExplorer.getRows', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/rows', 'Browse the rows of a table', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Insert Rows', 'serverDatabaseInstanceExplorer.insertRows', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/rows/insert', 'Insert rows into a table', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Update Rows', 'serverDatabaseInstanceExplorer.updateRows', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/rows/update', 'Update rows in a table', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Delete Rows', 'serverDatabaseInstanceExplorer.deleteRows', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/rows/delete', 'Delete rows from a table', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Get Schema', 'serverDatabaseInstanceExplorer.getSchema', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/schema', 'Get the database schema', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Get Column Types', 'serverDatabaseInstanceExplorer.getColumnTypes', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/tables/types', 'List the column types supported by the database', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Create Table', 'serverDatabaseInstanceExplorer.createTable', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/tables', 'Create a table', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Rename Table', 'serverDatabaseInstanceExplorer.renameTable', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/tables/rename', 'Rename a table', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Delete Table', 'serverDatabaseInstanceExplorer.deleteTable', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/tables/delete', 'Delete a table', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Create Column', 'serverDatabaseInstanceExplorer.createColumn', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/tables/columns', 'Add a column to a table', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Rename Column', 'serverDatabaseInstanceExplorer.renameColumn', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/tables/columns/rename', 'Rename a table column', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstanceExplorer', 'Server Database Instance Explorer', 'Delete Column', 'serverDatabaseInstanceExplorer.deleteColumn', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/explorer/tables/columns/delete', 'Delete a table column', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),

	op('serverDatabaseInstances', 'Server Database Instances', 'Cancel Operation', 'serverDatabaseInstances.cancelOperation', 'DELETE', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/operations/{operationUuid}', 'Cancel a database instance operation', ['serverUuid', 'databaseInstanceUuid', 'operationUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Create', 'serverDatabaseInstances.create', 'POST', '/api/client/servers/{serverUuid}/databases/instances', 'Create a database instance', ['serverUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Create Database', 'serverDatabaseInstances.createDatabase', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases', 'Create a database in a database instance', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Create User', 'serverDatabaseInstances.createUser', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/users', 'Create a database instance user', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Delete', 'serverDatabaseInstances.delete', 'DELETE', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}', 'Delete a database instance', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Delete Database', 'serverDatabaseInstances.deleteDatabase', 'DELETE', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}', 'Delete a database from a database instance', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Delete User', 'serverDatabaseInstances.deleteUser', 'DELETE', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/users/{databaseUserUuid}', 'Delete a database instance user', ['serverUuid', 'databaseInstanceUuid', 'databaseUserUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Export', 'serverDatabaseInstances.export', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/export', 'Export the data of a Redis database instance as a file', ['serverUuid', 'databaseInstanceUuid'], { response: 'binary' }),
	op('serverDatabaseInstances', 'Server Database Instances', 'Export Database', 'serverDatabaseInstances.exportDatabase', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/export', 'Export a database as a file', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid'], { response: 'binary' }),
	op('serverDatabaseInstances', 'Server Database Instances', 'Get', 'serverDatabaseInstances.get', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}', 'Get a database instance', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Get Database Size', 'serverDatabaseInstances.getDatabaseSize', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/size', 'Get the size of a database', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Get Databases', 'serverDatabaseInstances.getDatabases', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases', 'List databases in a database instance', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Get Logs', 'serverDatabaseInstances.getLogs', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/logs', 'Get database instance logs', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Get Many', 'serverDatabaseInstances.getMany', 'GET', '/api/client/servers/{serverUuid}/databases/instances', 'List database instances', ['serverUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Get Resources', 'serverDatabaseInstances.getResources', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/resources', 'Get database instance resource usage', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Get Templates', 'serverDatabaseInstances.getTemplates', 'GET', '/api/client/servers/{serverUuid}/databases/instances/templates', 'List templates available for new database instances', ['serverUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Get Users', 'serverDatabaseInstances.getUsers', 'GET', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/users', 'List database instance users', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Import', 'serverDatabaseInstances.import', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/import', 'Import a data file into a Redis database instance', ['serverUuid', 'databaseInstanceUuid'], { body: 'binary' }),
	op('serverDatabaseInstances', 'Server Database Instances', 'Import Database', 'serverDatabaseInstances.importDatabase', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/import', 'Import a dump file into a database', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid'], { body: 'binary' }),
	op('serverDatabaseInstances', 'Server Database Instances', 'Import Database From URL', 'serverDatabaseInstances.importDatabaseFromUrl', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/import/remote', 'Import a dump file from a URL into a database', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Recreate Database', 'serverDatabaseInstances.recreateDatabase', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/databases/{databaseUuid}/recreate', 'Drop and recreate a database', ['serverUuid', 'databaseInstanceUuid', 'databaseUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Rotate User Password', 'serverDatabaseInstances.rotateUserPassword', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/users/{databaseUserUuid}/rotate-password', 'Rotate the password of a database instance user', ['serverUuid', 'databaseInstanceUuid', 'databaseUserUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Set Power State', 'serverDatabaseInstances.setPowerState', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/power', 'Send a power signal to a database instance', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Update', 'serverDatabaseInstances.update', 'PATCH', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}', 'Update a database instance', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Update From Template', 'serverDatabaseInstances.updateFromTemplate', 'POST', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/update', 'Apply the current template specification to a database instance', ['serverUuid', 'databaseInstanceUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Update User Database Access', 'serverDatabaseInstances.updateUserDatabaseAccess', 'PUT', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/users/{databaseUserUuid}/databases/{databaseUuid}', 'Set the access level of a user on one database', ['serverUuid', 'databaseInstanceUuid', 'databaseUserUuid', 'databaseUuid']),
	op('serverDatabaseInstances', 'Server Database Instances', 'Update User Databases', 'serverDatabaseInstances.updateUserDatabases', 'PUT', '/api/client/servers/{serverUuid}/databases/instances/{databaseInstanceUuid}/users/{databaseUserUuid}/databases', 'Replace the database access list of a user', ['serverUuid', 'databaseInstanceUuid', 'databaseUserUuid']),

	op('serverDatabases', 'Server Databases', 'Create', 'serverDatabases.create', 'POST', '/api/client/servers/{serverUuid}/databases', 'Create a database', ['serverUuid']),
	op('serverDatabases', 'Server Databases', 'Delete', 'serverDatabases.delete', 'DELETE', '/api/client/servers/{serverUuid}/databases/{databaseUuid}', 'Delete a database', ['serverUuid', 'databaseUuid']),
	op('serverDatabases', 'Server Databases', 'Get', 'serverDatabases.get', 'GET', '/api/client/servers/{serverUuid}/databases/{databaseUuid}', 'Get a database', ['serverUuid', 'databaseUuid']),
	op('serverDatabases', 'Server Databases', 'Get Hosts', 'serverDatabases.getHosts', 'GET', '/api/client/servers/{serverUuid}/databases/hosts', 'List available database hosts', ['serverUuid']),
	op('serverDatabases', 'Server Databases', 'Get Many', 'serverDatabases.getMany', 'GET', '/api/client/servers/{serverUuid}/databases', 'List databases', ['serverUuid']),
	op('serverDatabases', 'Server Databases', 'Get Size', 'serverDatabases.getSize', 'GET', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/size', 'Get database size', ['serverUuid', 'databaseUuid']),
	op('serverDatabases', 'Server Databases', 'Recreate', 'serverDatabases.recreate', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/recreate', 'Recreate a database', ['serverUuid', 'databaseUuid']),
	op('serverDatabases', 'Server Databases', 'Rotate Password', 'serverDatabases.rotatePassword', 'POST', '/api/client/servers/{serverUuid}/databases/{databaseUuid}/rotate-password', 'Rotate database password', ['serverUuid', 'databaseUuid']),
	op('serverDatabases', 'Server Databases', 'Update', 'serverDatabases.update', 'PATCH', '/api/client/servers/{serverUuid}/databases/{databaseUuid}', 'Update a database', ['serverUuid', 'databaseUuid']),

	op('serverDevices', 'Server Devices', 'Create', 'serverDevices.create', 'POST', '/api/client/servers/{serverUuid}/devices', 'Attach a device to the server', ['serverUuid']),
	op('serverDevices', 'Server Devices', 'Delete', 'serverDevices.delete', 'DELETE', '/api/client/servers/{serverUuid}/devices/{deviceUuid}', 'Detach a device from the server', ['serverUuid', 'deviceUuid']),
	op('serverDevices', 'Server Devices', 'Get Many', 'serverDevices.getMany', 'GET', '/api/client/servers/{serverUuid}/devices', 'List devices attached to the server', ['serverUuid']),

	op('serverFiles', 'Server Files', 'Cancel Operation', 'serverFiles.cancelOperation', 'DELETE', '/api/client/servers/{serverUuid}/files/operations/{operationUuid}', 'Cancel a file operation', ['serverUuid', 'operationUuid']),
	op('serverFiles', 'Server Files', 'Change Permissions', 'serverFiles.chmod', 'PUT', '/api/client/servers/{serverUuid}/files/chmod', 'Change file permissions', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Compress', 'serverFiles.compress', 'POST', '/api/client/servers/{serverUuid}/files/compress', 'Compress files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Copy', 'serverFiles.copy', 'POST', '/api/client/servers/{serverUuid}/files/copy', 'Copy a file', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Copy Many', 'serverFiles.copyMany', 'POST', '/api/client/servers/{serverUuid}/files/copy-many', 'Copy multiple files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Copy Remote', 'serverFiles.copyRemote', 'POST', '/api/client/servers/{serverUuid}/files/copy-remote', 'Copy files from a remote source', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Create Directory', 'serverFiles.createDirectory', 'POST', '/api/client/servers/{serverUuid}/files/create-directory', 'Create a directory', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Decompress', 'serverFiles.decompress', 'POST', '/api/client/servers/{serverUuid}/files/decompress', 'Decompress an archive', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Download', 'serverFiles.download', 'GET', '/api/client/servers/{serverUuid}/files/download', 'Get a file download URL', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Delete', 'serverFiles.delete', 'POST', '/api/client/servers/{serverUuid}/files/delete', 'Delete files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Contents', 'serverFiles.getContents', 'GET', '/api/client/servers/{serverUuid}/files/contents', 'Get file contents', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Fingerprint', 'serverFiles.getFingerprint', 'GET', '/api/client/servers/{serverUuid}/files/fingerprint', 'Get a file fingerprint', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Largest Directories', 'serverFiles.getLargestDirectories', 'GET', '/api/client/servers/{serverUuid}/files/largest-directories', 'Get largest directories', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Revisions', 'serverFiles.getRevisions', 'GET', '/api/client/servers/{serverUuid}/files/revisions', 'List file revisions', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Revision Content', 'serverFiles.getRevisionContent', 'GET', '/api/client/servers/{serverUuid}/files/revisions/{revisionId}', 'Get file revision content', ['serverUuid', 'revisionId']),
	op('serverFiles', 'Server Files', 'Get Upload URL', 'serverFiles.getUploadUrl', 'GET', '/api/client/servers/{serverUuid}/files/upload', 'Get a file upload URL', ['serverUuid']),
	op('serverFiles', 'Server Files', 'List', 'serverFiles.list', 'GET', '/api/client/servers/{serverUuid}/files/list', 'List files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Pull', 'serverFiles.pull', 'POST', '/api/client/servers/{serverUuid}/files/pull', 'Start a remote file pull', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Query Pull', 'serverFiles.queryPull', 'POST', '/api/client/servers/{serverUuid}/files/pull/query', 'Query a remote file pull URL', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Rename', 'serverFiles.rename', 'PUT', '/api/client/servers/{serverUuid}/files/rename', 'Rename files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Search', 'serverFiles.search', 'POST', '/api/client/servers/{serverUuid}/files/search', 'Search server files', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Write', 'serverFiles.write', 'POST', '/api/client/servers/{serverUuid}/files/write', 'Write file contents', ['serverUuid'], { body: 'raw' }),
	op('serverFiles', 'Server Files', 'Copy Remote Many', 'serverFiles.copyRemoteMany', 'POST', '/api/client/servers/{serverUuid}/files/copy-remote-many', 'Copy multiple files to another server', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Create Symlink', 'serverFiles.createSymlink', 'POST', '/api/client/servers/{serverUuid}/files/create-symlink', 'Create a symbolic link', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Directory Sizes', 'serverFiles.getDirectorySizes', 'GET', '/api/client/servers/{serverUuid}/files/directory-sizes', 'Break down a directory by size', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Get Lines', 'serverFiles.getLines', 'GET', '/api/client/servers/{serverUuid}/files/lines', 'Get a range of lines from a file', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Query SQLite', 'serverFiles.querySqlite', 'POST', '/api/client/servers/{serverUuid}/files/sqlite-query', 'Run a query against an SQLite database file', ['serverUuid']),
	op('serverFiles', 'Server Files', 'Stat', 'serverFiles.stat', 'POST', '/api/client/servers/{serverUuid}/files/stat', 'Get metadata for one or more paths', ['serverUuid']),

	op('serverFirewall', 'Server Firewall', 'Get', 'serverFirewall.get', 'GET', '/api/client/servers/{serverUuid}/firewall', 'Get the firewall rules of the server', ['serverUuid']),
	op('serverFirewall', 'Server Firewall', 'Update', 'serverFirewall.update', 'PUT', '/api/client/servers/{serverUuid}/firewall', 'Replace the firewall rules of the server', ['serverUuid']),

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
	op('serverSchedules', 'Server Schedules', 'Duplicate', 'serverSchedules.duplicate', 'POST', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/duplicate', 'Duplicate a schedule', ['serverUuid', 'scheduleUuid']),
	op('serverSchedules', 'Server Schedules', 'Duplicate Step', 'serverSchedules.duplicateStep', 'POST', '/api/client/servers/{serverUuid}/schedules/{scheduleUuid}/steps/{stepUuid}/duplicate', 'Duplicate a schedule step', ['serverUuid', 'scheduleUuid', 'stepUuid']),

	op('serverSettings', 'Server Settings', 'Cancel Install', 'serverSettings.cancelInstall', 'POST', '/api/client/servers/{serverUuid}/settings/install/cancel', 'Cancel server installation', ['serverUuid']),
	op('serverSettings', 'Server Settings', 'Install', 'serverSettings.install', 'POST', '/api/client/servers/{serverUuid}/settings/install', 'Install or reinstall a server', ['serverUuid']),
	op('serverSettings', 'Server Settings', 'Unlock Install', 'serverSettings.unlockInstall', 'POST', '/api/client/servers/{serverUuid}/settings/install/unlock', 'Unlock a stuck server installation', ['serverUuid']),
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
	op('serverSubusers', 'Server Subusers', 'Get Many', 'serverSubusers.getMany', 'GET', '/api/client/servers/{serverUuid}/subusers', 'List subusers', ['serverUuid']),
	op('serverSubusers', 'Server Subusers', 'Update', 'serverSubusers.update', 'PATCH', '/api/client/servers/{serverUuid}/subusers/{subuserUuid}', 'Update a subuser', ['serverUuid', 'subuserUuid']),

	op('serverTunnel', 'Server Tunnel', 'Create', 'serverTunnel.create', 'POST', '/api/client/servers/{serverUuid}/tunnel', 'Enable the private network tunnel for the server', ['serverUuid']),
	op('serverTunnel', 'Server Tunnel', 'Create Connection', 'serverTunnel.createConnection', 'POST', '/api/client/servers/{serverUuid}/tunnel/connections', 'Connect the server to another server', ['serverUuid']),
	op('serverTunnel', 'Server Tunnel', 'Delete', 'serverTunnel.delete', 'DELETE', '/api/client/servers/{serverUuid}/tunnel', 'Disable the private network tunnel for the server', ['serverUuid']),
	op('serverTunnel', 'Server Tunnel', 'Delete Connection', 'serverTunnel.deleteConnection', 'DELETE', '/api/client/servers/{serverUuid}/tunnel/connections/{connectionUuid}', 'Disconnect the server from another server', ['serverUuid', 'connectionUuid']),
	op('serverTunnel', 'Server Tunnel', 'Get', 'serverTunnel.get', 'GET', '/api/client/servers/{serverUuid}/tunnel', 'Get the tunnel configuration of the server', ['serverUuid']),
	op('serverTunnel', 'Server Tunnel', 'Get Available Connections', 'serverTunnel.getAvailableConnections', 'GET', '/api/client/servers/{serverUuid}/tunnel/connections/available', 'List servers the server can connect to', ['serverUuid']),
	op('serverTunnel', 'Server Tunnel', 'Update', 'serverTunnel.update', 'PATCH', '/api/client/servers/{serverUuid}/tunnel', 'Update the tunnel configuration of the server', ['serverUuid']),
	op('serverTunnel', 'Server Tunnel', 'Update Ports', 'serverTunnel.updatePorts', 'PUT', '/api/client/servers/{serverUuid}/tunnel/ports', 'Replace the exposed tunnel ports', ['serverUuid']),

	op('system', 'System', 'Get Announcements', 'system.getAnnouncements', 'GET', '/api/announcements', 'Get public announcements'),
	op('system', 'System', 'Get OpenAPI Document', 'system.getOpenApi', 'GET', '/openapi.json', 'Get the Panel OpenAPI document'),
	op('system', 'System', 'Get Languages', 'system.getLanguages', 'GET', '/api/languages', 'List available languages'),
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
	{ hasBody: true },
);

const allOperations = [...operations, customOperation];

const operationValuesUsing = (identifier: IdentifierName): string[] =>
	allOperations
		.filter((operation) => operation.identifiers.includes(identifier))
		.map((operation) => operation.value);

const operationValuesWithBody = (format: BodyFormat): string[] =>
	allOperations
		.filter((operation) => operation.hasBody && operation.body === format)
		.map((operation) => operation.value);

const jsonBodyOperationValues = operationValuesWithBody('json');
const rawBodyOperationValues = operationValuesWithBody('raw');
const textBodyOperationValues = [...jsonBodyOperationValues, ...rawBodyOperationValues];
const binaryBodyOperationValues = operationValuesWithBody('binary');
const binaryResponseOperationValues = allOperations
	.filter((operation) => operation.response === 'binary')
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
		displayOptions: {
			show: showForJsonBody([
				'clientServer.setPowerState',
				'serverDatabaseInstances.setPowerState',
			]),
		},
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
		displayName: 'Backup Group UUID',
		name: 'backupGroupUuidBody',
		type: 'string',
		displayOptions: { show: showForJsonBody(['serverBackups.create']) },
		default: '',
		description: 'The backup group to create the backup in. Leave empty for no group.',
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
	apiKeyIdentifier: {
		displayName: 'API Key Identifier',
		description: 'The API key identifier',
	},
	apiKeyUuid: {
		displayName: 'API Key UUID',
		description: 'The API key UUID',
	},
	backupConfigurationUuid: {
		displayName: 'Backup Configuration UUID',
		description: 'The backup configuration UUID',
	},
	backupGroupUuid: {
		displayName: 'Backup Group UUID',
		description: 'The backup group UUID',
	},
	backupUuid: {
		displayName: 'Backup UUID',
		description: 'The backup UUID',
	},
	commandSnippetUuid: {
		displayName: 'Command Snippet UUID',
		description: 'The command snippet UUID',
	},
	connectionUuid: {
		displayName: 'Connected Server UUID',
		description: 'The UUID of the connected server',
	},
	databaseAgentHostUuid: {
		displayName: 'Database Agent Host UUID',
		description: 'The database agent host UUID',
	},
	databaseAgentTemplateUuid: {
		displayName: 'Database Agent Template UUID',
		description: 'The database agent template UUID',
	},
	databaseHostUuid: {
		displayName: 'Database Host UUID',
		description: 'The database host UUID',
	},
	databaseInstanceUuid: {
		displayName: 'Database Instance UUID',
		description: 'The database instance UUID',
	},
	databaseUserUuid: {
		displayName: 'Database User UUID',
		description: 'The database instance user UUID',
	},
	databaseUuid: {
		displayName: 'Database UUID',
		description: 'The database UUID',
	},
	deviceUuid: {
		displayName: 'Device UUID',
		description: 'The device UUID',
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
	emailVariableName: {
		displayName: 'Email Variable Name',
		description: 'The email variable name',
	},
	extensionPackageName: {
		displayName: 'Extension Package Name',
		description: 'The extension package name',
	},
	externalServerId: {
		displayName: 'External Server ID',
		description: 'The external server ID',
	},
	externalUserId: {
		displayName: 'External User ID',
		description: 'The external user ID',
	},
	hostUuid: {
		displayName: 'Host UUID',
		description: 'The database host UUID for a nested route',
	},
	locationUuid: {
		displayName: 'Location UUID',
		description: 'The location UUID',
	},
	logFile: {
		displayName: 'Log File',
		description: 'The node system log file name',
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
	oauthUserIdentifier: {
		displayName: 'OAuth User Identifier',
		description: 'The OAuth provider user identifier',
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
	systemBackupPolicyUuid: {
		displayName: 'System Backup Policy UUID',
		description: 'The system backup policy UUID',
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
				operation: jsonBodyOperationValues,
			},
		},
		options: [
			{ name: 'JSON', value: 'json' },
			{ name: 'Raw Text', value: 'raw' },
			{ name: 'None', value: 'none' },
		],
		default: 'json',
	},
	{
		displayName: 'Body Mode',
		name: 'bodyMode',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				operation: rawBodyOperationValues,
			},
		},
		options: [
			{ name: 'Raw Text', value: 'raw' },
			{ name: 'JSON', value: 'json' },
			{ name: 'None', value: 'none' },
		],
		default: 'raw',
	},
	{
		displayName: 'Input Binary Field',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: binaryBodyOperationValues,
			},
		},
		default: 'data',
		hint: 'The name of the input binary field containing the file to upload',
		description: 'The binary field of the input item whose contents are sent as the request body',
	},
	{
		displayName: 'Put Output File in Field',
		name: 'binaryOutputPropertyName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: binaryResponseOperationValues,
			},
		},
		default: 'data',
		hint: 'The name of the output binary field to put the downloaded file in',
		description: 'The binary field of the output item that receives the downloaded file',
	},
	...structuredBodyProperties,
	{
		displayName: 'Body JSON',
		name: 'bodyJson',
		type: 'json',
		displayOptions: {
			show: {
				bodyMode: ['json'],
				operation: textBodyOperationValues,
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
				operation: textBodyOperationValues,
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

export const operationByValue = new Map(allOperations.map((operation) => [operation.value, operation]));
