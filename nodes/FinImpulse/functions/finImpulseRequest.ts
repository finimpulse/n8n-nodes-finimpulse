import {
	IExecuteFunctions,
	IHttpRequestOptions,
} from 'n8n-workflow';

export async function finImpulseRequest(ef: IExecuteFunctions, options: IHttpRequestOptions) {
	const baseUrl = 'https://api.finimpulse.com/v1';

	const requestOptions: IHttpRequestOptions = {
		method: options.method ? options.method : 'POST',
		headers: {
			'Accept': 'application/json'
		},
		body: options.body ? options.body : null,
		url: baseUrl + options.url,
		json: true,
	};

	return await ef.helpers.httpRequestWithAuthentication.call(ef, 'finImpulseApi', requestOptions);
}