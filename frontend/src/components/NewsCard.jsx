import React from 'react';

function NewsCard({ article }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-2">{article.title}</h2>
      <p className="text-gray-700">{article.summary}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500">{article.source} - {article.date}</span>
        <a href={article.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
}

export default NewsCard;