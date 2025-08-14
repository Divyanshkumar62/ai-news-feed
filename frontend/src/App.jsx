import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar.jsx';
import TagList from './components/TagList.jsx';
import NewsCard from './components/NewsCard.jsx';
import InfiniteScrollWrapper from './components/InfiniteScrollWrapper.jsx';
import Masonry from 'react-masonry-css';

const dummyTags = [
  'Technology',
  'AI',
  'Sports',
  'Politics'
];

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
};

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const loadMoreNews = async () => {
    setLoading(true);
    try {
      // TODO: Implement proper pagination
      const response = await fetch('/api/articles');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNews(prevNews => [...prevNews, ...data]);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <SearchBar />
      <TagList tags={dummyTags} />
      <InfiniteScrollWrapper loadMore={loadMoreNews}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {news.map(item => (
            <NewsCard key={item.id} article={item} />
          ))}
        </Masonry>
      </InfiniteScrollWrapper>
    </div>
  );
}

export default App;