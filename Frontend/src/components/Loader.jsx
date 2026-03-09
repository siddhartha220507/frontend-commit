import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Loader({ fullScreen = true }) {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: fullScreen ? '100vh' : '100%',
    minHeight: '300px',
    width: '100%',
    position: fullScreen ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    backgroundColor: 'var(--bg-color)',
    zIndex: 9999
  };

  const lottieStyle = {
    width: '350px',
    height: '350px',
    // Apply a CSS filter to dynamically tint the animation Netflix-red (#e50914)
    filter: 'invert(15%) sepia(80%) saturate(6011%) hue-rotate(353deg) brightness(97%) contrast(100%)'
  };

  return (
    <div style={containerStyle}>
      <div style={lottieStyle}>
        <DotLottieReact
          src="/Loading.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}

export default Loader;
