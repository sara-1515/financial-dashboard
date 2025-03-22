import React, { useState, useEffect } from 'react';
import { fetchMultipleStocksData } from '../services/api';

const StockTable = ({ stocks, onSelectStock }) => {
  const [stocksData, setStocksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: 'symbol',
    direction: 'ascending'
  });
  
  useEffect(() => {
    const getStocksData = async () => {
      try {
        setLoading(true);
        const data = await fetchMultipleStocksData(stocks);
        setStocksData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stocks data:', error);
        setLoading(false);
      }
    };
    
    getStocksData();
    const intervalId = setInterval(getStocksData, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, [stocks]);
  
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedStocks = React.useMemo(() => {
    if (loading || !stocksData.length) return [];
    
    let sortableItems = [...stocksData];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [stocksData, sortConfig, loading]);
  
  if (loading) {
    return <div>Loading stocks data...</div>;
  }
  
  return (
    <div className="stock-table">
      <h3 className="card-title">Top Stocks</h3>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('symbol')}>Symbol</th>
            <th onClick={() => requestSort('price')}>Price</th>
            <th onClick={() => requestSort('change')}>Change</th>
            <th onClick={() => requestSort('changePercent')}>% Change</th>
            <th onClick={() => requestSort('volume')}>Volume</th>
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock) => (
            <tr 
              key={stock.symbol} 
              onClick={() => onSelectStock(stock.symbol)}
              className="clickable-row"
            >
              <td>{stock.symbol}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td className={stock.change >= 0 ? 'stock-up' : 'stock-down'}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
              </td>
              <td className={stock.changePercent >= 0 ? 'stock-up' : 'stock-down'}>
                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </td>
              <td>{(stock.volume / 1000000).toFixed(2)}M</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;