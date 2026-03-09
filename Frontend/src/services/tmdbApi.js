import axios from "axios";

const API_KEY = "78fcdafc5be949554a293cc5bcf53498";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbAxios = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    }
});

export const getTrendingMovies = async (page = 1) => {
    const res = await tmdbAxios.get(`/trending/movie/day`, { params: { page } });
    return res.data.results;
};

export const getPopularMovies = async () => {
    const res = await tmdbAxios.get(`/movie/popular`);
    return res.data.results;
};

export const getMovies = async (page = 1) => {
    const res = await tmdbAxios.get(`/discover/movie`, { params: { page } });
    return res.data.results;
};

export const getTVShows = async (page = 1) => {
    const res = await tmdbAxios.get(`/discover/tv`, { params: { page } });
    return res.data.results;
};

export const getPeople = async (page = 1) => {
    const res = await tmdbAxios.get(`/person/popular`, { params: { page } });
    return res.data.results;
};

export const getMovieDetails = async (id) => {
    const res = await tmdbAxios.get(`/movie/${id}`);
    return res.data;
};

export const getTrailer = async (id) => {
    const res = await tmdbAxios.get(`/movie/${id}/videos`);
    const trailers = res.data.results.filter(video => video.type === "Trailer" && video.site === "YouTube");
    return trailers.length > 0 ? trailers[0] : null;
};

export const getCast = async (id) => {
    const res = await tmdbAxios.get(`/movie/${id}/credits`);
    return res.data.cast;
};

export const getSimilarMovies = async (id) => {
    const res = await tmdbAxios.get(`/movie/${id}/similar`);
    return res.data.results;
};

export const searchMulti = async (query, page = 1) => {
    const res = await tmdbAxios.get(`/search/multi`, {
        params: { query, page }
    });
    return res.data.results;
};

export const searchMoviesOnly = async (query, page = 1) => {
    const res = await tmdbAxios.get(`/search/movie`, {
        params: { query, page }
    });
    return res.data.results;
};

export const searchTvOnly = async (query, page = 1) => {
    const res = await tmdbAxios.get(`/search/tv`, {
        params: { query, page }
    });
    return res.data.results;
};

export const searchPerson = async (query) => {
    const res = await tmdbAxios.get(`/search/person`, {
        params: { query }
    });
    return res.data.results;
};

export const getPersonImages = async (id) => {
    const res = await tmdbAxios.get(`/person/${id}/images`);
    return res.data.profiles;
};