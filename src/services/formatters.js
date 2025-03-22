// Format stock data from AlphaVantage API
export const formatStockData = (data, symbol) => {
    if (!data || !data['Time Series (5min)']) {
      throw new Error('Invalid data format received from API');
    }
    
    const timeSeries = data['Time Series (5min)'];
    const timestamps = [];
    const prices = [];
    
    // Convert time series object to arrays
    Object.keys(timeSeries).slice(0, 30).forEach(timestamp => {
      // Format timestamp for display
      const date = new Date(timestamp);
      timestamps.push(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      
      // Get close price for each interval
      prices.push(parseFloat(timeSeries[timestamp]['4. close']));
    });
    
    // Reverse arrays to show oldest to newest
    timestamps.reverse();
    prices.reverse();
    
    const currentPrice = prices[prices.length - 1];
    const openPrice = prices[0];
    const priceChange = currentPrice - openPrice;
    const priceChangePercent = (priceChange / openPrice) * 100;
    
    return {
      symbol,
      timestamps,
      prices,
      currentPrice,
      openPrice,
      priceChange,
      priceChangePercent,
      volume: parseInt(timeSeries[Object.keys(timeSeries)[0]]['5. volume'])
    };
  };
  
  // Format currency data from AlphaVantage API
  export const formatCurrencyData = (data, pair) => {
    if (!data || !data['Realtime Currency Exchange Rate']) {
      throw new Error('Invalid currency data format received from API');
    }
    
    const exchangeData = data['Realtime Currency Exchange Rate'];
    const rate = parseFloat(exchangeData['5. Exchange Rate']);
    
    // We don't get previous rates from the API, so we'll simulate a small change
    const prevRate = rate * 0.99; // Simulated previous rate
    const change = rate - prevRate;
    const changePercent = (change / prevRate) * 100;
    
    return {
      pair,
      rate,
      high: rate * 1.01, // Simulated high
      low: rate * 0.99, // Simulated low
      change,
      changePercent,
      timestamp: exchangeData['6. Last Refreshed']
    };
  };
  
  // Format news data from News API
  export const formatNewsData = (data) => {
    if (!data || !data.articles) {
      throw new Error('Invalid news data format received from API');
    }
    
    return data.articles.map(article => ({
      title: article.title,
      description: article.description,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt
    }));
  };