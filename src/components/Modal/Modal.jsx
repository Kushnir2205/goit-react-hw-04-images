import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ largeImageUrl, onClickClose, onClose }) => {
  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return (
    <div id="modal" onClick={onClickClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img className={css.Largeimg} src={largeImageUrl} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
