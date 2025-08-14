import React from 'react';

function SearchBar() {
  return (
    <input
      type="text"
      placeholder="Search news..."
      className="w-full p-2 border border-gray-300 rounded"
    />
  );
}

export default SearchBar;