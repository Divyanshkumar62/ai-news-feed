import React from 'react';

function InfiniteScrollWrapper({ children, loadMore }) {
  return (
    <div>
      {children}
      <button onClick={loadMore}>Load More</button>
    </div>
  );
}

export default InfiniteScrollWrapper;