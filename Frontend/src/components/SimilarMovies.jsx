import React from "react";
import MovieRow from "./MovieRow";

function SimilarMovies({ movies }) {
    if (!movies || movies.length === 0) return null;

    return (
        <div style={{ margin: '2rem 0' }}>
            <MovieRow title="Similar Movies" movies={movies} />
        </div>
    );
}

export default SimilarMovies;
