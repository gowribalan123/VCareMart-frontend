import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { ProductCard } from "../../components/user/Cards";
import { ProductSkelton } from "../../components/shared/Skeltons";

export const Boys = () => {
    const [productList, isLoading, error] = useFetch("/product/get-product-by-category/67a9a0d58c41ade16a48dc74");
    
    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto bg-gray-100">
            {isLoading ? (
                <ProductSkelton />
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            ) : (
                <>
                    <section className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-blue-600 mb-2">Boy's Fashion</h1>
                        <p className="text-lg text-gray-700 mb-4">Explore the latest trends in boys' fashion and find the perfect outfits for every occasion!</p>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {productList?.map((product) => (
                            <div key={product?.categoryid} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </section>
                </>
            )}
        </div>
    );
};