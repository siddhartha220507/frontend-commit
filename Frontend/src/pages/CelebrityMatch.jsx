import React, { useState } from "react";
import axios from "axios";
import { searchPerson, getPersonImages } from "../services/tmdbApi";

function CelebrityMatch() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [celebImages, setCelebImages] = useState([]);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setResult(null);
        setError(null);
        setCelebImages([]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            return alert("Please select an image first");
        }
        
        setLoading(true);
        setError(null);
        setResult(null);
        setCelebImages([]);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const API_BASE = import.meta.env.VITE_BACKEND_URL || "https://moviestrunk-backend-2.onrender.com/api";
            // Send to our backend, which uses Multer and Clarifai
            const response = await axios.post(`${API_BASE}/celebrity`, formData, {
                withCredentials: true
            });

            const matchData = response.data;
            setResult(matchData);
            
            // Fetch TMDB images for the matched celebrity
            if (matchData.name) {
                try {
                    const persons = await searchPerson(matchData.name);
                    if (persons && persons.length > 0) {
                        const personId = persons[0].id;
                        const images = await getPersonImages(personId);
                        
                        if (images && images.length > 0) {
                            setCelebImages(images.slice(0, 3).map(img => `https://image.tmdb.org/t/p/w500${img.file_path}`));
                        } else if (persons[0].profile_path) {
                            setCelebImages([`https://image.tmdb.org/t/p/w500${persons[0].profile_path}`]);
                        }
                    }
                } catch (tmdbErr) {
                    console.error("TMDB Image Fetch Error:", tmdbErr);
                }
            }
            
        } catch (err) {
            console.error("Upload error:", err);
            setError(err.response?.data?.message || "Failed to analyze image. Ensure Clarifai API key is set in backend .env.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Find Your Celebrity Look-Alike!</h2>
            <p style={{ margin: '1rem 0', color: '#aaa' }}>
                Upload a clear photo of your face, and our AI will find the movie star that looks most like you.
            </p>

            <div style={{ background: '#222', padding: '2rem', borderRadius: '8px', marginTop: '2rem' }}>
                <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange}
                        style={{ padding: '10px', background: '#111', color: 'white', borderRadius: '4px' }}
                    />
                    
                    {file && (
                        <div style={{ margin: '1rem 0' }}>
                            <p>Selected: {file.name}</p>
                            <img 
                                src={URL.createObjectURL(file)} 
                                alt="Preview" 
                                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', marginTop: '1rem', border: '3px solid #333' }}
                            />
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{ padding: '12px 20px', background: loading ? '#555' : 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1.1rem', transition: 'background 0.3s' }}
                    >
                        {loading ? 'Analyzing with AI...' : 'Find My Trait'}
                    </button>
                </form>

                {/* Display Results */}
                {error && (
                    <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 0, 0, 0.1)', color: '#ff4d4d', borderRadius: '8px', border: '1px solid #ff4d4d' }}>
                        <p><strong>Error:</strong> {error}</p>
                    </div>
                )}

                {result && (
                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(76, 175, 80, 0.1)', border: '1px solid #4caf50', borderRadius: '8px', animation: 'fadeIn 0.5s ease-in-out' }}>
                        <h3 style={{ color: '#4caf50', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Match Found!</h3>
                        <p style={{ fontSize: '1.4rem', marginBottom: '0.5rem', textTransform: 'capitalize' }}>You look like <strong>{result.name}</strong></p>
                        <p style={{ color: '#aaa' }}>Confidence: <strong style={{ color: 'white' }}>{(result.confidence * 100).toFixed(1)}%</strong></p>

                        {/* Celebrity Images from TMDB */}
                        {celebImages.length > 0 && (
                            <div style={{ marginTop: '2rem' }}>
                                <h4 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.1rem' }}>Pictures of {result.name}</h4>
                                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {celebImages.map((img, index) => (
                                        <div key={index} style={{
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                                            width: '150px',
                                            height: '225px',
                                            border: '2px solid #444',
                                            animation: `fadeInUp 0.5s ease-in-out ${index * 0.15}s forwards`,
                                            opacity: 0
                                        }}>
                                            <img src={img} alt={`${result.name} ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default CelebrityMatch;
