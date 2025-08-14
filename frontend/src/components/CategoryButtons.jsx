import React from 'react';

function CategoryButtons() {
  return (
    <div className="flex justify-center space-x-4 p-4">
      <button className="bg-accent hover:bg-accentLight text-white font-bold py-2 px-4 rounded">Most Popular</button>
      <button className="bg-accent hover:bg-accentLight text-white font-bold py-2 px-4 rounded">Most Shared</button>
      {/* Add more categories as needed */}
    </div>
  );
}

export default CategoryButtons;
