import React, { useState, useEffect, useContext } from 'react';
import { FavoritesContext } from '../Context/FavoritesContext';
import './ImageCard.css';

const ImageCard = ({ image }) => {
  const { state, dispatch } = useContext(FavoritesContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(state.favoritePhotos.some(photo => photo.photoId === image.id));
  }, [state.favoritePhotos, image.id]);

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
      const body = favorite
        ? JSON.stringify({
            photoId: image.id,
            alt: image.alt,
            src: image.src.medium,
          })
        : null;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body,
      });

      if (!response.ok) throw new Error('Failed to update favorite status');

      const updatedPhoto = { ...image, id: image.id };

      if (favorite) {
        dispatch({ type: 'ADD_FAVORITE', payload: updatedPhoto });
      } else {
        dispatch({ type: 'REMOVE_FAVORITE', payload: updatedPhoto });
      }
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
