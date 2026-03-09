import React from "react";

function CastList({ cast }) {
    if (!cast || cast.length === 0) return <p>No cast information available.</p>;

    return (
        <div style={{ margin: '2rem 0' }}>
            <h3>Cast</h3>
            <div className="cast-grid" style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px', marginTop: '1rem'
            }}>
                {cast.slice(0, 10).map((actor) => (
                    <div key={actor.id} className="cast-card" style={{ textAlign: 'center' }}>
                        <img 
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Photo'}
                            alt={actor.name}
                            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>{actor.name}</p>
                        <p style={{ fontSize: '0.8rem', color: '#aaa' }}>{actor.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CastList;
