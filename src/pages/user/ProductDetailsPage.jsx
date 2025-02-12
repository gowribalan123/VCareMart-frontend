import React, { useEffect, useState } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { FaShoppingCart } from 'react-icons/fa';
import { Button, Card, Typography } from "@material-tailwind/react";
import { ProductSkelton } from "../../components/shared/Skeltons";


export const ProductDetailsPage = () => {
    const { productId} = useParams();
    
    const [productDetails, setProductDetails] = useState({});
    const [sellerData, setSellerData] = useState(null);
    const navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const handleAddToCart = async () => {
        // Check if user is logged in (this is a placeholder; implement your own logic)
       
        setIsAddingToCart(true);
        try {
            await axiosInstance.post(`/cart/add-to-cart/${productId}`);
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
           // console.log("product id",productId)
            setProductDetails(response.data.data);
           // const sellerId = response.data.data.seller.$oid; // Adjust based on your response structure
          //  fetchSellerDetails(sellerId);
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
        return <ProductSkelton/> // Show skeleton while loading
    }

    if (error) {
        return <div className="text-red-500 text-lg font-semibold text-center">{error}</div>;
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
                <Typography className="text-gray-700 mb-2">{productDetails?.description}</Typography>
                <Typography variant="h5" className="font-bold mt-4">
                ₹{productDetails?.price?.toFixed(2)}
                </Typography>
                <Typography className="text-gray-700">Color: {productDetails?.color}</Typography>
                <Typography className="text-gray-700">Age group: {productDetails?.age_group}</Typography>
                <Typography className="text-gray-700">Size: {productDetails?.size}</Typography>
                <Typography className="text-gray-700">Stock: {productDetails?.stock}</Typography>
                <Typography className="text-gray-700">Rating: {productDetails?.rating}</Typography>
                

                <Button 
                    className={`flex items-center justify-center mt-4 ${isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    color="green" 
                    onClick={handleAddToCart}
                    disabled={isAddingToCart} 
                >
                    <FaShoppingCart className="mr-2" />
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
            </Card>
            <div className="mt-8">
                <Typography variant="h5" className="font-semibold">Seller Details</Typography>
                <Typography className="text-gray-700">Seller name  : {productDetails?.seller.name}</Typography>
                <Typography className="text-gray-700">Email id: {productDetails?.seller.email}</Typography>
                <Typography className="text-gray-700">No: of Products: {productDetails?.seller.noofproducts}</Typography>
                <Typography className="text-gray-700">Phone : {productDetails?.seller.phone}</Typography>
                 
            </div>
        </div>
    );
};
