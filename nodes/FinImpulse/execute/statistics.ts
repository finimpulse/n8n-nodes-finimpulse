import {
	IExecuteFunctions,
	IHttpRequestOptions,
	IDataObject,
	NodeOperationError,
	INodeListSearchItems,
} from 'n8n-workflow';
import { parseFilters} from '../functions/generalFunctions';
import { finImpulseRequest } from '../functions/finImpulseRequest';

export async function general(ef: IExecuteFunctions, i: number) {
	const params: IHttpRequestOptions = {
		url: '/statistics/general',
		body: {
			symbol: ef.getNodeParameter('symbol', i)
		}
	};

	const response = await finImpulseRequest(ef, params);

	return response?.result?.[0] ?? {};
}

export async function risks(ef: IExecuteFunctions, i: number) {
	const filters = ef.getNodeParameter('filters', i) as unknown as string;
	let parsedFilters = [];
	try {
		parsedFilters = parseFilters(filters);
	} catch {
		throw new NodeOperationError(ef.getNode(), "Invalid Filters value");
	}

	const sortBy = ef.getNodeParameter('sort_by', i) as IDataObject;

	const params: IHttpRequestOptions = {
		url: '/statistics/risks',
		body: {
			symbol: ef.getNodeParameter('symbol', i),
			offset: ef.getNodeParameter('offset', i) ?? null,
			limit: ef.getNodeParameter('items_limit', i) ?? null,
			filters: parsedFilters.length ? parsedFilters : null,
			sort_by: sortBy.values ? sortBy.values : null
		}
	};

	const result = await finImpulseRequest(ef, params);
	
	const items = result?.result?.items ?? [];
	const response: INodeListSearchItems[] = items.map((item: Record<string, unknown>) => ({
		...item,
		_meta: {
			total_count: result?.result?.total_count ?? 0,
			offset: result?.data?.offset ?? 0,
			limit: result?.data?.limit ?? items.length,
		}
	}));

	return response;
}

export async function annualReturns(ef: IExecuteFunctions, i: number) {
	const params: IHttpRequestOptions = {
		url: '/statistics/annual-returns',
		body: {
			symbol: ef.getNodeParameter('symbol', i)
		}
	};

	const result = await finImpulseRequest(ef, params);

	const items = result?.result ?? [];
	const response: INodeListSearchItems[] =items.map((item: Record<string, unknown>) => ({
		...item,
		_meta: {
			total_count: result?.result?.total_count ?? 0,
			offset: result?.data?.offset ?? 0,
			limit: result?.data?.limit ?? items.length,
		}
	}));

	return response;
}