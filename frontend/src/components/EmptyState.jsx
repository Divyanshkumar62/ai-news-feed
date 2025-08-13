import React from 'react';

function EmptyState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-48">
      <p className="text-textSecondary mb-4">No news available. Please try again later.</p>
      {onRetry && (
        <button className="bg-accent hover:bg-accentLight text-white font-bold py-2 px-4 rounded" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default EmptyState;