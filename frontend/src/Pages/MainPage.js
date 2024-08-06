import React, { useState, useEffect, useRef, useContext } from 'react';
import GlobalContext from '../Context/GlobalContext'; // Context API for global state management
import ImageList from '../Components/ImageList';
import '../App.css';
import FavoritePhotos from './FavoritePhotos';

function MainPage() {
  const { images, setImages, currentPage, setCurrentPage } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false); // State to toggle between pages
  const observer = useRef();
  const uniqueImageIds = useRef(new Set());

  useEffect(() => {
    fetchData();
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.pexels.com/v1/curated?page=${currentPage}`, {
        headers: {
          Authorization: 'iRjeI3Mfqu4xP2BcMZxJQY0DNYiRO32Ri2ptb5GdvhQoOTuYNMJICWnB',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      const filteredImages = data.photos.filter(photo => photo.alt.trim() !== '');
      const uniqueImages = filteredImages.filter(photo => {
        if (uniqueImageIds.current.has(photo.id)) {
          return false;
        } else {
          uniqueImageIds.current.add(photo.id);
          return true;
        }
      });
      setImages(prevImages => [...prevImages, ...uniqueImages]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const lastImageRef = useRef();

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      fetchData();
    }
  };

  useEffect(() => {
    if (isLoading) return;
    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    if (lastImageRef.current) {
      observer.current.observe(lastImageRef.current);
    }
  }, [isLoading]);

  return (
    <div className='mainPage'>
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
