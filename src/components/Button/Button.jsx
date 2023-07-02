import PropTypes from 'prop-types';

const Button = ({ handleLoadMore }) => {
  return (
    <button onClick={handleLoadMore} className="Button">
      Load more
    </button>
  );
};
Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};
export default Button;
