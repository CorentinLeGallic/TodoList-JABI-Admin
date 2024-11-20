import React, { cloneElement } from 'react';
import useModalStore from '../zustand/useModalStore';
import { useTransition } from 'react-spring';

const ModalProvider = ({ children }) => {

    // Retrieve the current modal from the he modal Zustand store
    const modal = useModalStore(state => state.modal);

    // Set up transitions for animating modal elements using react-spring
    const modalTransition = useTransition(modal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {
            duration: 150
        }
    })

  return (
    <>
        {children}
        {modalTransition((style, item) =>
            item && cloneElement(item, { style: { ...item.props.style, ...style } })
        )}
    </>
  );
}

export default ModalProvider;