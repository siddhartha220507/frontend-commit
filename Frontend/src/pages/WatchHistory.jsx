import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistory, clearAllHistory } from "../redux/historySlice";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

function WatchHistory() {
    const dispatch = useDispatch();
    const { items, isLoading, isError, message } = useSelector(state => state.history);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(fetchHistory());
        }
    }, [user, dispatch]);

    const handleClearHistory = () => {
        if (window.confirm("Are you sure you want to clear your entire watch history?")) {
            dispatch(clearAllHistory());
        }
    };

    if (!user) {
        return <h2 style={{ padding: '2rem', textAlign: 'center' }}>Please log in to view watch history</h2>;
    }

    if (isLoading) return <Loader />;

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>Watch History</h2>
                {items && items.length > 0 && (
                    <button onClick={handleClearHistory} style={{
                        padding: '8px 16px', background: 'transparent', color: 'red', border: '1px solid red', borderRadius: '4px', cursor: 'pointer'
                    }}>
                        Clear History
                    </button>
                )}
            </div>
            {isError && <p style={{ color: 'red' }}>{message}</p>}

            {items && items.length > 0 ? (
                <div className="movie-grid">
                    {items.map((hist) => (
                        <div key={hist._id} style={{ position: 'relative' }}>
                            <MovieCard movie={{
                                id: hist.movieId,
                                title: hist.title,
                                poster_path: hist.posterPath,
                                vote_average: null,
                                release_date: null
                            }} />
                            <div style={{
                                position: 'absolute', top: '10px', right: '10px',
                                background: 'rgba(0,0,0,0.8)', padding: '5px 10px', borderRadius: '4px', fontSize: '0.8rem', color: '#ccc'
                            }}>
                                {new Date(hist.watchedAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no watch history yet.</p>
            )}
        </div>
    );
}

export default WatchHistory;
