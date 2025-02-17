import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { ProductCard } from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from "../../components/shared/Skeltons";

export const Men = () => {
    const [productList, isLoading, error] = useFetch("/product/get-product-by-subcategory/67a9abdec575e8d5efb0df52");
   console.log('products===',productList);
    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto">
            {isLoading ? (
                <ProductSkelton />
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            ) : (
                <>
                    <section className="mb-8">
                        <h1 className="text-2xl font-bold">Product Listing Page</h1>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 w-full">
                    {productList?.map((product, index) => (
                            < ProductCard
                             key={product?.subcategoryid} 
                            product={product} />
                        ))}
                    </section>
                </>
            )}
        </div>
    );
};
