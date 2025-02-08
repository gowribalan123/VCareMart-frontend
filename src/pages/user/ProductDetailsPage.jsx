import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { FaShoppingCart } from 'react-icons/fa'; // Importing an icon
import { Button } from "@material-tailwind/react"; // Import Material Tailwind Button

export const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const handleAddToCart = async () => {
        setIsAddingToCart(true);
        try {
            await axiosInstance.post(`/cart/add-to-cart/${productId}`, { productId });
            toast.success("Product added successfully");
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to add to cart");
        } finally {
            setIsAddingToCart(false);
        }
    };

    const fetchProductDetails = async () => {
        try {
            const response = await axiosInstance.get(`/product/product-details/${productId}`);
            setProductDetails(response.data.data);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch product details");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-lg font-semibold text-center">{error}</div>;
    }

    return (
        <div className="max-w-screen-lg mx-auto px-4 py-8">
            <section className="mb-8">
                <h2 className="text-3xl font-bold text-center">Product Details</h2>
            </section>
            <section className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-80 mx-auto">
                <h1 className="text-2xl font-semibold">{productDetails?.name}</h1>
                <img 
                    src={productDetails?.image} 
                    alt={productDetails?.name} 
                    className="w-full h-auto object-contain rounded-lg my-4" 
                />
                <p className="text-gray-700">{productDetails?.description}</p>
                <p className="text-xl font-bold mt-4">${productDetails?.price?.toFixed(2)}</p>
                <Button 
                    className={`flex items-center justify-center mt-4 ${isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    color="green" 
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                >
                    <FaShoppingCart className="mr-2" /> {/* Shopping Cart Icon */}
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
            </section>
            <div className="mt-8">
                <h1 className="text-xl font-semibold">Seller Details</h1>
                {/* Add seller details here if available */}
            </div>
        </div>
    );
};
