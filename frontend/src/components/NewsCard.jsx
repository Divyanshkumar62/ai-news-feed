import React from 'react';

function NewsCard({ article }) {
  return (
    <div className="card hover:scale-105 transition-transform duration-200">
      <div className="flex items-center justify-between mb-2">
        <span className="bg-accent text-white text-xs font-bold rounded-full px-2 py-1">{article.source || 'Source'}</span>
        <span className="text-textSecondary text-sm">{article.date}</span>
      </div>
      <h2 className="text-lg font-bold mb-2 text-textPrimary">{article.title}</h2>
      <p className="text-textSecondary mb-4 line-clamp-2">{article.summary}</p>
      <a href={article.link} className="text-accent hover:text-accentLight font-bold" target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
}

export default NewsCard;