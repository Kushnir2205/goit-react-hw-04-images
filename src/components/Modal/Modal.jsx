import { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div id="modal" onClick={this.props.onClickClose} className={css.Overlay}>
        <div className={css.Modal}>
          <img className={css.Largeimg} src={this.props.largeImageUrl} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
