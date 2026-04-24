import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FinImpulseApi implements ICredentialType {
	name = 'finImpulseApi';
	displayName = 'FinImpulse API';
	documentationUrl = 'https://developers.finimpulse.com/authentication/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials?.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			baseURL: 'https://api.finimpulse.com/v1',
			url: '/appendix/user_data',
			headers: {
				'Accept': 'application/json'
			}
		},
	};
}
