import { useState, useEffect, useCallback } from 'react';
import newsService from '../services/newsService';

const useFetchNews = (initialParams = {}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [params, setParams] = useState(initialParams);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await newsService.getNews({ ...params, page });

      if (data.length === 0) {
        setHasMore(false);
      }

      setArticles(prevArticles => [...prevArticles, ...data]);
      setPage(prevPage => prevPage + 1);

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, params]);

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
    fetchData();
  }, [params]);

  const setFilter = useCallback((newParams) => {
      setParams(prevParams => ({...prevParams, ...newParams, page:1}));
  }, [setParams])

  return {
    articles,
    loading,
    error,
    hasMore,
    fetchData,
    setFilter
  };
};

export default useFetchNews;