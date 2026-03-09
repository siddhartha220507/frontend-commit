import API from "./api";

// Custom Movies
export const getAdminMovies = async () => {
    const response = await API.get("/admin/movies");
    return response.data;
};

export const addAdminMovie = async (movieData) => {
    const response = await API.post("/admin/movie", movieData);
    return response.data;
};

export const updateAdminMovie = async (id, movieData) => {
    const response = await API.put(`/admin/movie/${id}`, movieData);
    return response.data;
};

export const deleteAdminMovie = async (id) => {
    const response = await API.delete(`/admin/movie/${id}`);
    return response.data;
};

// Users
export const getAllUsers = async () => {
    const response = await API.get("/admin/users");
    return response.data;
};

export const banUser = async (id) => {
    const response = await API.put(`/admin/user/ban/${id}`);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await API.delete(`/admin/user/${id}`);
    return response.data;
};
