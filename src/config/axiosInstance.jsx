import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
headers: {
              'Content-Type': 'application/json',
         },
    withCredentials: true,

  ////    body: JSON.stringify({ status }),
      //credentials: "include"
});