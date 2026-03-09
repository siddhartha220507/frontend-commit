import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/favoriteSlice";

function MovieCard({ movie }) {
    const dispatch = useDispatch();
    const { items } = useSelector(state => state.favorites);
    const { user } = useSelector(state => state.auth);

    const isFavorite = items?.find(item => item.movieId === movie?.id?.toString());

    const poster = movie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    const handleFavorite = (e) => {
        e.preventDefault();
        if (!user) return alert("Please login to add to favorites");

        if (isFavorite) {
            dispatch(removeFromFavorites(movie.id.toString()));
        } else {
            dispatch(addToFavorites({
                movieId: movie.id.toString(),
                title: movie.title,
                posterPath: movie.poster_path
            }));
        }
    };

    return (

        <div className="movie-card" style={{ position: 'relative' }}>

            <div style={{ position: 'relative', overflow: 'hidden' }}>
                <Link to={`/movie/${movie?.id}`}>
                    <img
                        src={poster}
                        alt={movie?.title || "Unknown Movie"}
                        style={{ width: '100%', display: 'block' }}
                    />
                    <div className="movie-card-overlay">
                        <div className="play-button-icon"></div>
                    </div>
                </Link>
            </div>

            <h3 style={{ marginTop: '0.5rem' }}>{movie?.title || "Unknown Title"}</h3>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.5rem 0.5rem' }}>
                <span>⭐ {movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
                <span>{movie?.release_date ? movie.release_date.split('-')[0] : "N/A"}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem 0.5rem' }}>
                <Link to={`/movie/${movie?.id}`} style={{ display: 'inline-block', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    View Details
                </Link>
                <button 
                    onClick={handleFavorite}
                    className={`fav-btn ${isFavorite ? 'active' : ''}`}
                    title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>

        </div>

    )

}

export default MovieCard;