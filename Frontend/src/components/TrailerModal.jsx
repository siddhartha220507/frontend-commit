import React, { useState, useEffect } from "react";

function TrailerModal({ isOpen, onClose, trailerUrl }) {
    const [shouldRender, setRender] = useState(isOpen);

    useEffect(() => {
        if (isOpen) setRender(true);
    }, [isOpen]);

    const handleAnimationEnd = () => {
        if (!isOpen) setRender(false);
    };

    if (!shouldRender) return null;

    const handleBackgroundClick = (e) => {
        if (e.target.id === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div id="modal-overlay" className="modal-overlay" onClick={handleBackgroundClick} 
            style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.6)', 
                backdropFilter: 'blur(15px)', 
                display: 'flex', justifyContent: 'center',
                alignItems: 'center', zIndex: 100000,
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}
            onTransitionEnd={handleAnimationEnd}
        >
            <div className="modal-content" style={{
                position: 'relative', width: '90%', maxWidth: '900px',
                backgroundColor: '#000', padding: '0', borderRadius: '12px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                overflow: 'hidden',
                animation: isOpen 
                    ? 'modalPopUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' 
                    : 'modalPopDown 0.3s ease-in forwards'
            }}>
                <button onClick={onClose} style={{
                    position: 'absolute', top: '15px', right: '20px',
                    background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
                    width: '40px', height: '40px', borderRadius: '50%',
                    fontSize: '1.2rem', cursor: 'pointer', zIndex: 10,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(229,9,20,0.8)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                >✖</button>

                {trailerUrl ? (
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                        <iframe
                            src={trailerUrl}
                            title="Trailer"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <div style={{ padding: '4rem', textAlign: 'center', color: 'white' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Trailer Unavailable</h3>
                        <p style={{ color: '#aaa' }}>We couldn't find a trailer for this specific title.</p>
                    </div>
                )}
            </div>
            <style>
                {`
                    @keyframes modalPopUp {
                        0% { transform: scale(0.8) translateY(30px); opacity: 0; }
                        100% { transform: scale(1) translateY(0); opacity: 1; }
                    }
                    @keyframes modalPopDown {
                        0% { transform: scale(1) translateY(0); opacity: 1; }
                        100% { transform: scale(0.8) translateY(30px); opacity: 0; }
                    }
                `}
            </style>
        </div>
    );

}

export default TrailerModal;
