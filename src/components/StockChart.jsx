import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = ({ data, symbol, onSelectStock, availableStocks }) => {
  const [timeframe, setTimeframe] = useState('1D');
  
  if (!data) return <div>Loading chart data...</div>;

  const currentPrice = data.currentPrice || 0;
  const priceChange = data.priceChange || 0;
  const priceChangePercent = data.priceChangePercent || 0;
  const isPositive = priceChange >= 0;
  
  // Format data for Chart.js
  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: symbol,
        data: data.prices,
        borderColor: data.priceChange >= 0 ? '#4caf50' : '#f44336',
        backgroundColor: data.priceChange >= 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: (value) => `$${value ? value.toFixed(2) : '0.00'}`,
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };
  
  const timeframeOptions = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];
  
  return (
    <div className="stock-chart">
      <div className="card-header">
        <div className="stock-info">
          <h2 className="card-title">{symbol} Stock Chart</h2>
          <div className="stock-price">
            ${currentPrice.toFixed(2)}
            <span className={isPositive ? 'stock-up' : 'stock-down'}>
              {isPositive ? ' +' : ' '}
              {priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <div className="stock-selector">
          <select 
            value={symbol} 
            onChange={(e) => onSelectStock(e.target.value)}
            aria-label="Select stock"
          >
            {availableStocks.map(stock => (
              <option key={stock} value={stock}>{stock}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="timeframe-selector">
        {timeframeOptions.map(option => (
          <button
            key={option}
            className={timeframe === option ? 'active' : ''}
            onClick={() => setTimeframe(option)}
          >
            {option}
          </button>
        ))}
      </div>
      
      <div className="chart-container" style={{ height: '400px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default StockChart;