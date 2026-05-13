import { IDataObject } from "n8n-workflow";

type MultiOptionItem = {
  value: string;
};

type MultiOptionItems = {
  values?: MultiOptionItem[];
};

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
  items: IDataObject
): string[] {
  const { values } = items as MultiOptionItems;

  if (!values?.length) {
    return [];
  }

  return values.map((item) => item.value);
}

export function formatDate(value: unknown): string | null {
  if (!value) return null;

  const date =
    value instanceof Date
      ? value
      : typeof value === 'string' || typeof value === 'number'
      ? new Date(value)
      : null;

  if (!date || isNaN(date.getTime())) return null;

  return date.toISOString().slice(0, 10);
}