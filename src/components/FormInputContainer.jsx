import React from 'react';
import InputError from './InputError';

// Provide a styled label and error message, customizable through its label, className and id props
const FormInputContainer = ({ label, error, className="", id="", children }) => {
    return (
        <div className={'form-input-container ' + className} id={id}>
            <span className='form-input-label'>{label} :</span>
            {children}
            {error && <InputError label={error} />}
        </div>
    );
}

export default FormInputContainer;