import React from 'react';

const Button = ({ children, onClick, variant, className }) => {
  const buttonClass = `btn btn-${variant} ${className || ''}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
