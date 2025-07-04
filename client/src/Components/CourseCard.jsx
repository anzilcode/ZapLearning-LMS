import React from 'react';

const CourseCard = ({ thumbnail, title, courseBy, rating, price }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full sm:w-[280px]">
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500 mb-1">by {courseBy}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-yellow-500 font-medium">⭐ {rating}</span>
          <span className="text-blue-600 font-semibold">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
