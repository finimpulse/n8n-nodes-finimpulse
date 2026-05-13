import {
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { StatisticsOperations } from './resources/statistics';
import { MarketDataOperations } from './resources/market_data';
import { AnalystInsightsOperations } from './resources/analyst_insights';
import { histories, news, profile, search, summary } from './execute/general';
import { analysts, earnings, recommendations, upgradesDowngrades } from './execute/analysis';
import { annualReturns, general, risks } from './execute/statistics';

export class FinImpulse implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'FinImpulse',
		name: 'finImpulse',
		icon: 'file:finimpulse.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'FinImpulse',
		defaults: {
			name: 'FinImpulse',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'finImpulseApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				// eslint-disable-next-line @n8n/community-nodes/options-sorted-alphabetically
				options: [
					{
						name: 'Market Data',
						value: 'market_data',
					},
					{
						name: 'Analyst Insights',
						value: 'analyst_insights',
					},
					{
						name: 'Financial Statistics & Risk',
						value: 'statistics',
					}
				],
				default: 'market_data',
			},
			...MarketDataOperations,
			...AnalystInsightsOperations,
			...StatisticsOperations,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const responseData = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const mapping: ResourceOperationFunctions = {
			'market_data': {
				'search': search,
				'histories': histories,
				'summary': summary,
				'profile': profile,
				'news': news
			},
			'analyst_insights': {
				'earnings': earnings,
				'recommendations': recommendations,
				'upgrades_downgrades': upgradesDowngrades,
				'analysts': analysts
			},
			'statistics': {
				'general': general,
				'risks': risks,
				'annual_returns': annualReturns
			}
		};

		const fn = mapping[resource][operation];
		if (!fn) {
			throw new NodeOperationError(this.getNode(), "Operation not found");
		}

		const items = this.getInputData();

		for (let i = 0; i < items.length; i++) {
			try {
				const result = await fn(this, i);
				if (Array.isArray(result)) {
					for (const r of result) {
						responseData.push({
							json: r,
							pairedItem: { item: i }
						});
					}
				} else {
					responseData.push({
						json: result,
						pairedItem: { item: i }
					});
				}
			} catch  (error) {
				if (this.continueOnFail()) {
					items.push({ json: this.getInputData(i)[0].json, error, pairedItem: i });
				} else {
					if (error.context) {
						error.context.itemIndex = i;
					}
					throw new NodeOperationError(this.getNode(), error, {
						itemIndex: i,
					});
				}
			}
		}

		return [responseData];
	}
}

type ResourceOperationFunctions = {
	[resource: string]: {
		[operation: string]: (ef: IExecuteFunctions, i: number) => Promise<unknown>;
	}
};
