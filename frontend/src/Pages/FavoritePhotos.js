import React, { useState, useEffect } from 'react';
import { Link } from '../Routes/CustomRouter';
import './FavoritePhotos.css';

function FavoritePhotos() {
  const [favoritePhotos, setFavoritePhotos] = useState([]);

  useEffect(() => {
    const fetchFavoritePhotos = async () => {
      try {
        const response = await fetch('/api/photos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store a JWT token in localStorage
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch favorite photos');
        }
        const data = await response.json();
        setFavoritePhotos(data);
      } catch (error) {
        console.error('Error fetching favorite photos:', error.message);
      }
    };
    fetchFavoritePhotos();
  }, []);

  const removeFromFavorites = async (id) => {
    try {
      await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFavoritePhotos(prev => prev.filter(photo => photo._id !== id));
    } catch (error) {
      console.error('Error removing favorite photo:', error.message);
    }
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
          <div key={photo._id} className="image-card">
            <img src={photo.src} alt={photo.alt} className="card-image" />
            <div className="overlay">
              <div className="card-body">
                <h2 className="card-title">{photo.alt}</h2>
                <button onClick={() => removeFromFavorites(photo._id)} className="favorite-button">Remove from Favorites</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritePhotos;

