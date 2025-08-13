import React from 'react';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-textPrimary mb-4">404 - Not Found</h1>
      <p className="text-textSecondary">The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;