import React from 'react';

const Button = ({ title, onClick, loading }) => {
  if (loading) {
    return (
      <button type="submit" className="btn disable" onClick={onClick}>
        {title}
      </button>
    );
  }
  return (
    <button type="submit" className="btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
