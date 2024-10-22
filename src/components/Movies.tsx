import React from 'react';
import Card from './Card';

interface MoviesProps {
  category: string;
  movies: any;
}

const Movies: React.FC<MoviesProps> = ({ movies, category }) => {
  if (!movies || movies.length === 0) {
    return <div className="text-center text-gray-500">No movies available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-white mb-6">{category}</h2>
      {/* Flex layout for horizontal scrolling */}
      <div className="flex space-x-6 overflow-x-auto">
        {movies.map((item: any) => (
          <Card key={item.id} imgPath={item.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
