import React, { useState } from 'react';
import { Movie } from '../../models';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { Title, Year, imdbID, Type, Poster } = movie;
  const [imgSrc, setImgSrc] = useState(Poster);

  const placeholderImage = process.env.REACT_APP_PLACEHOLDER_IMAGE || 'https://via.placeholder.com/300x445?text=No+Image';

  const handleImageError = () => {
    setImgSrc(placeholderImage);
  };

  return (
    <div className="movie-card">
      <img
        src={imgSrc !== 'N/A' ? imgSrc : placeholderImage}
        alt={Title}
        className="movie-card__image"
        onError={handleImageError}
      />
      <div className="movie-card__info">
        <span>Name: {Title}</span>
        <span>Year: {Year}</span>
        <span>imdbID: {imdbID}</span>
        <span>Type: {Type}</span>
      </div>
    </div>
  );
};

export default MovieCard;
