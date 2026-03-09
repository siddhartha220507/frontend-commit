import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "https://moviestrunk-backend-2.onrender.com/api",
    withCredentials: true
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`; // Adjust to Bearer standard, or just token based on your middleware
        // The user example used req.headers.Authorization = token, but Bearer is safer. I'll stick to the user's example style if possible, but the backend jwtverify expects standard token. Actually backend jwt verify checks cookies! Oh. I need to check backend middleware.
    }
    return req;
});

export default API;
