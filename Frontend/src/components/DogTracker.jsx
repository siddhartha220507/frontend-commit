import React, { useState, useEffect } from 'react';

function DogTracker({ isPasswordFocused }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Calculate relative position based on window width/height to move pupils
            const x = (e.clientX / window.innerWidth) * 10 - 5;
            const y = (e.clientY / window.innerHeight) * 10 - 5;
            setMousePos({ x, y });
        };

        if (!isPasswordFocused) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isPasswordFocused]);

    // When password is focused, the dogs "peek"/cover eyes. 
    // We'll simulate this by moving pupils to a specific spot or closing eyes.
    
    const pupilStyle = {
        transform: isPasswordFocused 
            ? `translate(5px, 10px)` // Look down at password
            : `translate(${mousePos.x}px, ${mousePos.y}px)`,
        transition: 'transform 0.1s ease-out'
    };

    const eyeClosedStyle = {
        height: isPasswordFocused ? '2px' : '15px',
        marginTop: isPasswordFocused ? '10px' : '0',
        background: isPasswordFocused ? '#333' : 'white',
        transition: 'all 0.3s ease'
    };

    const DogHead = () => (
        <div style={{ 
            width: '80px', height: '80px', background: '#d2b48c', 
            borderRadius: '50%', position: 'relative', margin: '0 10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)', zIndex: 2
        }}>
            {/* Left Ear */}
            <div style={{ position: 'absolute', top: '0', left: '-5px', width: '30px', height: '40px', background: '#8b4513', borderRadius: '50% 50% 0 0', transform: 'rotate(-20deg)' }}></div>
            {/* Right Ear */}
            <div style={{ position: 'absolute', top: '0', right: '-5px', width: '30px', height: '40px', background: '#8b4513', borderRadius: '50% 50% 0 0', transform: 'rotate(20deg)' }}></div>
            
            {/* Eyes */}
            <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '25px', padding: '0 15px' }}>
                <div style={{ width: '25px', height: '25px', background: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', ...eyeClosedStyle }}>
                    {!isPasswordFocused && <div style={{ width: '10px', height: '10px', background: '#000', borderRadius: '50%', ...pupilStyle }}></div>}
                </div>
                <div style={{ width: '25px', height: '25px', background: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', ...eyeClosedStyle }}>
                    {!isPasswordFocused && <div style={{ width: '10px', height: '10px', background: '#000', borderRadius: '50%', ...pupilStyle }}></div>}
                </div>
            </div>

            {/* Nose/Snout */}
            <div style={{ position: 'absolute', bottom: '10px', left: '20px', width: '40px', height: '25px', background: '#ffebcd', borderRadius: '50%' }}>
                <div style={{ width: '15px', height: '10px', background: '#333', borderRadius: '50%', margin: '0 auto', marginTop: '5px' }}></div>
            </div>
            
            {/* Paws (Peek over edge) */}
            {isPasswordFocused && (
                <>
                    <div style={{ position: 'absolute', bottom: '-15px', left: '15px', width: '20px', height: '25px', background: '#d2b48c', borderRadius: '10px', transition: 'bottom 0.3s' }}></div>
                    <div style={{ position: 'absolute', bottom: '-15px', right: '15px', width: '20px', height: '25px', background: '#d2b48c', borderRadius: '10px', transition: 'bottom 0.3s' }}></div>
                </>
            )}
        </div>
    );

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '-20px', zIndex: 1, position: 'relative' }}>
            <DogHead />
            <DogHead />
        </div>
    );
}

export default DogTracker;
