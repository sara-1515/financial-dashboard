import { useState, useEffect } from 'react';
import { fetchStockData, fetchCurrencyData, fetchMarketNews } from '../services/api';

const useFinancialData = (stockSymbol, currencyPairs) => {
  const [data, setData] = useState({
    stock: null,
    currencies: null,
    news: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        // Start loading data
        if (isMounted) {
          setData(prevData => ({ ...prevData, loading: true, error: null }));
        }
        
        // Fetch all data in parallel
        const [stockResult, currencyResult, newsResult] = await Promise.all([
          fetchStockData(stockSymbol),
          fetchCurrencyData(currencyPairs),
          fetchMarketNews()
        ]);
        
        // Update state if component is still mounted
        if (isMounted) {
          setData({
            stock: stockResult,
            currencies: currencyResult,
            news: newsResult,
            loading: false,
            error: null
          });
        }
      } catch (err) {
        console.error('Error fetching financial data:', err);
        
        // Update error state if component is still mounted
        if (isMounted) {
          setData(prevData => ({
            ...prevData,
            loading: false,
            error: 'Failed to load financial data. Please try again later.'
          }));
        }
      }
    };

    loadData();
    
    // Set up interval to refresh data (every 5 minutes)
    const intervalId = setInterval(loadData, 5 * 60 * 1000);
    
    // Clean up on unmount
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [stockSymbol, currencyPairs]);

  // Return data and a manual refresh function
  return {
    ...data,
    refreshData: async () => {
      setData(prevData => ({ ...prevData, loading: true, error: null }));
      
      try {
        const [stockResult, currencyResult, newsResult] = await Promise.all([
          fetchStockData(stockSymbol),
          fetchCurrencyData(currencyPairs),
          fetchMarketNews()
        ]);
        
        setData({
          stock: stockResult,
          currencies: currencyResult,
          news: newsResult,
          loading: false,
          error: null
        });
      } catch (err) {
        console.error('Error refreshing financial data:', err);
        setData(prevData => ({
          ...prevData,
          loading: false,
          error: 'Failed to refresh financial data. Please try again later.'
        }));
      }
    }
  };
};

export default useFinancialData;