import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../redux/favoriteSlice";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

function Favorites() {
    const dispatch = useDispatch();
    const { items, isLoading, isError, message } = useSelector(state => state.favorites);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(fetchFavorites());
        }
    }, [user, dispatch]);

    if (!user) {
        return <h2 style={{ padding: '2rem', textAlign: 'center' }}>Please log in to view favorites</h2>;
    }

    if (isLoading) return <Loader />;

    return (
        <div style={{ padding: '2rem' }}>
            <h2>My Favorites</h2>
            {isError && <p style={{ color: 'red' }}>{message}</p>}

            {items && items.length > 0 ? (
                <div className="movie-grid">
                    {items.map((fav) => (
                        <MovieCard key={fav._id} movie={{
                            id: fav.movieId,
                            title: fav.title,
                            poster_path: fav.posterPath,
                            // Fallbacks for MovieCard formatting
                            vote_average: null,
                            release_date: null
                        }} />
                    ))}
                </div>
            ) : (
                <p style={{ marginTop: '1rem' }}>You have no favorite movies yet.</p>
            )}
        </div>
    );
}

export default Favorites;
