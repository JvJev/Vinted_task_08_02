import React, { useState, useEffect } from 'react';
import { Link } from '../Routes/CustomRouter'; // Update the import path as needed
import './FavoritePhotos.css';

function FavoritePhotos() {
  const [favoritePhotoIds, setFavoritePhotoIds] = useState([]);
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoritePhotos')) || {};
    setFavoritePhotoIds(Object.keys(savedFavorites));
  }, []);

  useEffect(() => {
    const fetchFavoritePhotoDetails = async () => {
      try {
        const photoDetailsPromises = favoritePhotoIds.map(async (photoId) => {
          const response = await fetch(`https://api.pexels.com/v1/photos/${photoId}`, {
            headers: {
              Authorization: 'iRjeI3Mfqu4xP2BcMZxJQY0DNYiRO32Ri2ptb5GdvhQoOTuYNMJICWnB',
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch photo details');
          }
          const data = await response.json();
          return data;
        });
        const photoDetails = await Promise.all(photoDetailsPromises);
        setFavoritePhotos(photoDetails);
      } catch (error) {
        console.error('Error fetching photo details:', error.message);
      }
    };
    fetchFavoritePhotoDetails();
  }, [favoritePhotoIds]);

  const removeFromFavorites = (id) => {
    const favoritePhotos = JSON.parse(localStorage.getItem('favoritePhotos')) || {};
    delete favoritePhotos[id];
    localStorage.setItem('favoritePhotos', JSON.stringify(favoritePhotos));
    setFavoritePhotoIds(Object.keys(favoritePhotos));
  };

  return (
    <div className="favorite-photos">
      <div className="sticky-container">
        <Link to="/">
          <button className="back">Back to Main Page</button>
        </Link>
      </div>
      <div className="image-grid">
        {favoritePhotos.map((photo) => (
          <div key={photo.id} className="image-card">
            <img src={photo.src.medium} alt={photo.alt} className="card-image" />
            <div className="overlay">
              <div className="card-body">
                <h2 className="card-title">{photo.alt}</h2>
                <button onClick={() => removeFromFavorites(photo.id)} className="favorite-button">Remove from Favorites</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritePhotos;
