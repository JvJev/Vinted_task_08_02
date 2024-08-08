import React, { useContext, useEffect } from 'react';
import { FavoritesContext } from '../Context/FavoritesContext';
import './FavoritePhotos.css';

function FavoritePhotos() {
  const { state, dispatch } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchFavoritePhotos = async () => {
      try {
        const response = await fetch('/api/photos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch favorite photos');
        }
        const data = await response.json();
        dispatch({ type: 'SET_FAVORITES', payload: data });
      } catch (error) {
        console.error('Error fetching favorite photos:', error.message);
      }
    };
    fetchFavoritePhotos();
  }, [dispatch]);

  const removeFromFavorites = async (id) => {
    try {
      await fetch(`/api/photos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch({ type: 'REMOVE_FAVORITE', payload: { id } });
    } catch (error) {
      console.error('Error removing favorite photo:', error.message);
    }
  };

  return (
    <div className="favorite-photos">
      <div className="image-grid">
        {state.favoritePhotos.map((photo) => (
          <div key={photo._id} className="image-card">
            <img src={photo.src} alt={photo.alt} className="card-image" />
            <div className="overlay">
              <div className="card-body">
                <h2 className="card-title">{photo.alt}</h2>
                <button onClick={() => removeFromFavorites(photo._id)} className="favorite-button">
                  Remove from Favorites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritePhotos;

