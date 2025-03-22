import React from 'react';

const MarketNews = ({ news }) => {
  if (!news || news.length === 0) {
    return (
      <div className="market-news">
        <h3 className="card-title">Market News</h3>
        <p>No financial news available at this time.</p>
      </div>
    );
  }
  
  return (
    <div className="market-news">
      <h3 className="card-title">Market News</h3>
      <div className="news-list">
        {news.map((item, index) => (
          <div className="news-item" key={index}>
            <div className="news-header">
              <h4 className="news-title">{item.title}</h4>
              <span className="news-source">{item.source}</span>
            </div>
            <p className="news-description">{item.description}</p>
            <div className="news-footer">
              <span className="news-time">{new Date(item.publishedAt).toLocaleString()}</span>
              <a 
                className="news-link" 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketNews;