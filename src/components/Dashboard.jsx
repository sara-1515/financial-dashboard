import React, { useState, useEffect } from 'react';
import StockChart from './StockChart';
import CurrencyCard from './CurrencyCard';
import MarketNews from './MarketNews';
import StockTable from './StockTable';
import PerformanceMetric from './PerformanceMetric';
import { fetchStockData, fetchCurrencyData, fetchMarketNews } from '../services/api';

const Dashboard = () => {
  const [stockData, setStockData] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState('AAPL');

  const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META'];
  const currencyPairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'USD/CAD'];

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch data for the selected stock
        const stockResult = await fetchStockData(selectedStock);
        setStockData(stockResult);
        
        // Fetch currency data
        const currencyResult = await fetchCurrencyData(currencyPairs);
        setCurrencyData(currencyResult);
        
        // Fetch market news
        const newsResult = await fetchMarketNews();
        setNewsData(newsResult);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load financial data. Please try again later.');
        setLoading(false);
        console.error('Error loading data:', err);
      }
    };

    loadData();
    
    // Set up interval to refresh data every 5 minutes
    const intervalId = setInterval(loadData, 5 * 60 * 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedStock]);

  const handleStockSelect = (symbol) => {
    setSelectedStock(symbol);
  };

  if (loading && !stockData) {
    return (
      <div className="container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading financial data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-grid">
        <div className="card full-width">
          <StockChart 
            data={stockData} 
            symbol={selectedStock} 
            onSelectStock={handleStockSelect}
            availableStocks={stockSymbols}
          />
        </div>
        
        <div className="card">
          <PerformanceMetric 
            title="Market Overview" 
            data={stockSymbols.map(symbol => ({
              name: symbol,
              value: Math.random() * 5 - 2.5, // Placeholder for demo
              prevValue: Math.random() * 5 - 2.5 // Placeholder for demo
            }))} 
          />
        </div>
        
        {currencyData && currencyPairs.map((pair, index) => (
          <div className="card" key={pair}>
            <CurrencyCard pair={pair} data={currencyData[index]} />
          </div>
        ))}
        
        <div className="card">
          <StockTable stocks={stockSymbols} onSelectStock={handleStockSelect} />
        </div>
        
        <div className="card full-width">
          <MarketNews news={newsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;