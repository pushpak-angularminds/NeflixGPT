import React from 'react';

interface CardProps {
  imgPath: string;
}

const Card: React.FC<CardProps> = ({ imgPath }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 min-w-[200px]">
      <img
        className="w-full h-full object-cover"
        src={'https://image.tmdb.org/t/p/w500' + imgPath}
        alt="Movie Poster"
      />
    </div>
  );
};

export default Card;
