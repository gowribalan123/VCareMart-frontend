import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { FaShoppingCart } from 'react-icons/fa';
import { Button, Card, Typography } from "@material-tailwind/react";
import { ProductSkelton } from "../../components/shared/Skeltons"; 

import { useSelector } from "react-redux"; 

import { useFetch } from "../../hooks/useFetch";

export const ProductDetailsPage = () => {

    const { productId } = useParams();
    console.log("params===", productId);

   /// const [productDetails, setProductDetails] = useState(null);
   // const [isLoading, setIsLoading] = useState(true);
  //  const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { isUserAuth } = useSelector((state) => state.user); // Access authentication state from Redux


    const [productDetails, isLoading, error] = useFetch(`/product/product-details/${productId}`);


    const addToCart = async () => {
        // Check if the user is authenticated
        if (!isUserAuth) {
            navigate("/login", { state: { from: location } }); // Redirect to login with the current location
            return; // Prevent further execution
        }

        setIsAddingToCart(true);
        try {
            await axiosInstance.post("/cart/add-to-cart", { productId });
            toast.success("Product added to cart");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        } finally {
            setIsAddingToCart(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-xl mx-auto px-4 py-8">
                <ProductSkelton /> {/* Display loading skeleton */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-xl mx-auto px-4 py-8">
                <Typography className="text-red-500 text-lg text-center">
                    {error}
                </Typography>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <section className="mb-8">
                <Typography variant="h3" className="text-center font-bold">
                    Product Details
                </Typography>
            </section>
            <Card className="bg-white shadow-lg rounded-lg p-6 mx-auto">
                <Typography variant="h4" className="font-semibold uppercase text-center mb-4">
                    {productDetails?.name}
                </Typography>
                <img 
                    src={productDetails?.image} 
                    alt={productDetails?.name} 
                    className="w-full h-auto object-contain rounded-lg my-4" 
                />
                <Typography className="text-gray-700 mb-2">Description: {productDetails?.description}</Typography>
                <Typography className="text-gray-700">Price: ₹{productDetails?.price?.toFixed(2)}</Typography>
                <Typography className="text-gray-700">Color: {productDetails?.color}</Typography>
                <Typography className="text-gray-700">Age group: {productDetails?.age_group}</Typography>
                <Typography className="text-gray-700">Size: {productDetails?.size}</Typography>
                <Typography className="text-gray-700">Stock: {productDetails?.stock}</Typography>
                <Typography className="text-gray-700">Rating: {productDetails?.rating}</Typography>
            {/**     <Typography className="text-gray-700">Seller: {productDetails?.seller.name}</Typography>*/}
                
                <Button 
                    className={`flex items-center justify-center mt-4 ${isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    color="green" 
                    onClick={addToCart}
                    disabled={isAddingToCart} 
                >
                    <FaShoppingCart className="mr-2" />
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
            </Card>
     {/*      <div className="mt-8">
                <Typography variant="h5" className="font-semibold">Seller Details</Typography>
                <Typography className="text-gray-700">Seller name: {productDetails?.seller.name}</Typography>
                <Typography className="text-gray-700">Email id: {productDetails?.seller.email}</Typography>
            </div>
            */}
        </div>
    );
};
