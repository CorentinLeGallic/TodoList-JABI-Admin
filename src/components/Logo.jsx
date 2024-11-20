import React from 'react';

// The app's logo, customizable through its fontSize, className and id props
const Logo = ({ fontSize, className="", id="" }) => {
  return (
    <span className={'logo ' + className} id={id} style={{ fontSize: fontSize }}>Todo List</span>
  )
};

export default Logo;