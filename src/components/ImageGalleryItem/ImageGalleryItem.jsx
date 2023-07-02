import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ imageUrl, alt, onImageClick }) => {
  const handleClick = () => {
    onImageClick(imageUrl);
  };
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={imageUrl}
        alt={alt}
        width="150"
        onClick={handleClick}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
