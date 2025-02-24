import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url, refresh,) => {
  

    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
        //let token = localStorage.getItem('token');
        try {
            const response = await axiosInstance({
                method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                   'Content-Type': 'application/json',
               },
               withCredentials: true, // Include credentials if necessary
                url: url,

               
            });
            console.log("response====", response);
            setTimeout(() => {
                setData(response?.data?.data);
                setIsloading(false);
            }, 1000);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    return [data, isLoading, error];
};