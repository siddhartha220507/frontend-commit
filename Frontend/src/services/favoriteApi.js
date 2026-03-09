import API from "./api";

export const getFavorites = async () => {
    const response = await API.get("/favorites/");
    return response.data;
};

export const addFavorite = async (movieData) => {
    const response = await API.post("/favorites/add", movieData);
    return response.data;
};

export const removeFavorite = async (movieId) => {
    const response = await API.delete(`/favorites/remove/${movieId}`);
    return response.data;
};
