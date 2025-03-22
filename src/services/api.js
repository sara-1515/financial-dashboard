// src/services/api.js
const API_KEY = process.env.REACT_APP_API_KEY;

// Fetch single stock data
export const fetchStockData = async (symbol = 'AAPL') => {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if API returned an error
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }
    
    return formatStockData(data);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

// Fetch multiple stocks data
export const fetchMultipleStocksData = async (symbols = ['AAPL', 'MSFT', 'GOOGL']) => {
  try {
    const promises = symbols.map(symbol => fetchStockData(symbol));
    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching multiple stocks data:', error);
    throw error;
  }
};

// Fetch currency data
export const fetchCurrencyData = async (fromCurrency = 'USD', toCurrency = 'EUR') => {
  try {
    const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return formatCurrencyData(data);
  } catch (error) {
    console.error('Error fetching currency data:', error);
    throw error;
  }
};

// Fetch market news (Alpha Vantage doesn't have a free news endpoint, so this is a simplified example)
export const fetchMarketNews = async () => {
  try {
    // For demonstration, using a time series as a substitute since Alpha Vantage's free tier doesn't include news
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SPY&apikey=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return formatNewsData(data);
  } catch (error) {
    console.error('Error fetching market news:', error);
    throw error;
  }
};

// Format functions (implement these based on the API response structure)
export const formatStockData = (data) => {
  // For Alpha Vantage Global Quote
  if (data['Global Quote']) {
    const quote = data['Global Quote'];
    return {
      symbol: quote['01. symbol'],
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: quote['10. change percent'].replace('%', ''),
      updated: new Date().toLocaleString()
    };
  }
  return {
    symbol: 'Unknown',
    price: 0,
    change: 0,
    changePercent: 0,
    updated: new Date().toLocaleString()
  };
};

export const formatCurrencyData = (data) => {
  // For Alpha Vantage Currency Exchange Rate
  if (data['Realtime Currency Exchange Rate']) {
    const rate = data['Realtime Currency Exchange Rate'];
    return {
      fromCurrency: rate['1. From_Currency Code'],
      toCurrency: rate['3. To_Currency Code'],
      exchangeRate: parseFloat(rate['5. Exchange Rate']),
      lastUpdated: rate['6. Last Refreshed']
    };
  }
  return {
    fromCurrency: 'Unknown',
    toCurrency: 'Unknown',
    exchangeRate: 0,
    lastUpdated: new Date().toLocaleString()
  };
};

export const formatNewsData = (data) => {
  // This is a simplified placeholder since Alpha Vantage free tier doesn't include news
  // In a real app, you'd parse the actual news API response
  return [
    {
      title: 'Market Update',
      source: 'Financial News',
      url: '#',
      publishedDate: new Date().toLocaleString(),
      summary: 'This is placeholder news data. Subscribe to a news API for real data.'
    }
  ];
};
