import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAdminMovies, addAdminMovie, deleteAdminMovie, getAllUsers, banUser, deleteUser } from "../services/adminApi";
import Loader from "../components/Loader";

function AdminDashboard() {
    const { user } = useSelector(state => state.auth);
    const [activeTab, setActiveTab] = useState("movies");
    
    // Data states
    const [movies, setMovies] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({ title: '', poster: '', description: '', releaseDate: '', trailer: '', genre: '', category: '' });

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchData();
        }
    }, [user, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "movies") {
                const data = await getAdminMovies();
                setMovies(data);
            } else {
                const data = await getAllUsers();
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setLoading(false);
        }
    };

    // --- Movie Handlers ---
    const handleMovieChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handleAddMovie = async (e) => {
        e.preventDefault();
        try {
            await addAdminMovie(formData);
            setFormData({ title: '', poster: '', description: '', releaseDate: '', trailer: '', genre: '', category: '' });
            fetchData(); // Refresh list
        } catch (error) {
            alert("Failed to add movie");
        }
    };

    const handleDeleteMovie = async (id) => {
        if (window.confirm("Delete this movie?")) {
            await deleteAdminMovie(id);
            fetchData();
        }
    };

    // --- User Handlers ---
    const handleToggleBan = async (id) => {
        try {
            await banUser(id);
            fetchData();
        } catch (error) {
            alert("Failed to update ban status");
        }
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Permanently delete this user?")) {
            await deleteUser(id);
            fetchData();
        }
    };

    if (!user || user.role !== 'admin') {
        return <h2 style={{ textAlign: 'center', padding: '3rem', color: 'red' }}>Access Denied. Admins Only.</h2>;
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #444', paddingBottom: '1rem', marginBottom: '2rem' }}>
                <h2 style={{ marginRight: 'auto' }}>Admin Dashboard</h2>
                <button onClick={() => setActiveTab("movies")} style={{ padding: '8px 16px', background: activeTab === 'movies' ? 'var(--primary-color)' : '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Manage Movies</button>
                <button onClick={() => setActiveTab("users")} style={{ padding: '8px 16px', background: activeTab === 'users' ? 'var(--primary-color)' : '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Manage Users</button>
            </div>

            {loading ? <Loader /> : (
                <>
                    {activeTab === "movies" && (
                        <div>
                            {/* Movie Form */}
                            <div style={{ background: '#222', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
                                <h3>Add Custom Movie</h3>
                                <form onSubmit={handleAddMovie} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                                    <input type="text" name="title" value={formData.title} onChange={handleMovieChange} placeholder="Title" required style={{ padding: '8px' }} />
                                    <input type="text" name="poster" value={formData.poster} onChange={handleMovieChange} placeholder="Poster URL" style={{ padding: '8px' }} />
                                    <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleMovieChange} placeholder="Release Date" style={{ padding: '8px' }} />
                                    <input type="text" name="trailer" value={formData.trailer} onChange={handleMovieChange} placeholder="YouTube Trailer Embed URL" style={{ padding: '8px' }} />
                                    <input type="text" name="genre" value={formData.genre} onChange={handleMovieChange} placeholder="Genre" style={{ padding: '8px' }} />
                                    <input type="text" name="category" value={formData.category} onChange={handleMovieChange} placeholder="Category" style={{ padding: '8px' }} />
                                    <textarea name="description" value={formData.description} onChange={handleMovieChange} placeholder="Description" style={{ gridColumn: 'span 2', padding: '8px', minHeight: '80px' }}></textarea>
                                    <button type="submit" style={{ gridColumn: 'span 2', padding: '10px', background: 'var(--primary-color)', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Movie</button>
                                </form>
                            </div>

                            {/* Movie List */}
                            <h3>Movie Database</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '1rem' }}>
                                {movies.map(movie => (
                                    <div key={movie._id} style={{ background: '#222', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                                        <img src={movie.poster || 'https://via.placeholder.com/200x300'} alt={movie.title} style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '4px' }} />
                                        <h4>{movie.title}</h4>
                                        <button onClick={() => handleDeleteMovie(movie._id)} style={{ padding: '5px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', marginTop: '10px', width: '100%', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "users" && (
                        <div>
                            <h3>Registered Users</h3>
                            <div style={{ marginTop: '1rem', background: '#222', borderRadius: '8px', overflow: 'hidden' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead style={{ background: '#333' }}>
                                        <tr>
                                            <th style={{ padding: '12px' }}>Username</th>
                                            <th style={{ padding: '12px' }}>Email</th>
                                            <th style={{ padding: '12px' }}>Status</th>
                                            <th style={{ padding: '12px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => (
                                            <tr key={u._id} style={{ borderTop: '1px solid #444' }}>
                                                <td style={{ padding: '12px' }}>{u.username}</td>
                                                <td style={{ padding: '12px' }}>{u.email}</td>
                                                <td style={{ padding: '12px', color: u.isBanned ? 'red' : 'green' }}>{u.isBanned ? 'Banned' : 'Active'}</td>
                                                <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                                                    <button onClick={() => handleToggleBan(u._id)} style={{ padding: '5px 10px', background: u.isBanned ? '#444' : 'orange', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                                                        {u.isBanned ? 'Unban' : 'Ban'}
                                                    </button>
                                                    <button onClick={() => handleDeleteUser(u._id)} style={{ padding: '5px 10px', background: 'red', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default AdminDashboard;
