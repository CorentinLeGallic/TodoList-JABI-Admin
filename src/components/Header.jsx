import React from 'react';
import Logo from './Logo'
import DisconnectButton from './DisconnectButton';
import useWindowSize from '../hooks/useWindowSize';
import ToggleUsersMenuButton from './ToggleUsersMenuButton';

const Header = () => {

  // Retrieve the screen width from the useWindowSize hook
  const { width } = useWindowSize();

  return (
    <header>
        <Logo mainFontSize={24} subFontSize={22} id='header-logo' />
        <div id='header-buttons'>
          <DisconnectButton id='header-disconnect-button' />
          {width < 850 && (
            <ToggleUsersMenuButton />
          )}
        </div>
    </header>
  );
}

export default Header;