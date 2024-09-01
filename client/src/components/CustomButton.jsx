import React from 'react';
import PropTypes from 'prop-types'; // Optional: For type-checking
import { useSnapshot } from 'valtio';
import state from '../store';
import { getContrastingColor } from '../config/helpers';

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (!snap.color) return {}; // Handle undefined color case

    if (type === 'filled') {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === 'outline') {
      return {
        borderWidth: '1px',
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
      aria-label={title} // Optional: For accessibility
    >
      {title}
    </button>
  );
};

// Optional: PropTypes for type-checking
CustomButton.propTypes = {
  type: PropTypes.oneOf(['filled', 'outline']).isRequired,
  title: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  handleClick: PropTypes.func,
};

CustomButton.defaultProps = {
  customStyles: '',
  handleClick: () => {},
};

export default CustomButton;
