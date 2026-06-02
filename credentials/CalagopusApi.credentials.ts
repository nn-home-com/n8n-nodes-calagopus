import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class CalagopusApi implements ICredentialType {
	name = 'calagopusApi';

	displayName = 'Calagopus API';

	icon = { light: 'file:calagopus.svg', dark: 'file:calagopus.dark.svg' } as const;

	documentationUrl =
		'https://github.com/nn-home-com/n8n-nodes-calagopus?tab=readme-ov-file#credentials';

	properties: INodeProperties[] = [
		{
			displayName: 'Panel Base URL',
			name: 'baseUrl',
			type: 'string',
			required: true,
			default: '',
			placeholder: 'https://panel.your-domain.tld',
			description: 'The base URL of your Calagopus Panel instance',
		},
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'A Calagopus API token with permission to access the requested resources',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/client/permissions',
		},
	};
}
