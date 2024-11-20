import React from 'react';
import { FiAlertCircle } from "react-icons/fi";

// An input error, customizable through its props
const InputError = ({ label, showIcon=true, className="", id="" }) => {
  return (
    <div className={'input-error-container ' + className} id={id}>
      {showIcon && <FiAlertCircle className='input-error-circle' />}
      <span className='input-error-circle-label'>{label}</span>
    </div>
  )
}

export default InputError;