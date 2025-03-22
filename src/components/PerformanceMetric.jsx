import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const PerformanceMetric = ({ title, data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="performance-metric">
        <h3 className="card-title">{title}</h3>
        <p>No performance data available.</p>
      </div>
    );
  }
  
  return (
    <div className="performance-metric">
      <h3 className="card-title">{title}</h3>
      <div className="metric-list">
        {data.map((item, index) => {
          const isPositive = item.value >= 0;
          const changeFromPrev = item.value - item.prevValue;
          const isImproved = changeFromPrev > 0;
          
          return (
            <div className="metric-item" key={index}>
              <div className="metric-name">{item.name}</div>
              <div className={`metric-value ${isPositive ? 'stock-up' : 'stock-down'}`}>
                {isPositive ? '+' : ''}{item.value.toFixed(2)}%
                <span className="metric-indicator">
                  {isImproved ? <FaArrowUp size={12} /> : <FaArrowDown size={12} />}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceMetric;