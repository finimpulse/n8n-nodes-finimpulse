FinImpulse Node for n8n
==========

To use the FinImpulse node, you must have a FinImpulse account. You can create an account at [finimpulse.com](https://finimpulse.com/).

Refer to the [FinImpulse API documentation](https://developers.finimpulse.com/) for the list of available endpoints.

## Contents
- [Connect FinImpulse to n8n](#connect-finimpulse-to-n8n)
- [Available FinImpulse Operations](#available-finimpulse-operations)


Connect FinImpulse to n8n
--------------------------

## Prerequisites

- FinImpulse account
- n8n installed or cloud account

## Setup

To establish the connection, you must:

1.  [Obtain your FinImpulse API credentials.](#obtain-your-finimpulse-api-credentials "Obtain Your FinImpulse API Credentials")
    
2.  [Establish the connection in n8n.](#establish-the-connection-with-finimpulse-in-n8n "Establish the connection with FinImpulse in n8n")
    

### Obtain Your FinImpulse API Credentials

To obtain your FinImpulse API credentials (API token):

1.  Log in to your FinImpulse account dashboard.
    
2.  In the left sidebar, click **API Settings**.
    
3.  Add Token and store it in a safe place. 

### Establish the connection with FinImpulse in n8n

To establish the connection in n8n:

1.  Log in to your n8n account, add a FinImpulse node to your workflow, and click **Create new credential**.
    
2.  Optional: Rename the credential.
    
3.  In the **API Token** field, enter the values copied above.
    
4.  Click **Save**.
    

You have successfully established the connection. You can now build workflows using FinImpulse operations.


Available FinImpulse Operations
--------------------------

After connecting the app, you can perform the following operations:

## Market Data

### [Search Assets](https://developers.finimpulse.com/v1/search/)

Returns assets that match a search query (stocks, ETFs, funds).

+ **Search Text**: Free-text query (e.g., “NVDA”, “NVIDIA”, partial ticker, partial name).
+ **Quote Types**: Which asset types are included in the search. Available types: Stock, ETF, Mutualfund.
+ **Limit**: Maximum number of matched items returned.
+ **Offset**: Pagination offset (0-based).
+ **Filters**: Optional filter expressions.
+ **Sort By**: Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:selector - Metric used for sorting (e.g., amount_usd). desc - Sorting direction (true for descending, false for ascending). Sortings can be combined using ,.
+ **Has Public Financial Reports?**: 'Whether the company provides public financial statements.
+ **Include Tickers with Missing Names?**: This parameter determines the filtering logic in the dashboard for tickers with or without company/fund names.
+ **Exclude Tickers with Available Names?**: This parameter determines the filtering logic in the dashboard for tickers with or without company/fund names.

### [Get Price History](https://developers.finimpulse.com/v1/histories/)

Returns price history, dividends, splits, and other time-based data for an asset.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).
+ **Types**: Record types to include. Supported values: historical_price, dividends, splits, capital_gains. All parameters are of type string and are optional. If none are provided, all supported types are returned.
+ **Interval**: Granularity for returned history records. Available values: 1d (1 day), 1wk (1 week), 1mo (1 month), 3mo (3 , month), 6mo (6 month), 1y (1 year). Supported intervals depend on the data source and asset coverage.
+ **Start Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **End Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **Sort By**: Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:selector - Metric used for sorting (e.g., amount_usd). desc - Sorting direction (true for descending, false for ascending). Sortings can be combined using ,.
+ **Limit**: Maximum number of matched items returned.
+ **Offset**: Pagination offset (0-based).
+ **Use USD?**: Controls whether currency-denominated fields are returned in USD or in the asset's native currency.

### [Get Asset Summary](https://developers.finimpulse.com/v1/summary/)

Returns a full snapshot of an asset, including price, fundamentals, and key metrics.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).

### [Get Asset Profile](https://developers.finimpulse.com/v1/profile/)

Returns basic information about an asset, such as company details, sector, and classification.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).

### [Get News](https://developers.finimpulse.com/v1/news/)

Returns the latest news and press releases for an asset.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).
+ **Types**: News types to include. Supported values: news, press_release. All parameters are of type string and are optional. If none are provided, all supported types are returned.
+ **Start Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **End Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **Limit**: Maximum number of matched items returned.
+ **Offset**: Pagination offset (0-based).
+ **Filters**: Optional filter expressions.
+ **Sort By**: Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:selector - Metric used for sorting (e.g., amount_usd). desc - Sorting direction (true for descending, false for ascending). Sortings can be combined using ,.

## Analyst Insights

### [Get Earnings Data](https://developers.finimpulse.com/v1/analysis/earnings/)

Returns earnings-related data for an asset, including EPS, revenue, analyst estimates, revisions, trends, and growth metrics.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).
+ **Types**: List of analysis record types to return. Supported values: neps_actual, earnings_revenue, earnings, revenue, eps_trend, eps_revisions, growth. All parameters are of type string and are optional. If none are provided, all supported types are returned.
+ **Methodologies**: Accounting methodologies to filter earnings data. Supported values: GAAP - Official earnings calculated according to Generally Accepted Accounting Principles, normalized - Adjusted earnings, excluding one-time or non-recurring items.
+ **Comparison Symbols**: Tickers or indices to include in growth estimates comparisons. Note that S&P 500 is always included by default and does not need to be specified.
+ **Start Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **End Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **Limit**: Maximum number of matched items returned.
+ **Offset**: Pagination offset (0-based).
+ **Filters**: Optional filter expressions.
+ **Sort By**: Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:selector - Metric used for sorting (e.g., amount_usd). desc - Sorting direction (true for descending, false for ascending). Sortings can be combined using ,.

### [Get Recommendation Trends](https://developers.finimpulse.com/v1/analysis/recommendations/)

Returns a breakdown of analyst recommendations for an asset over time, including counts for Strong Buy, Buy, Hold, Sell, and Strong Sell.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).
+ **Start Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **End Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **Limit**: Maximum number of matched items returned.
+ **Offset**: Pagination offset (0-based).
+ **Filters**: Optional filter expressions.
+ **Sort By**: Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:selector - Metric used for sorting (e.g., amount_usd). desc - Sorting direction (true for descending, false for ascending). Sortings can be combined using ,.

