import React from 'react';

function TagList({ tags }) {
  return (
    <div className="flex space-x-2">
      {tags.map((tag) => (
        <button
          key={tag}
          className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold hover:bg-gray-300"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagList;