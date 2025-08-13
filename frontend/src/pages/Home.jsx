import React from 'react';
import { useQuery } from '@tanstack/react-query';
import NewsCard from '../components/NewsCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import API_URL from '../config/apiConfig.js';
import NewsCardSkeleton from '../components/NewsCardSkeleton.jsx';
import EmptyState from '../components/EmptyState.jsx';

function Home() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['articles'],
    queryFn: () => fetch(`${API_URL}/articles`).then((res) => res.json()),
  });

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, index) => (
        <NewsCardSkeleton key={index} />
      ))}
    </div>
  );

  if (error) return (
    <EmptyState onRetry={() => refetch()} />
  );

  if (!data || data.length === 0) return (
    <EmptyState onRetry={() => refetch()} />
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default Home;