### [Get Analyst Actions](https://developers.finimpulse.com/v1/analysis/upgrades-downgrades/)

Returns a feed of analyst rating actions for an asset, including upgrades, downgrades, reiterations, and price target changes.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).
+ **Start Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **End Date**: Date range filter (YYYY-MM-DD). Records returned fall within the requested period.
+ **Limit**: Maximum number of matched items returned.
+ **Offset**: Pagination offset (0-based).
+ **Filters**: Optional filter expressions.
+ **Sort By**: Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:selector - Metric used for sorting (e.g., amount_usd). desc - Sorting direction (true for descending, false for ascending). Sortings can be combined using ,.

### [Get Analyst Ratings](https://developers.finimpulse.com/v1/analysis/analysts/)

Returns a list of analysts covering an asset, including their ratings, sentiment, price targets, and latest updates.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).
+ **Limit**: Maximum number of matched items returned.
+ **Offset**: Pagination offset (0-based).
+ **Filters**: Optional filter expressions.
+ **Sort By**: Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:selector - Metric used for sorting (e.g., amount_usd). desc - Sorting direction (true for descending, false for ascending). Sortings can be combined using ,.

## Financial Statistics & Risk

## [Get Key Metrics](https://developers.finimpulse.com/v1/statistics/general/)

Returns key financial and performance metrics for an asset, including valuation, performance, and other key indicators.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).

### [Get Risk Metrics](https://developers.finimpulse.com/v1/statistics/risks/)

Returns risk and risk-adjusted performance metrics for an asset, including volatility, drawdown, and other risk indicators.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).
+ **Limit**: Maximum number of matched items returned.
+ **Offset**: Pagination offset (0-based).
+ **Filters**: Optional filter expressions.
+ **Sort By**: Optional sorting configuration for result items. Each sorting setup is defined as [selector, desc]:selector - Metric used for sorting (e.g., amount_usd). desc - Sorting direction (true for descending, false for ascending). Sortings can be combined using ,.

### [Get Annual Returns](https://developers.finimpulse.com/v1/statistics/annual-returns/)

Returns annual return data for an asset by year, including historical returns by calendar year.

+ **Asset Identifier (Ticker Symbol)**: Asset identifier (ticker symbol).




