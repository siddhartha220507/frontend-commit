import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

// A wrapper component to force a cinematic 2.0 second load time 
// while the app actually loads in the background. Then it smoothly blurs and fades out.
function CinematicLoader({ children }) {
    const [showLoader, setShowLoader] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Reset state on every route change
        setShowLoader(true);
        setFadeOut(false);

        // Determine custom delay based on the current route
        // Fast paths get 1s, heavy media paths get 2s
        const isFastRoute = ['/login', '/signup', '/search'].includes(location.pathname);
        const dynamicDelay = isFastRoute ? 1000 : 2000;

        // Enforce the dynamic delay based on user request
        const delayTimer = setTimeout(() => {
            setFadeOut(true); // Trigger the CSS fade/blur animation
            
            // Remove the loader from the DOM completely after the animation finishes (0.8s)
            setTimeout(() => {
                setShowLoader(false);
            }, 800); 
        }, dynamicDelay);

        return () => clearTimeout(delayTimer);
    }, [location.pathname]);

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
            
            {/* The actual App content - Loads immediately in the background */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>

            {/* The Cinematic Loader Overlay */}
            {showLoader && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'var(--bg-color)',
                    zIndex: 99999,
                    transition: 'opacity 0.8s ease-in-out, filter 0.8s ease-in-out', 
                    opacity: fadeOut ? 0 : 1,
                    filter: fadeOut ? 'blur(10px)' : 'blur(0px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pointerEvents: fadeOut ? 'none' : 'auto' // Prevent clicks during fade out
                }}>
                    <Loader fullScreen={false} />
                </div>
            )}
        </div>
    );
}

export default CinematicLoader;
