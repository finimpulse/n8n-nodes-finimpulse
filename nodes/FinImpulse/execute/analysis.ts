import {
	IExecuteFunctions,
	IHttpRequestOptions,
	IDataObject,
	NodeOperationError,
	INodeListSearchItems,
} from 'n8n-workflow';
import { formatDate, parseFilters, parseMultiOptionItems} from '../functions/generalFunctions';
import { finImpulseRequest } from '../functions/finImpulseRequest';

export async function earnings(ef: IExecuteFunctions, i: number) {
	const filters = ef.getNodeParameter('filters', i) as unknown as string;
	let parsedFilters = [];
	try {
		parsedFilters = parseFilters(filters);
	} catch {
		throw new NodeOperationError(ef.getNode(), "Invalid Filters value");
	}

	const compressionSymbols = ef.getNodeParameter('comparison_symbols', i) as IDataObject;
	const parsedCompressionSymbols = parseMultiOptionItems(compressionSymbols);

	const sortBy = ef.getNodeParameter('sort_by', i) as IDataObject;

	const params: IHttpRequestOptions = {
		url: '/analysis/earnings',
		body: {
			symbol: ef.getNodeParameter('symbol', i),
			types: ef.getNodeParameter('types', i) ?? null,
			methodologies: ef.getNodeParameter('methodologies', i) ?? null,
			comparison_symbols: parsedCompressionSymbols.length ? parsedCompressionSymbols : null,
			start_date: formatDate(ef.getNodeParameter('start_date', i) ?? null),
			end_date: formatDate(ef.getNodeParameter('end_date', i) ?? null),
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

export async function recommendations(ef: IExecuteFunctions, i: number) {
	const filters = ef.getNodeParameter('filters', i) as unknown as string;
	let parsedFilters = [];
	try {
		parsedFilters = parseFilters(filters);
	} catch {
		throw new NodeOperationError(ef.getNode(), "Invalid Filters value");
	}

	const sortBy = ef.getNodeParameter('sort_by', i) as IDataObject;

	const params: IHttpRequestOptions = {
		url: '/analysis/recommendations',
		body: {
			symbol: ef.getNodeParameter('symbol', i),
			start_date: formatDate(ef.getNodeParameter('start_date', i) ?? null),
			end_date: formatDate(ef.getNodeParameter('end_date', i) ?? null),
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

export async function upgradesDowngrades(ef: IExecuteFunctions, i: number) {
	const filters = ef.getNodeParameter('filters', i) as unknown as string;
	let parsedFilters = [];
	try {
		parsedFilters = parseFilters(filters);
	} catch {
		throw new NodeOperationError(ef.getNode(), "Invalid Filters value");
	}

	const sortBy = ef.getNodeParameter('sort_by', i) as IDataObject;

	const params: IHttpRequestOptions = {
		url: '/analysis/upgrades-downgrades',
		body: {
			symbol: ef.getNodeParameter('symbol', i),
			start_date: formatDate(ef.getNodeParameter('start_date', i) ?? null),
			end_date: formatDate(ef.getNodeParameter('end_date', i) ?? null),
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

export async function analysts(ef: IExecuteFunctions, i: number) {
	const filters = ef.getNodeParameter('filters', i) as unknown as string;
	let parsedFilters = [];
	try {
		parsedFilters = parseFilters(filters);
	} catch {
		throw new NodeOperationError(ef.getNode(), "Invalid Filters value");
	}

	const sortBy = ef.getNodeParameter('sort_by', i) as IDataObject;

	const params: IHttpRequestOptions = {
		url: '/analysis/analysts',
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
