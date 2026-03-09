import { useState, useCallback, useEffect } from "react";
import { searchMulti, searchMoviesOnly, searchTvOnly } from "../services/tmdbApi";
import { debounce } from "../utils/debounce";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchType, setSearchType] = useState('multi'); // multi | movie | tv

    const performSearch = useCallback(
        debounce(async (searchTerm, type) => {
            if (!searchTerm.trim()) {
                setResults([]);
                setLoading(false);
                return;
            }
            try {
                let searchData;
                if (type === 'movie') searchData = await searchMoviesOnly(searchTerm);
                else if (type === 'tv') searchData = await searchTvOnly(searchTerm);
                else searchData = await searchMulti(searchTerm);
                
                // Filter out results that don't have a poster
                setResults(searchData.filter(item => item.poster_path || item.profile_path));
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setLoading(false);
            }
        }, 500)
    , []);

    // Trigger search when searchType changes, if there's a query
    useEffect(() => {
        if (query.trim()) {
            setLoading(true);
            performSearch(query, searchType);
        }
    }, [searchType, query, performSearch]);

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        setLoading(true);
        // performSearch is handled by useEffect to sync query/type correctly
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
            <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Explore Content</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                    type="text" 
                    placeholder="Search for movies, tv shows, people..." 
                    value={query}
                    onChange={handleInputChange}
                    style={{
                        width: '100%', padding: '15px 20px', fontSize: '1.2rem',
                        borderRadius: '30px', border: 'none', background: 'var(--card-bg)', color: 'var(--text-color)',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', outline: 'none', transition: 'box-shadow 0.3s'
                    }}
                />

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '1rem' }}>
                    {['multi', 'movie', 'tv'].map((type) => (
                        <button 
                            key={type}
                            onClick={() => setSearchType(type)}
                            style={{
                                padding: '8px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                                textTransform: 'capitalize', fontWeight: 'bold', transition: 'all 0.3s ease',
                                background: searchType === type ? 'var(--primary-color)' : 'var(--card-bg)',
                                color: searchType === type ? '#fff' : 'var(--text-muted)'
                            }}
                        >
                            {type === 'multi' ? 'All' : type === 'tv' ? 'TV Series' : 'Movies'}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ minHeight: '50vh', position: 'relative' }}>
                {loading ? (
                    <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {results.length > 0 ? (
                            <div className="movie-grid">
                                {results.map((item) => (
                                    <MovieCard key={item.id} movie={item} />
                                ))}
                            </div>
                        ) : (
                            query && (
                                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '3rem' }}>
                                    No results found for "{query}".
                                </p>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;
