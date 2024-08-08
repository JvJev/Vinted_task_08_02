import React, { useState, useEffect, useRef, useContext } from 'react';
import GlobalContext from '../Context/GlobalContext';
import ImageList from '../Components/ImageList';
import '../App.css';
import FavoritePhotos from './FavoritePhotos';

function MainPage() {
  const { images, setImages, currentPage, setCurrentPage } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const lazyLoader = useRef();
  const uniqueImageIds = useRef(new Set());
  const lastImageRef = useRef();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.pexels.com/v1/curated?page=${currentPage}`, {
        headers: {
          Authorization: 'iRjeI3Mfqu4xP2BcMZxJQY0DNYiRO32Ri2ptb5GdvhQoOTuYNMJICWnB',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch images');

      const data = await response.json();
      const uniqueImages = data.photos
        .filter(photo => photo.alt.trim() !== '')
        .filter(photo => !uniqueImageIds.current.has(photo.id) && uniqueImageIds.current.add(photo.id));

      setImages(prev => [...prev, ...uniqueImages]);
      setCurrentPage(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => lazyLoader.current?.disconnect(); // Cleanup observer on unmount
  }, []);

  useEffect(() => {
    if (showFavorites) return; // Don't set up observer if on favorites page
    if (isLoading) return; // Don't observe while loading

    lazyLoader.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchData();
    });

    lastImageRef.current && lazyLoader.current.observe(lastImageRef.current);

    return () => {
      lazyLoader.current?.disconnect(); // Cleanup observer on unmount
    };
  }, [showFavorites, isLoading]); // Dependencies

  return (
    <div className="mainPage">
      <div className="sticky-container">
        <button className="favorites" onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'View Main Page' : 'View Favorites'}
        </button>
      </div>
      {showFavorites ? (
        <FavoritePhotos />
      ) : (
        <>
          <ImageList images={images} />
          <div ref={lastImageRef}></div>
        </>
      )}
    </div>
  );
}

export default MainPage;
