# Financial Dashboard

A real-time financial dashboard built with React that displays stock prices, currency exchange rates, and market news.

## Features

- **Stock Price Chart**: Interactive chart showing price movements over different timeframes
- **Currency Exchange Rates**: Real-time currency pair data with change indicators
- **Market News**: Latest financial news from major sources
- **Performance Metrics**: Overview of market performance
- **Stock Table**: Sortable table of top stocks
- **Dark Mode**: Toggle between light and dark themes

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/financial-dashboard.git
cd financial-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your API keys:
```
REACT_APP_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
REACT_APP_NEWS_API_KEY=your_news_api_key
```

You can get free API keys from:
- [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
- [News API](https://newsapi.org/register)

### Running the Application

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `public/`: Static files
- `src/`:
  - `components/`: React components
  - `services/`: API and data handling functions
  - `hooks/`: Custom React hooks
  - `App.jsx`: Main application component
  - `index.js`: Entry point

## Technologies Used

- React
- Chart.js & react-chartjs-2
- Axios
- Alpha Vantage API
- News API

## Customization

### Adding More Stocks

Edit the `stockSymbols` array in `Dashboard.jsx` to include additional stock symbols.

### Changing Currency Pairs

Edit the `currencyPairs` array in `Dashboard.jsx` to display different currency pairs.

### Modifying Update Frequency

The dashboard refreshes data every 5 minutes by default. You can change this by modifying the interval in the `useEffect` hook in `Dashboard.jsx`.

## Notes

- The application includes mock data functionality to avoid API rate limits during development. Set `useMockData` to `false` in `api.js` to use real API data.
- Free API keys have usage limitations. Consider upgrading to paid plans for production use.