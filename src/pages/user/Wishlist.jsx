import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ProductCard, WishlistCard } from "../../components/user/Cards";
import { ProductSkelton } from "../../components/shared/Skeltons";

export const Wishlist = ({ userId, role }) => {
    const [wishlistItems, isLoading, error] = useFetch('/wishlist/get-wishlist') || []; // Ensure it's an array
    const [wishlistStatus, setWishlistStatus] = useState({});

    useEffect(() => {
        // Initialize wishlist status based on fetched items
        const status = {};
        if (wishlistItems) { // Check if wishlistItems is defined
            wishlistItems.forEach(item => {
                status[item.productId] = true; // Mark as true if in wishlist
            });
        }
        setWishlistStatus(status);
    }, [wishlistItems]);

    const handleWishlistToggle = (productId) => {
        // Toggle wishlist status
        setWishlistStatus(prevStatus => ({
            ...prevStatus,
            [productId]: !prevStatus[productId]
        }));
    };

    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto bg-gray-100">
            {isLoading ? (
                <ProductSkelton />
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            ) : (
                <>
                    <section className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-pink-600 mb-2">Your Wishlist</h1>
                        <p className="text-lg text-gray-700 mb-4">Keep track of your favorite items!</p>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {wishlistItems.length > 0 ? (
                            wishlistItems.map((item) => (
                                <div key={item.productId} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                                    <WishlistCard
                                        product={item} 
                                        role={role} 
                                      
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 text-lg">Your wishlist is empty!</div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
};
