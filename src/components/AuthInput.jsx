import React, { useState } from 'react';
import { IoEyeOutline } from "react-icons/io5";
import InputError from './InputError';

// The authentification text / password input depending on its isSecret prop
const AuthInput = ({ label, value, handleInputChange, placeholder="", error, isSecret=false}) => {

  // Store whether the input is currently visible or not
  const [showInput, setShowInput] = useState(isSecret);

  // Change the input value's visibility when the input reveal button is clicked
  const handleInputReveal = (e) => {
    e.preventDefault();
    setShowInput(!showInput)
  }

  return (
    <div className='auth-input-container'>
      <span className='auth-input-label'>{label}</span>
      <div className='auth-input-wrapper'>
        {showInput ? (
          <input className='auth-input' type="password" value={value} onChange={handleInputChange} placeholder={placeholder} />
        ) : (
          <input className='auth-input' type="text" value={value} onChange={handleInputChange} placeholder={placeholder} />
        )}
        {isSecret && value.length > 0 && (
          <button className='input-reveal-button' onClick={handleInputReveal}>
            <IoEyeOutline className='input-reveal-icon' width={30} />
          </button>
        )}
      </div>
      {error && <InputError label={error} />}
    </div>
  )
}

export default AuthInput;