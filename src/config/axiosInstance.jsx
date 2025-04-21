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

axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token")
    request.headers.Authorization = `Bearer ${token}`
    return request;
})