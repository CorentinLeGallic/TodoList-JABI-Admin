import React, { useRef } from 'react';
import useModalStore from '../zustand/useModalStore';

// A dark grey overlay shown over the screen when a modal is opened
const ModalOverlay = ({ children }) => {

    // Retrieve the hideModal function from the modal Zustand store
    const hideModal = useModalStore(state => state.hideModal);

    // Create a reference for the overlay element
    const overlay = useRef();

    // Close the modal if the overlay is clicked
    const handleOverlayClick = (e) => {
        if (e.target === overlay.current) {
            hideModal();
        }
    }

    return (
        <div ref={overlay} className="modal-overlay" onClick={handleOverlayClick}>
            {children}
        </div>
    );
}

export default ModalOverlay;