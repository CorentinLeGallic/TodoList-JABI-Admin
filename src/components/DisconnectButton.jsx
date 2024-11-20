import React from 'react';
import useAuthStore from '../zustand/useAuthStore';

const DisconnectButton = ({ className="", id="" }) => {

    // Retrieve the logOut function from the auth Zustand store
    const logOut = useAuthStore(state => state.logOut);

    // Handle click on the disconnection button
    const handleDisconnection = () => {
        console.log("User is logging out !");
        logOut();
    }

    return (
        <button className={'disconnect-button ' + className} id={id} onClick={handleDisconnection}>Se déconnecter</button>
    )
}

export default DisconnectButton;