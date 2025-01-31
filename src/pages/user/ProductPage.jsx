import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import {ProductCard } from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";
import { ProductSkelton } from "../../components/shared/Skeltons";

export const ProductPage = () => {
    const [productList, isLoading, error] = useFetch("/product/get-all-products");

    

    return (
        <div>
            {isLoading ? (
                 <ProductSkelton />
                
            ) : (
                <div className="flex flex-col items-center justify-start px-20 py-16 ">
                <section>
                    <h1 className="text-2xl font-bold">Product listing page</h1>
                </section>
                <section className="grid grid-rows-3 grid-cols-3  gap-y-10 w-full">
                    {courseList?.map((product, index) => (
                        <ProductCard key={product?._id} product={product} />
                    ))}
                </section>
            </div>
        )}
        
        </div>
    );
};