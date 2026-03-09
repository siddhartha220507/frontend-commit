import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetails, getTrailer, getCast, getSimilarMovies } from "../services/tmdbApi";
import { addToHistory } from "../redux/historySlice";
import TrailerModal from "../components/TrailerModal";
import CastList from "../components/CastList";
import SimilarMovies from "../components/SimilarMovies";
import Loader from "../components/Loader";

function MovieDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const [movieData, trailerData, castData, similarData] = await Promise.all([
                    getMovieDetails(id),
                    getTrailer(id),
                    getCast(id),
                    getSimilarMovies(id)
                ]);
                
                setMovie(movieData);
                setTrailer(trailerData);
                setCast(castData);
                setSimilar(similarData);

                // Add to history if logged in
                if (user && movieData) {
                    dispatch(addToHistory({
                        movieId: movieData.id.toString(),
                        title: movieData.title,
                        posterPath: movieData.poster_path
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch movie details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, dispatch, user]);

    if (loading) return <Loader />;
    if (!movie) return <h2 style={{ textAlign: 'center', marginTop: '5rem' }}>Movie not found</h2>;

    const poster = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <img src={poster} alt={movie.title} style={{ width: '300px', borderRadius: '8px' }} />
                
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h1>{movie.title}</h1>
                    <p style={{ color: '#aaa', margin: '1rem 0' }}>
                        ⭐ {movie.vote_average.toFixed(1)} | {movie.release_date}
                    </p>
                    <p style={{ lineHeight: '1.6' }}>{movie.overview || "Description not available."}</p>
                    
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        style={{ 
                            marginTop: '1.5rem', padding: '10px 20px', 
                            backgroundColor: 'var(--primary-color)', color: 'white', 
                            border: 'none', borderRadius: '4px', cursor: 'pointer',
                            fontSize: '1rem', fontWeight: 'bold'
                        }}
                    >
                        Watch Trailer
                    </button>
                </div>
            </div>

            <TrailerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} trailerUrl={trailerUrl} />
            <CastList cast={cast} />
            <SimilarMovies movies={similar} />
        </div>
    );
}

export default MovieDetails;
