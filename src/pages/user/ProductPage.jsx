import React from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCard } from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from "../../components/shared/Skeltons";

export const ProductPage = () => {
    const [productList, isLoading, error] = useFetch("/product/get-all-products");
    console.log('products===', productList);

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
                            <ProductCard
                                key={product?._id}
                                product={product}
                                className="transition-transform transform hover:scale-105"
                            />
                        ))}
                    </section>
                </>
            )}
        </div>
    );
};
