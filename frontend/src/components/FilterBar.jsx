import React from 'react';

function FilterBar() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4">
      <div className="flex items-center space-x-2 mb-2 md:mb-0">
        <button className="bg-accent hover:bg-accentLight text-white font-bold py-2 px-4 rounded">Most Popular</button>
        <button className="bg-accent hover:bg-accentLight text-white font-bold py-2 px-4 rounded">Most Recent</button>
        <button className="bg-accent hover:bg-accentLight text-white font-bold py-2 px-4 rounded">Most Shared</button>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-cardBackground text-textPrimary border border-glassBorder rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-accentLight"
        />
      </div>
    </div>
  );
}

export default FilterBar;