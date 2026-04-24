import {
	INodeProperties,
} from 'n8n-workflow';

export const StatisticsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['statistics'],
			},
		},
		options: [
			{
				name: 'Get Key Metrics',
				value: 'general',
				action: 'Get key metrics',
				description: 'Returns key financial and performance metrics for an asset, including valuation, performance, and other key indicators',
			},
			{
				name: 'Get Risk Metrics',
				value: 'risks',
				action: 'Get risk metrics',
				description: 'Returns risk and risk-adjusted performance metrics for an asset, including volatility, drawdown, and other risk indicators',
			},
			{
				name: 'Get Annual Returns',
				value: 'annual_returns',
				action: 'Get annual returns',
				description: 'Returns annual return data for an asset by year, including historical returns by calendar year',
			},
		],
		default: 'general',
	},

	// Parameters
	{
		displayName: 'Asset Identifier (Ticker Symbol)',
		name: 'symbol',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['general', 'risks', 'annual_returns'],
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
				operation: ['risks'],
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
				operation: ['risks'],
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
		hint: 'You can find details in the <a href="https://developers.finimpulse.com/v1/statistics/risks/#api-request-filters">FinImpulse documentation</a>.',
		displayOptions: {
			show: {
				operation: ['risks'],
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
				operation: ['risks'],
			},
		},
	},
];

