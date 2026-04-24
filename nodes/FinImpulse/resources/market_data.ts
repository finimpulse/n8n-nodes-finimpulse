import {
	INodeProperties,
} from 'n8n-workflow';

export const MarketDatalOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['market_data'],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: 'Search Assets',
				value: 'search',
				action: 'Search assets',
				description: 'Returns assets that match a search query (stocks, ETFs, funds)',
			},
			{
				name: 'Get Price History',
				value: 'histories',
				action: 'Get price history',
				description: 'Returns price history, dividends, splits, and other time-based data for an asset',
			},
			{
				name: 'Get Asset Summary',
				value: 'summary',
				action: 'Get asset summary',
				description: 'Returns a full snapshot of an asset, including price, fundamentals, and key metrics',
			},
			{
				name: 'Get Asset Profile',
				value: 'profile',
				action: 'Get asset profile',
				description: 'Returns basic information about an asset, such as company details, sector, and classification',
			},
			{
				name: 'Get News',
				value: 'news',
				action: 'Get news',
				description: 'Returns the latest news and press releases for an asset',
			},
		],
		default: 'search',
	},

	// Parameters
	{
		displayName: 'Search Text',
		name: 'search_text',
		type: 'string',
		description: 'Free-text query (e.g., “NVDA”, “NVIDIA”, partial ticker, partial name)',
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		default: '',
	},
	{
		displayName: 'Quote Types',
		name: 'quote_types',
		type: 'multiOptions',
		placeholder: 'Add Quote type',
		options: [
			{
				name: 'Stock',
				value: 'stock'
			},
			{
				name: 'ETF',
				value: 'etf'
			},
			{
				name: 'Mutualfund',
				value: 'mutualfund'
			}
		],
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
		default: [],
	},
	{
		displayName: 'Asset Identifier (Ticker Symbol)',
		name: 'symbol',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['histories', 'summary', 'profile', 'news'],
			},
		},
		default: '',
	},
	{
		displayName: 'Record Types',
		name: 'types',
		type: 'multiOptions',
		placeholder: 'Add type',
		options: [
			{
				name: 'Historical Price',
				value: 'historical_price'
			},
			{
				name: 'Dividends',
				value: 'dividends'
			},
			{
				name: 'Splits',
				value: 'splits'
			},
			{
				name: 'Capital Gains',
				value: 'capital_gains'
			}
		],
		displayOptions: {
			show: {
				operation: ['histories'],
			},
		},
		default: [],
	},

	{
		displayName: 'News Types',
		name: 'types',
		type: 'multiOptions',
		placeholder: 'Add type',
		options: [
			{
				name: 'News',
				value: 'news'
			},
			{
				name: 'Press Release',
				value: 'press_release'
			}
		],
		displayOptions: {
			show: {
				operation: ['news'],
			},
		},
		default: [],
	},
	{
		displayName: 'Granularity for Returned History Records',
		name: 'interval',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
		options: [
			{
				name: '',
				value: ''
			},
			{
				name: '1 Day',
				value: '1d'
			},
			{
				name: '1 Week',
				value: '1wk'
			},
			{
				name: '1 Month',
				value: '1mo'
			},
			{
				name: '3 Months',
				value: '3mo'
			},
			{
				name: '6 Months',
				value: '6mo'
			},
			{
				name: '1 Year',
				value: '1y'
			}
		],
		displayOptions: {
			show: {
				operation: ['histories'],
			},
		},
		default: '',
	},
	{
		displayName: 'Start Date',
		name: 'start_date',
		type: 'dateTime',
		displayOptions: {
			show: {
				operation: ['histories', 'news'],
			},
		},
		default: '',
	},
	{
		displayName: 'End Date',
		name: 'end_date',
		type: 'dateTime',
		displayOptions: {
			show: {
				operation: ['histories', 'news'],
			},
		},
		default: '',
	},
	{
		displayName: 'Limit',
		name: 'items_limit',
		description: 'Max number of results to return',
		type: 'number',
		typeOptions: {
			minValue: 1,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['search', 'histories', 'news'],
			},
		},
		default: 100
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		typeOptions: {
			minValue: 0,
			numberPrecision: 0,
		},
		displayOptions: {
			show: {
				operation: ['search', 'histories', 'news'],
			},
		},
		default: 0,
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'string',
		default: '',
		description: 'Optional filter expressions',
		hint: 'You can find details in the <a href="https://developers.finimpulse.com/v1/search/#api-request-filters">FinImpulse documentation</a>.',
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'string',
		default: '',
		description: 'Optional filter expressions',
		hint: 'You can find details in the <a href="https://developers.finimpulse.com/v1/news/#api-request-filters">FinImpulse documentation</a>.',
		displayOptions: {
			show: {
				operation: ['news'],
			},
		},
	},
	{
		displayName: 'Sort By',
		name: 'sort_by',
		type: 'fixedCollection',
		placeholder: 'Add Sorting',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'values',
				displayName: 'Sort',
				values: [
					{
						displayName: 'Metric',
						name: 'selector',
						type: 'string',
						required: true,
						hint: 'Metric used for sorting (e.g., amount_usd)',
						default: '',
					},
					{
						displayName: 'DESC Sorting Direction?',
						name: 'desc',
						type: 'boolean',
						default: false,
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: [ 'search', 'histories', 'news'],
			},
		},
	},
	{
		displayName: 'Has Public Financial Reports?',
		name: 'has_public_financial_reports',
		description: 'Whether the company provides public financial statements',
		type: 'options',
		options: [
			{
				name: 'Default',
				value: 'default'
			},
			{
				name: 'Yes',
				value: true
			},
			{
				name: 'No',
				value: false
			}
		],
		default: 'default',
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Include Tickers with Missing Names?',
		name: 'show_tickers_without_company_name',
		type: 'options',
		options: [
			{
				name: 'Default',
				value: 'default'
			},
			{
				name: 'Yes',
				value: true
			},
			{
				name: 'No',
				value: false
			}
		],
		default: 'default',
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Exclude Tickers with Available Names?',
		name: 'hide_tickers_with_company_name',
		type: 'options',
		options: [
			{
				name: 'Default',
				value: 'default'
			},
			{
				name: 'Yes',
				value: true
			},
			{
				name: 'No',
				value: false
			}
		],
		default: 'default',
		displayOptions: {
			show: {
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Use USD?',
		name: 'use_usd',
		type: 'options',
		options: [
			{
				name: 'Default',
				value: 'default'
			},
			{
				name: 'Yes',
				value: true
			},
			{
				name: 'No',
				value: false
			}
		],
		default: 'default',
		description: 'Whether currency-denominated fields are returned in USD or in the asset\'s native currency',
		displayOptions: {
			show: {
				operation: ['histories'],
			},
		},
	},
];
