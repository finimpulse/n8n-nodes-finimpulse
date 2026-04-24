import {
	INodeProperties,
} from 'n8n-workflow';

export const AnalystInsightsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['analyst_insights'],
			},
		},
		options: [
			{
				name: 'Get Earnings Data',
				value: 'earnings',
				action: 'Get earnings data',
				description: 'Returns earnings-related data for an asset, including EPS, revenue, analyst estimates, revisions, trends, and growth metrics',
			},
			{
				name: 'Get Recommendation Trends',
				value: 'recommendations',
				action: 'Get recommendation trends',
				description: 'Returns a breakdown of analyst recommendations for an asset over time, including counts for Strong Buy, Buy, Hold, Sell, and Strong Sell',
			},
			{
				name: 'Get Analyst Actions',
				value: 'upgrades_downgrades',
				action: 'Get analyst actions',
				description: 'Returns a feed of analyst rating actions for an asset, including upgrades, downgrades, reiterations, and price target changes',
			},
			{
				name: 'Get Analyst Ratings',
				value: 'analysts',
				action: 'Get analyst ratings',
				description: 'Returns a list of analysts covering an asset, including their ratings, sentiment, price targets, and latest updates',
			}
		],
		default: 'earnings',
	},

	// Parameters
	{
		displayName: 'Asset Identifier (Ticker Symbol)',
		name: 'symbol',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['earnings', 'recommendations', 'upgrades_downgrades', 'analysts'],
			},
		},
		default: '',
	},
	{
		displayName: 'Record Types',
		name: 'types',
		type: 'multiOptions',
		placeholder: 'Add type',
		// eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
		options: [
			{
				name: 'EPS Actual',
				value: 'eps_actual'
			},
			{
				name: 'Earnings & Revenue',
				value: 'earnings_revenue'
			},
			{
				name: 'Earnings',
				value: 'earnings'
			},
			{
				name: 'Revenue',
				value: 'revenue'
			},
			{
				name: 'EPS Trend',
				value: 'eps_trend'
			},
			{
				name: 'EPS Revisions',
				value: 'eps_revisions'
			},
			{
				name: 'Growth',
				value: 'growth'
			}
		],
		displayOptions: {
			show: {
				operation: ['earnings'],
			},
		},
		default: [],
	},
	{
		displayName: 'Accounting Methodologies',
		name: 'methodologies',
		type: 'multiOptions',
		placeholder: 'Add methology',
		options: [
			{
				name: 'GAAP',
				value: 'gaap'
			},
			{
				name: 'Normalized',
				value: 'normalized'
			},
		],
		displayOptions: {
			show: {
				operation: ['earnings'],
			},
		},
		default: [],
	},
	{
		displayName: 'Comparison Symbols',
		name: 'comparison_symbols',
		placeholder: 'Add symbol',
		type: 'fixedCollection',
		default: [],
		description: 'Tickers or indices to include in growth estimates comparisons. Note that S&P 500 is always included by default and does not need to be specified.',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'values',
				displayName: 'Symbol',
				values: [
					{
						displayName: 'Symbol',
						name: 'value',
						type: 'string',
						required: true,
						default: ''
					},
				],
			},
		],
		displayOptions: {
			show: {
				operation: ['earnings'],
			},
		},
	},
	{
		displayName: 'Start Date',
		name: 'start_date',
		type: 'dateTime',
		displayOptions: {
			show: {
				operation: ['earnings', 'recommendations','upgrades_downgrades'],
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
				operation: ['earnings', 'recommendations', 'upgrades_downgrades'],
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
				operation: ['earnings', 'recommendations', 'upgrades_downgrades', 'analysts'],
			},
		},
		default: 100,
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
				operation: ['earnings', 'recommendations', 'upgrades_downgrades', 'analysts'],
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
		hint: 'You can find details in the <a href="https://developers.finimpulse.com/v1/analysis/earnings/#api-request-filters">FinImpulse documentation</a>.',
		displayOptions: {
			show: {
				operation: ['earnings'],
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'string',
		default: '',
		description: 'Optional filter expressions',
		hint: 'You can find details in the <a href="https://developers.finimpulse.com/v1/analysis/recommendations/#api-request-filters">FinImpulse documentation</a>.',
		displayOptions: {
			show: {
				operation: ['recommendations'],
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'string',
		default: '',
		description: 'Optional filter expressions',
		hint: 'You can find details in the <a href="https://developers.finimpulse.com/v1/analysis/upgrades-downgrades/#api-request-filters">FinImpulse documentation</a>.',
		displayOptions: {
			show: {
				operation: ['upgrades_downgrades'],
			},
		},
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'string',
		default: '',
		description: 'Optional filter expressions',
		hint: 'You can find details in the <a href="https://developers.finimpulse.com/v1/analysis/analysts/#api-request-filters">FinImpulse documentation</a>.',
		displayOptions: {
			show: {
				operation: ['analysts'],
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
				operation: ['earnings', 'recommendations', 'upgrades_downgrades', 'analysts'],
			},
		},
	},
];
