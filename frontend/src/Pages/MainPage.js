// MainPage.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ImageList from '../Components/ImageList';
import '../App.css';

function MainPage() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

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
      setImages(prevImages => [...prevImages, ...filteredImages]);
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
        <Link to="/favorite-photos">
          <button className="favorites">View Favorites</button>
        </Link>
      </div>
      <ImageList images={images} />
      <div ref={lastImageRef}></div>
    </div>
  );
}

export default MainPage;
