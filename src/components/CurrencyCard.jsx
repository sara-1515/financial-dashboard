import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const CurrencyCard = ({ pair, data }) => {
  if (!data) return <div>Loading currency data...</div>;

  const [baseCurrency, quoteCurrency] = pair.split('/');
  const isPositiveChange = data.change >= 0;
  
  return (
    <div className="currency-card">
      <div className="card-header">
        <h3 className="card-title">{pair}</h3>
        <div className={`currency-change ${isPositiveChange ? 'stock-up' : 'stock-down'}`}>
          {isPositiveChange ? <FaArrowUp /> : <FaArrowDown />}
          {Math.abs(data.change).toFixed(4)} ({Math.abs(data.changePercent).toFixed(2)}%)
        </div>
      </div>
      
      <div className="currency-rate">
        <span className="current-rate">{data.rate.toFixed(4)}</span>
        <span className="currency-label">1 {baseCurrency} = {data.rate.toFixed(4)} {quoteCurrency}</span>
      </div>
      
      <div className="currency-info">
        <div className="info-item">
          <span className="info-label">24h High</span>
          <span className="info-value">{data.high.toFixed(4)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">24h Low</span>
          <span className="info-value">{data.low.toFixed(4)}</span>
        </div>
      </div>
      
      <div className="update-time">
        Updated: {new Date(data.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default CurrencyCard;