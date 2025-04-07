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
