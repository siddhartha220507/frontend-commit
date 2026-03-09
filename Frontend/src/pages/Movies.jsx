import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getMovies } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const newMovies = await getMovies(page);
            if (newMovies?.length === 0) {
                setHasMore(false);
            } else {
                setMovies(prev => {
                    const existingIds = new Set(prev.map(m => m.id));
                    const uniqueNewMovies = newMovies.filter(m => !existingIds.has(m.id));
                    return [...prev, ...uniqueNewMovies];
                });
                setPage(prev => prev + 1);
            }
        } catch (error) {
            console.error("Failed to load infinite scroll movies", error);
            setHasMore(false);
        } finally {
            setInitialLoad(false);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Discover Movies</h2>
            
            {initialLoad ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                    <Loader fullScreen={false} />
                </div>
            ) : (
                <InfiniteScroll
                    dataLength={movies.length}
                    next={fetchMovies}
                    hasMore={hasMore}
                    loader={<Loader fullScreen={false} />}
                    endMessage={
                        <p style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--text-muted)' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <div className="movie-grid">
                        {movies.map((movie, index) => (
                            <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
}

export default Movies;
