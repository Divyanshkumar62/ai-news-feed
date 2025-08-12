import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Fetch articles from the backend API
    fetch('http://localhost:3000/api/articles')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <FilterBar />
      {articles.length > 0 ? (
        articles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default Home;