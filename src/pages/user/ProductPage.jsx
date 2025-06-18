import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { ProductCard } from "../../components/user/Cards";
import { ProductSkelton } from "../../components/shared/Skeltons";
import { Eye, Heart } from "lucide-react";
import { axiosInstance } from "../../config/axiosInstance";

export const ProductPage = () => {
    const [productList, isLoading, error] = useFetch("/product/get-all-products");
    console.log('products===', productList);

    const addToWishlist = async (productId) => {
        try {
            const response = await axiosInstance.post('/wishlist/add-wishlist', { productId });
            if (response.status === 200) {
                alert('Product added to wishlist successfully!');
            }
        } catch (err) {
            console.error('Error adding to wishlist:', err);
            alert('Failed to add product to wishlist.');
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
                        {productList?.map((product) => (
                            <div key={product?._id} className="relative transition-transform transform hover:scale-105">
                                <ProductCard product={product} />
                               
                            </div>
                        ))}
                    </section>
                </>
            )}
        </div>
    );
};
