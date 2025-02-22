import axios from "axios";

export const axiosInstance = axios.create({

    baseURL: `${import.meta.env.VITE_API_URL}/api`,
headers: { 
             // Authorization: `Bearer ${token}`,
   
              'Content-Type': 'application/json',
         },
         withCredentials:true,
});