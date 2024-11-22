import React from 'react';

// The app's logo, customizable through its mainFontSize, subFontSize, className and id props
const Logo = ({ mainFontSize, subFontSize, className="", id="" }) => {
  return (
    <div className={'logo ' + className} id={id}>
      <span className='logo-main' style={{ fontSize: mainFontSize }}>Todo List</span>
      <span className='logo-sub' style={{ fontSize: subFontSize }}>Admin</span>      
    </div>
  )
};

export default Logo;