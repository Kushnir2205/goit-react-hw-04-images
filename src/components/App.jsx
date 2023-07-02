import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from 'service/imageApi';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';
import Loader from './Loader/Loader';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [showBtn, setShowBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchImages(page, query);
  }, [page, query]);

  const fetchImages = async (page, query) => {
    try {
      setIsLoading(true);
      const { hits, totalHits } = await getImages(query, page);

      if (hits.length === 0) {
        toast.error('No results found. Please try again.');
      } else {
        setImages(prevImages => [...prevImages, ...hits]);
        setShowBtn(page < Math.ceil(totalHits / 12));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = query => {
    setPage(1);
    setQuery(query);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = largeImageUrl => {
    setLargeImageUrl(largeImageUrl);
    setIsModalOpen(true);
  };

  const handleModalClickClose = e => {
    if (e.target.id === 'modal' && isModalOpen) {
      setIsModalOpen(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSubmit} />

      {!!images.length && (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {isLoading && <Loader />}
          {showBtn && <Button handleLoadMore={handleLoadMore} />}
        </>
      )}

      {isModalOpen && (
        <Modal
          largeImageUrl={largeImageUrl}
          onClose={handleModalClose}
          onClickClose={handleModalClickClose}
        />
      )}

      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default App;
