import React,{useState} from "react";
import { useFetch } from "../../hooks/useFetch";
import { ProductCard ,ProductCard1} from "../../components/user/Cards";
import { ProductSkelton } from "../../components/shared/Skeltons";

export const Girls = ({role}) => {
    const [productList, isLoading, error] = useFetch("/product/get-product-by-category/67a9a0b18c41ade16a48dc72");
    
    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto bg-gray-100">
            {isLoading ? (
                <ProductSkelton />
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            ) : (
                <>
                    <section className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-pink-600 mb-2">Girl's Fashion</h1>
                        <p className="text-lg text-gray-700 mb-4">Discover the latest styles and trends for girls!</p>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {productList?.map((product) => (
                            <div key={product?.categoryid} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <ProductCard1 product={product} role={role} />  
                            
                              
                            </div>
                        ))}
                    </section>
                </>
            )}
        </div>
    );
};