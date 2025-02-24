import axios from "axios";
const token = localStorage.getItem('authToken'); // Retrieve the token from local storage or your authentication logic
export const axiosInstance = axios.create({

    baseURL: `${import.meta.env.VITE_API_URL}/api`,
headers: { 
             Authorization: `Bearer ${token}`,
   
              'Content-Type': 'application/json',
         },
         withCredentials:true,
});