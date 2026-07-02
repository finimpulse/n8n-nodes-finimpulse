import {
	IExecuteFunctions,
	IHttpRequestOptions,
	IDataObject,
	NodeOperationError,
	INodeListSearchItems,
} from 'n8n-workflow';
import { parseFilters, parseMultiOptionItems} from '../functions/generalFunctions';
import { finImpulseRequest } from '../functions/finImpulseRequest';

export async function search(ef: IExecuteFunctions, i: number) {
	const filters = ef.getNodeParameter('filters', i) as unknown as string;
	let parsedFilters = [];
	try {
		parsedFilters = parseFilters(filters);
	} catch {
		throw new NodeOperationError(ef.getNode(), "Invalid Filters value");
	}

	const sortBy = ef.getNodeParameter('sort_by', i) as IDataObject;

	const data: Record<string, unknown> = {
		search_text: ef.getNodeParameter('search_text', i) ?? null,
		quote_types: ef.getNodeParameter('quote_types', i) ?? null,
		offset: ef.getNodeParameter('offset', i) ?? null,
		limit: ef.getNodeParameter('items_limit', i) ?? null,
		filters: parsedFilters.length ? parsedFilters : null,
		sort_by: sortBy.values ? sortBy.values : null,
	};

	if (ef.getNodeParameter('has_public_financial_reports', i) !== 'default') {
		data.has_public_financial_reports = ef.getNodeParameter('has_public_financial_reports', i);
	}

	if (ef.getNodeParameter('show_tickers_without_company_name', i) !== 'default') {
		data.show_tickers_without_company_name = ef.getNodeParameter('show_tickers_without_company_name', i);
	}

	if (ef.getNodeParameter('hide_tickers_with_company_name', i) !== 'default') {
		data.hide_tickers_with_company_name = ef.getNodeParameter('hide_tickers_with_company_name', i);
	}

	const params: IHttpRequestOptions = {
		url: '/search',
		body: data
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

export async function search_lite(ef: IExecuteFunctions, i: number) {
	const filters = ef.getNodeParameter('filters', i) as unknown as string;
	let parsedFilters = [];
	try {
		parsedFilters = parseFilters(filters);
	} catch {
		throw new NodeOperationError(ef.getNode(), "Invalid Filters value");
	}

	const sortBy = ef.getNodeParameter('sort_by', i) as IDataObject;

	const symbols = ef.getNodeParameter('symbols', i) as IDataObject;
	const parsedSymbols = parseMultiOptionItems(symbols);

	const selectIdentifiers = ef.getNodeParameter('select_identifiers', i) as IDataObject;
	const parsedSelectIdentifiers = parseMultiOptionItems(selectIdentifiers);

	const data: Record<string, unknown> = {
		search_text: ef.getNodeParameter('search_text', i) ?? null,
		quote_types: ef.getNodeParameter('quote_types', i) ?? null,
		symbols: parsedSymbols.length ? parsedSymbols : null,
		offset: ef.getNodeParameter('offset', i) ?? null,
		limit: ef.getNodeParameter('items_limit', i) ?? null,
		filters: parsedFilters.length ? parsedFilters : null,
		sort_by: sortBy.values ? sortBy.values : null,
	};

	if (parsedSelectIdentifiers.length) {
		data.select_identifiers = parsedSelectIdentifiers;
	}

	if (ef.getNodeParameter('has_public_financial_reports', i) !== 'default') {
		data.has_public_financial_reports = ef.getNodeParameter('has_public_financial_reports', i);
	}

	if (ef.getNodeParameter('show_tickers_without_company_name', i) !== 'default') {
		data.show_tickers_without_company_name = ef.getNodeParameter('show_tickers_without_company_name', i);
	}

	if (ef.getNodeParameter('hide_tickers_with_company_name', i) !== 'default') {
		data.hide_tickers_with_company_name = ef.getNodeParameter('hide_tickers_with_company_name', i);
	}

	const params: IHttpRequestOptions = {
		url: '/search-lite',
		body: data
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

export async function histories(ef: IExecuteFunctions, i: number) {
	const sortBy = ef.getNodeParameter('sort_by', i) as IDataObject;

	const data: Record<string, unknown> = {
		symbol: ef.getNodeParameter('symbol', i),
		types: ef.getNodeParameter('types', i) ?? null,
		interval: ef.getNodeParameter('interval', i) ?? null,
		start_date: ef.getNodeParameter('start_date', i) ?? null,
		end_date: ef.getNodeParameter('end_date', i) ?? null,
		sort_by: sortBy.values ? sortBy.values : null,
		offset: ef.getNodeParameter('offset', i) ?? null,
		limit: ef.getNodeParameter('items_limit', i) ?? null
	}

	if (ef.getNodeParameter('use_usd', i) !== 'default') {
		data.use_usd = ef.getNodeParameter('use_usd', i);
	}

	const params: IHttpRequestOptions = {
		url: '/histories',
		body: data
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

export async function summary(ef: IExecuteFunctions, i: number) {
	const params: IHttpRequestOptions = {
		url: '/summary',
		body: {
			symbol: ef.getNodeParameter('symbol', i)
		}
	};

	const result = await finImpulseRequest(ef, params);
	
	return result?.result ?? {};
}

export async function summary_lite(ef: IExecuteFunctions, i: number) {
	const selectIdentifiers = ef.getNodeParameter('select_identifiers', i) as IDataObject;
	const parsedSelectIdentifiers = parseMultiOptionItems(selectIdentifiers);

	const params: IHttpRequestOptions = {
		url: '/summary-lite',
		body: {
			symbol: ef.getNodeParameter('symbol', i),
			select_identifiers: parsedSelectIdentifiers.length ? parsedSelectIdentifiers : null
		}
	};

	const result = await finImpulseRequest(ef, params);
	
	return result?.result ?? {};
}

export async function profile(ef: IExecuteFunctions, i: number) {
	const params: IHttpRequestOptions = {
		url: '/profile',
		body: {
			symbol: ef.getNodeParameter('symbol', i)
		}
	};

	const result = await finImpulseRequest(ef, params);

	const items = result?.result?.items ?? [];
	const response: INodeListSearchItems[] = items.map((item: Record<string, unknown>) => ({
		...item,
	}));

	return response;
}

export async function news(ef: IExecuteFunctions, i: number) {
	const filters = ef.getNodeParameter('filters', i) as unknown as string;
	let parsedFilters = [];
	try {
		parsedFilters = parseFilters(filters);
	} catch {
		throw new NodeOperationError(ef.getNode(), "Invalid Filters value");
	}

	const sortBy = ef.getNodeParameter('sort_by', i) as IDataObject;

	const params: IHttpRequestOptions = {
		url: '/news',
		body: {
			symbol: ef.getNodeParameter('symbol', i),
			types: ef.getNodeParameter('types', i) ?? null,
			start_date: ef.getNodeParameter('start_date', i) ?? null,
			end_date: ef.getNodeParameter('end_date', i) ?? null,
			filters: parsedFilters.length ? parsedFilters : null,
			sort_by: sortBy.values ? sortBy.values : null,
			offset: ef.getNodeParameter('offset', i) ?? null,
			limit: ef.getNodeParameter('items_limit', i) ?? null
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

export async function market_price(ef: IExecuteFunctions, i: number) {
	const params: IHttpRequestOptions = {
		url: '/market-price/' + ef.getNodeParameter('symbol', i),
		method: 'GET'
	};

	const result = await finImpulseRequest(ef, params);
	
	return result?.result ?? {};
}

export async function metrics(ef: IExecuteFunctions, i: number) {
	const params: IHttpRequestOptions = {
		url: '/metrics',
		body: {
			symbol: ef.getNodeParameter('symbol', i)
		}
	};

	const result = await finImpulseRequest(ef, params);
	
	return result?.result[0] ?? {};
}
