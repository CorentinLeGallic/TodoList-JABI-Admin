import React from 'react';
import ModalOverlay from './ModalOverlay';
import useModalStore from '../zustand/useModalStore';
import InputError from './InputError';

const FormModal = ({ label, handleSubmit, errors, style={}, className="", id="", children }) => {
    
    // Retrieve the hideModal function from the modal Zustand store
    const hideModal = useModalStore(state => state.hideModal);

    // When the form in submitted, prevent the page refresh and handle the submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    return (
        <ModalOverlay>
            <div className={"form-modal " + className} style={style} id={id}>
                <h2 className="form-modal-title">{label}</h2>
                <hr className="form-modal-separator" />
                <form action="" className="form-modal-form" onSubmit={handleFormSubmit}>
                    {children}
                    {errors.global && <InputError label={errors.global} className='form-modal-global-error' />}
                    <div className="form-modal-actions">
                        <button type="button" onClick={hideModal} className="form-modal-cancel form-modal-action">Annuler</button>
                        <button type="submit" className="form-modal-submit form-modal-action">Valider</button>
                    </div>
                </form>
            </div>
        </ModalOverlay>
    );
}

export default FormModal;