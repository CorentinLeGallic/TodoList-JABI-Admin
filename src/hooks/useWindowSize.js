import { useCallback, useEffect, useState } from "react";

// Hook that provides the current dimensions of the user's screen
const useWindowSize = () => {
    // Define the initial screen dimensions
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // Update the screen dimensions
    const handleResize = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, [setWindowSize]);

    // Update the screen dimensions when the window is resized
    useEffect(() => {
        window.addEventListener("resize", handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize)
        };
    }, [handleResize]);

    // Return the screen dimensions
    return windowSize;
}

export default useWindowSize;