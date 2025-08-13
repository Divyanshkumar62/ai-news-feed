import React from 'react';

function NewsCardSkeleton() {
  return (
    <div className="card">
      <div className="animate-pulse">
        <div className="bg-gray-700 h-4 w-1/2 mb-2 rounded-full"></div>
        <div className="bg-gray-700 h-6 w-full mb-2 rounded-md"></div>
        <div className="bg-gray-700 h-4 w-3/4 mb-2 rounded-md"></div>
        <div className="bg-gray-700 h-4 w-1/2 mb-4 rounded-md"></div>
        <div className="bg-gray-700 h-3 w-1/4 rounded-full"></div>
      </div>
    </div>
  );
}

export default NewsCardSkeleton;