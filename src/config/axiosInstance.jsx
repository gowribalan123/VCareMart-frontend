import axios from "axios";


//const token = localStorage.getItem('authToken'); // Retrieve the token from local storage or your authentication logic

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;


export const axiosInstance = axios.create({

    baseURL: `${import.meta.env.VITE_API_URL}/api`,
headers: { 
             //Authorization: `Bearer ${token}`,
             Authorization: `Bearer ${
                getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
              }`,
              'Content-Type': 'application/json',
              Accept: "application/json",
         },
         withCredentials:true,
});