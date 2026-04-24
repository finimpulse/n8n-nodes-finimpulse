import { IDataObject } from "n8n-workflow";

export function parseFilters(
	filters: string
) {
	let parsedFilters = [];
	if (filters && filters.trim().length) {
		parsedFilters = JSON.parse(filters);
	}

	return parsedFilters;
}

export function parseMultiOptionItems(
	items:IDataObject
) {
	let values = items.values as Array<any>;
	let parsedItems = [];
	if (values && values.length) {
		parsedItems = values.reduce(function(result, item) {
			result.push(item['value']);
			return result;
		}, []);
	}

	return parsedItems;
}

export function parseSortBy(
	orderBy: IDataObject
) {
	let values = orderBy.values as Array<any>;
	let parsedSortBy = new Array<string>;
	for (const key in values) {
		if (Object.prototype.hasOwnProperty.call(values, key) && values[key] && values[key]['fieldName']) {
			parsedSortBy.push(values[key]['fieldName'] + ',' + values[key]['direction']);
		}
	}

	return parsedSortBy;
}

export function formatDate(
	value: unknown
) {
	try {
		if (!value) return null;

		const date = value instanceof Date ? value : new Date(value as any);

		return date.toISOString().slice(0, 10);
	} catch {
		return null;
	}
}