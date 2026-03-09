import React, { useState, useEffect } from 'react';

export const SparklesLogo = () => (
    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15C52 35 65 48 85 50C65 52 52 65 50 85C48 65 35 52 15 50C35 48 48 35 50 15Z" fill="#ffeb3b" stroke="#000" strokeWidth="6" strokeLinejoin="round"/>
        <path d="M30 25C31 32 36 37 43 38C36 39 31 44 30 51C29 44 24 39 17 38C24 37 29 32 30 25Z" fill="#00bcd4" stroke="#000" strokeWidth="4" strokeLinejoin="round"/>
   <path d="M38 52C39 57 43 61 48 62C43 63 39 67 38 72C37 67 33 63 28 62C33 61 37 57 38 52Z" fill="#f48fb1" stroke="#000" strokeWidth="4" strokeLinejoin="round"/>
    </svg>
);

function AuthBlobCharacters({ isPasswordFocused }) {
   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 12 - 6;
       const y = (e.clientY / window.innerHeight) * 12 - 6;
            setMousePos({ x, y });
        };

        if (!isPasswordFocused) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isPasswordFocused]);

  const pupilStyle = {
        transform: isPasswordFocused 
            ? `translate(0px, 0px)`
            : `translate(${mousePos.x}px, ${mousePos.y}px)`,
        transition: 'transform 0.1s ease-out'
    };

    const eyeOpenStyle = {
        width: '16px', height: '16px', 
        background: 'white', 
        borderRadius: '50%', 
        display: 'flex', justifyContent: 'center', alignItems: 'center', 
      position: 'relative',
        transition: 'all 0.3s'
    };

    const eyeClosedStyle = {
        width: '18px', height: '4px', 
       background: '#111', 
        borderRadius: '2px',
        transition: 'all 0.3s'
    };

    const Eye = () => (
        isPasswordFocused ? (
            <div style={eyeClosedStyle}></div>
        ) : (
            <div style={eyeOpenStyle}>
                <div style={{ width: '6px', height: '6px', background: '#000', borderRadius: '50%', ...pupilStyle }}></div>
            </div>
        )
    );

    return (
        <div style={{ position: 'relative', width: '450px', height: '375px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            
            <div style={{ 
                position: 'absolute', width: '120px', height: '270px', background: '#7b3cff', 
                left: '90px', bottom: '0px',
               borderRadius: '12px 12px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '12px', marginTop: '30px', alignItems: 'center' }}>
                    <Eye />
                    <Eye />
                </div>
                <div style={{ width: '18px', height: '9px', background: '#111', borderRadius: '0 0 10px 10px', marginTop: '6px' }}></div>
            </div>

            <div style={{ 
                position: 'absolute', width: '75px', height: '195px', background: '#222', 
                left: '210px', bottom: '0px',
                borderRadius: '6px 6px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '8px', marginTop: '25px' }}>
                    <Eye />
                    <Eye />
                </div>
            </div>

            <div style={{ 
                position: 'absolute', width: '90px', height: '135px', background: '#eab308', 
                left: '285px', bottom: '0px',
               borderRadius: '45px 45px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '8px', marginTop: '30px' }}>
                     {isPasswordFocused ? <div style={eyeClosedStyle}></div> : (
                         <div style={{...eyeOpenStyle, width: '10px', height: '10px'}}>
                             <div style={{ width: '4px', height: '4px', background: '#000', borderRadius: '50%', ...pupilStyle }}></div>
                         </div>
                     )}
                     {isPasswordFocused ? <div style={eyeClosedStyle}></div> : (
                         <div style={{...eyeOpenStyle, width: '10px', height: '10px'}}>
                             <div style={{ width: '4px', height: '4px', background: '#000', borderRadius: '50%', ...pupilStyle }}></div>
                         </div>
                     )}
                </div>
                <div style={{ width: '27px', height: '3px', background: '#111', marginTop: '12px', marginLeft: '-30px' }}></div>
            </div>

            <div style={{ 
                position: 'absolute', width: '240px', height: '120px', background: '#f97316', 
                left: '15px', bottom: '0px', zIndex: 10,
                borderRadius: '120px 120px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '22px', marginTop: '45px', marginLeft: '-45px', alignItems: 'center' }}>
                    {isPasswordFocused ? <div style={eyeClosedStyle}></div> : (
                        <div style={eyeOpenStyle}>
                             <div style={{ width: '7px', height: '7px', background: '#000', borderRadius: '50%', ...pupilStyle }}></div>
                        </div>
                    )}
                    {isPasswordFocused ? <div style={eyeClosedStyle}></div> : (
                        <div style={eyeOpenStyle}>
                             <div style={{ width: '7px', height: '7px', background: '#000', borderRadius: '50%', ...pupilStyle }}></div>
                        </div>
                    )}
                </div>
                <div style={{ width: '18px', height: '9px', background: '#111', borderRadius: '0 0 10px 10px', marginTop: '6px', marginLeft: '-60px' }}></div>
            </div>

        </div>
    );
}

export default AuthBlobCharacters;
