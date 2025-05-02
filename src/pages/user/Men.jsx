import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { ProductCard1 ,ProductCard} from "../../components/user/Cards";
import { ProductSkelton } from "../../components/shared/Skeltons";

export const Men = ({role}) => {
    const [productList, isLoading, error] = useFetch("/product/get-product-by-category/67a7b4a0431705c43b02804e");
    const [shirtList] = useFetch("/product/get-product-by-subcategory/67a9abdec575e8d5efb0df52");

    const handleRetry = () => {
        // Logic to refetch data
    };

    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto bg-gray-100">
            {isLoading ? (
                <ProductSkelton />
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">
                    Error: {error}
                    <button onClick={handleRetry} className="ml-4 text-blue-600 hover:underline">Retry</button>
                </div>
            ) : (
                <>
                    <section className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-blue-600 mb-2">Men's Fashion</h1>
                        <p className="text-lg text-gray-700 mb-4">Explore the latest trends in men's fashion and find the perfect outfits for every occasion!</p>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {productList?.map((product) => (
                            <div key={product?.categoryid} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                         
                                                      {role === 'admin' ? (
                                                            <ProductCard1 product={product} /> // Render AdminProductCard for admins
                                                        ) : (
                                                            <ProductCard product={product} /> // Render ProductCard for regular users
                                                        )}
                            </div>
                        ))}
                    </section>
 
                </>
            )}
        </div>
    );
};
