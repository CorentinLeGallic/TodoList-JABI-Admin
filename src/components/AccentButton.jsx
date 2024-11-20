import React from 'react';

// Button with a purple background, customizable through its label, className and id props
const AccentButton = ({ label, handleClick=() => {}, className="", id="" }) => {
  return (
    <button className={"accent-button " + className} id={id} onClick={handleClick}>{label}</button>
  )
}

export default AccentButton;