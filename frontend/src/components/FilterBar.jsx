import React from 'react';

function FilterBar() {
  return (
    <div className="flex space-x-4">
      <input type="date" className="border rounded p-2" />
      <select className="border rounded p-2">
        <option value="">All Categories</option>
        <option value="AI">AI</option>
        {/* Add more categories as needed */}
      </select>
    </div>
  );
}

export default FilterBar;