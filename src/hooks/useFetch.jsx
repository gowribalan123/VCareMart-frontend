import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url, refresh) => {
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true); // Set loading state before fetching
        try {
            const response = await axiosInstance({
                method: "GET",
                url: url,
            });
            setData(response?.data?.data);
        } catch (error) {
            console.log(error);
            setError(error);
        } finally {
            setIsLoading(false); // Ensure loading state is turned off after fetching
        }
    };

    useEffect(() => {
        fetchData();
    }, [url, refresh]); // Add refresh to the dependency array

    return [data, isLoading, error];
};
