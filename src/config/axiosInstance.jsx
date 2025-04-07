import axios from "axios";

// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Interceptor to add the token to each request
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken'); // Retrieve the token before each request
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor to handle response errors globally
axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    console.error("API call error:", error); // Log the error for debugging
    // Optionally handle specific error cases here
    return Promise.reject(error);
});
