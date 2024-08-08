import React from 'react';
import ImageCard from './ImageCard';

const ImageList = ({ images }) => {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} /> // Ensure 'image' prop is passed here
      ))}
    </div>
  );
};

export default ImageList;
