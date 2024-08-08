import React, { useState, useEffect } from 'react';
import './ImageCard.css';

const ImageCard = ({ image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); // Ensure these lines are present

  useEffect(() => {
    const favoritePhotos = JSON.parse(localStorage.getItem('favoritePhotos')) || {};
    setIsFavorite(favoritePhotos[image.id] || false); // Ensure image.id is used here correctly
  }, [image.id]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFavoriteClick = async () => {
    const favorite = !isFavorite;
    setIsFavorite(favorite);

    try {
      const method = favorite ? 'POST' : 'DELETE';
      const url = favorite ? '/api/photos' : `/api/photos/${image.id}`;

      const body = favorite ? JSON.stringify({
        photoId: image.id,
        alt: image.alt,
        src: image.src.medium,
      }) : null;

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body,
      });
    } catch (error) {
      console.error('Error updating favorite:', error.message);
    }
  };

  return (
    <div
      className={`image-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={image.src.medium} className="card-image" alt={image.alt} />
      <div className={`card-body ${isHovered ? 'visible' : 'invisible'}`}>
        <div className="card-title">{image.photographer}</div>
        <hr className="divider" />
        <div className="card-text">{image.alt}</div>
        <button className="favorite-button" onClick={handleFavoriteClick}>
          {isFavorite ? 'Remove Favorite' : 'Favorite'}
        </button>
      </div>
    </div>
  );
};

export default ImageCard;

