import React from 'react';
import { IoIosMenu  } from "react-icons/io";
import useUsersMenuStore from '../zustand/useUsersMenuStore';

const ToggleUsersMenuButton = () => {

  // Retrieve the toggleMenu function from the users menu Zustand store
  const toggleMenu = useUsersMenuStore(state => state.toggleMenu);

  return (
    <button className='toggle-users-menu-button' onClick={toggleMenu}>
        <IoIosMenu className='toggle-users-menu-icon' />
    </button>
  );
}

export default ToggleUsersMenuButton;