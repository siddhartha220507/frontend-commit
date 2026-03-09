function HeroBanner({ movie, trailerUrl }) {

    const bg = movie?.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : 'https://via.placeholder.com/1920x1080?text=No+Image';

    return (

        <div
            className="hero"
            style={{
                backgroundImage: `url(${bg})`
            }}
        >

            <h1>{movie?.title || movie?.name || "Unknown Title"}</h1>

            <p>{movie?.overview || "Description not available"}</p>

            <button disabled={!trailerUrl}>
                {trailerUrl ? "Watch Trailer" : "Trailer not available"}
            </button>

        </div>

    )

}

export default HeroBanner