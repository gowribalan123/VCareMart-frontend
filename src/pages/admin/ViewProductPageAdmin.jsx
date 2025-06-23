import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCard1 } from "../../components/user/Cards";
import { ProductSkelton } from "../../components/shared/Skeltons";
import { toast } from "react-toastify"; 
import { useParams } from "react-router-dom";

export const ViewProductPageAdmin = ({ role }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    
    const { sellerId } = useParams();

    useEffect(() => {
        const handleViewProducts = async () => {
            console.log("Viewing products for seller with ID:", sellerId);
            try {
                const response = await axiosInstance.get(`/product/get-all-products-by-seller/${sellerId}`);
                if (response && response.data && response.data.data) {
                    setProducts(response.data.data);
                    setError(null); // Clear any previous errors

                    if (response.data.data.length === 0) {
                        toast.info("No products added. Please add products.");
                    }
                } else {
                    console.error("Unexpected response structure:", response);
                    setError("Unexpected response structure.");
                }
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.response ? err.response.data.message : err.message);
                setProducts([]); // Reset products to empty on error
            } finally {
                setIsLoading(false); // Set loading state to false after fetching
            }
        };

        handleViewProducts();
    }, [sellerId]); // Fetch products when sellerId changes

    // Handle product deletion
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/product/delete-product/${id}`);
                toast.success("Product removed successfully");
                setProducts(prev => prev.filter(product => product._id !== id)); // Update products state
            } catch (err) {
                console.error("Failed to delete product:", err);
                toast.error("Failed to delete product. Please try again.");
            }
        }
    };

    // Loading state
    if (isLoading) {
        return <ProductSkelton />;
    }

    // Error handling
    if (error) {
        return <div className="text-red-500 text-lg font-semibold">Error: {error}</div>;
    }

    // Render the main component
    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto">
            <section className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-4">Trending Fashion</h1>
                <p className="text-gray-600">Explore our wide range of products.</p>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {products.length === 0 ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"  >
   
    <span className="block sm:inline"> No products found for this seller.</span>
</div>

                ) : (
                    products.map((product) => (
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
        </div>
    );
};
