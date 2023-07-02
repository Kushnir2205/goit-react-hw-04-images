import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from 'service/imageApi';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';
import Loader from './Loader/Loader';

export default class App extends Component {
  state = {
    page: 1,
    query: '',
    totalPages: 1,
    images: [],
    isModalOpen: false,
    largeImageUrl: '',
    showBtn: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.fetchImages(page, query);
    }
  }

  fetchImages = async (page, query) => {
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await getImages(query, page);

      if (hits.length === 0) {
        toast.error('No results found. Please try again.');
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          showBtn: page < Math.ceil(totalHits / 12),
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = query => {
    this.setState({
      page: 1,
      query: query,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = largeImageUrl => {
    this.setState({
      largeImageUrl,
      isModalOpen: true,
    });
  };

  handleModalClickClose = e => {
    if (e.target.id === 'modal' && this.state.isModalOpen) {
      this.setState({
        isModalOpen: false,
      });
    }
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  fetchMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />

        {!!images.length && (
          <>
            <ImageGallery
              images={images}
              onImageClick={this.handleImageClick}
            />
            {isLoading && <Loader />}
            {this.state.showBtn && (
              <Button handleLoadMore={this.handleLoadMore} />
            )}
          </>
        )}

        {this.state.isModalOpen && (
          <Modal
            largeImageUrl={this.state.largeImageUrl}
            onClose={this.handleModalClose}
            onClickClose={this.handleModalClickClose}
          />
        )}

        <ToastContainer autoClose={1000} />
      </div>
    );
  }
}
