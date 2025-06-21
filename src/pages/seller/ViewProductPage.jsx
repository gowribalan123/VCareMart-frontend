import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCard1 } from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from "../../components/shared/Skeltons";
import { toast } from "react-toastify"; 

export const ViewProductPage = ({ role }) => {
    const [refreshState, setRefreshState] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sellerDetails, setSellerDetails] = useState(null);
   
    // Fetch profile data
    useEffect(() => {
        const fetchSellerDetails = async () => {
            try {
                const response = await axiosInstance.get("/user/profile");
                setSellerDetails(response.data);
            } catch (err) {
                console.error("Error fetching seller details:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSellerDetails();
    },[]);

    console.log("sellerDetails.id", sellerDetails?._id);    

    // Fetch products only if sellerId is available
    const [productList = [], fetchError] = useFetch(
        sellerDetails ?  `/product/get-all-products-by-seller/${sellerDetails?._id}`:null ,
        refreshState
    );

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/product/delete-product/${id}`);
                toast.success("Product removed successfully");
                setRefreshState(prev => !prev);
            } catch (err) {
                console.error("Failed to delete product:", err);
                toast.error("Failed to delete product. Please try again.");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto">
            {isLoading ? (
                <ProductSkelton />
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            ) : (
                <>
                    <section className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-blue-800 mb-4">Trending Fashion</h1>
                        <p className="text-gray-600">Explore our wide range of products.</p>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {productList.length === 0 ? (
                            <div>No products found for this seller.</div>
                        ) : (
                            productList.map((product) => (
                                <ProductCard1
                                    key={product._id}
                                    product={product}
                                    onDelete={handleDelete} 
                                    role={role}
                                    className="transition-transform transform hover:scale-105"
                                />
                            ))
                        )}
                    </section>
                </>
            )}
        </div>
    );
};
