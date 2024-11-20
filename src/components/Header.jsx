import React from 'react';
import Logo from './Logo'
import DisconnectButton from './DisconnectButton';

const Header = () => {
  return (
    <header>
        <Logo fontSize={24} id='header-logo' />
        <DisconnectButton id='header-disconnect-button' />
    </header>
  );
}

export default Header;