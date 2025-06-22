import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCard1 } from "../../components/user/Cards";
import { ProductSkelton } from "../../components/shared/Skeltons";
import { toast } from "react-toastify"; 

export const ViewProductPage = ({ role }) => {
    const [refreshState, setRefreshState] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [sellerDetails, setSellerDetails] = useState(null);

    // Fetch seller details on component mount
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
    }, []);
 
   useEffect(() => {
    const fetchProducts = async () => {
        let response; // Declare response here
        try {
            if (role === "admin") {
                response = await axiosInstance.get(`/product/get-all-products-by-seller/${sellerDetails._id}`);
            } else if (sellerDetails?._id) {
                response = await axiosInstance.get(`/product/get-all-products-by-seller/${sellerDetails._id}`);
            }

            // Check if response is defined and has data
            if (response && response.data && response.data.data) {
                setProducts(response.data.data);
                setError('');
                
                // Check if no products were returned and show alert
                if (response.data.data.length === 0) {
                    alert("No products added. Please add products.");
                }
            } else {
                // Handle case where response structure is not as expected
                console.error("Unexpected response structure:", response);
                setError("Unexpected response structure.");
            }
        } catch (err) {
            // Handle network or server errors
            console.error("Error fetching products:", err);
            setError(err.response ? err.response.data.message : err.message);
            setProducts([]); // Reset products to empty on error
        }
    };

    fetchProducts();
}, [sellerDetails, refreshState, role]); // Added role to dependencies


    // Handle product deletion
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/product/delete-product/${id}`);
                toast.success("Product removed successfully");
                setRefreshState(prev => !prev); // Refresh the product list
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

    // Seller details loading state
    if (!sellerDetails) {
        return <div>Loading seller details...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto">
            <section className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-4">Trending Fashion</h1>
                <p className="text-gray-600">Explore our wide range of products.</p>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {products.length === 0 ? (
                    <div>No products found for this seller.</div>
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
