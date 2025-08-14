import React from 'react';
import { AiFillEye, AiOutlineArrowUp, AiOutlineRead } from 'react-icons/ai';

function NewsCard({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString(
    'en-US',
    {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  );

  const dummyTags = ['Technology', 'AI', 'Sports'];
  const dummyUpvotes = 15;
  const dummyReadLater = false;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 p-4">
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold text-gray-800 leading-tight">
          {article.heading}
        </h2>
        <span className="text-gray-500 text-sm">{formattedDate}</span>
      </div>
      <p className="text-gray-600 line-clamp-3 mb-4">
        {article.newscontent}
        <a href="#" className="text-blue-500 hover:text-blue-700"> Read More</a>
      </p>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center text-gray-500">
          <AiFillEye className="mr-1" />
          <span>{article.views}</span>
        </div>
        <div className="flex space-x-2">
          <button className="hover:text-blue-500">
            <AiOutlineArrowUp className="h-5 w-5" />
            <span>{dummyUpvotes}</span>
          </button>
          <button className="hover:text-green-500">
            <AiOutlineRead className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex space-x-2 mt-2">
        {dummyTags.map(tag => (
          <span key={tag} className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs font-semibold">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default NewsCard;