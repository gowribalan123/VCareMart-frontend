import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCard } from "../../components/user/Cards";


export const Men = ({ subcategoryId }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get(`/product/get-all-products?category=men&subcategoryId=${subcategoryId}`);
            setProducts(response.data.data); // Adjust based on your API response structure
           // console.log("adads",response);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch products");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [subcategoryId]);

    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>; // Loading state
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>; // Error state
    }

    return (
        <div className="max-w-screen-lg mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-4">Men's Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} /> // Render each product
                        
                    ))
                ) : (
                    <div className="text-center">No products found in this category.</div>
                )}
            </div>
        </div>
    );
};


