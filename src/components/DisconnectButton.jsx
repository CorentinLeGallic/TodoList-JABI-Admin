import React from 'react';
import useAuthStore from '../zustand/useAuthStore';
import useWindowSize from '../hooks/useWindowSize';
import { IoMdPower } from "react-icons/io";

const DisconnectButton = ({ className="", id="" }) => {

    // Retrieve the screen width from the useWindowSize hook
    const { width } = useWindowSize();

    // Retrieve the logOut function from the auth Zustand store
    const logOut = useAuthStore(state => state.logOut);

    // Handle click on the disconnection button
    const handleDisconnection = () => {
        console.log("User is logging out !");
        logOut();
    }

    return (
        <>
            {width >= 850 ? (
                <button className={'disconnect-button ' + className} id={id} onClick={handleDisconnection}>Se déconnecter</button>
            ) : (
                <button className={'responsive-disconnect-button ' + className} id={id} onClick={handleDisconnection}>
                    <IoMdPower className='responsive-disconnect-icon' />
                </button>
            )}
        </>
    )
}

export default DisconnectButton;