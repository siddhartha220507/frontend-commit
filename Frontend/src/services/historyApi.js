import API from "./api";

export const getHistory = async () => {
    const response = await API.get("/history/");
    return response.data;
};

export const addHistory = async (movieData) => {
    const response = await API.post("/history/add", movieData);
    return response.data;
};

export const clearHistory = async () => {
    const response = await API.delete("/history/clear");
    return response.data;
};
