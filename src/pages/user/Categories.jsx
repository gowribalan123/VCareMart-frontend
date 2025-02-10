

import React from "react";
import { useFetch } from "../../hooks/useFetch"; // Custom hook for fetching data
import { CardMen } from "../../components/user/Cards"; // Import your CardMen component

export const Categories = () => {
    // Fetch categories from the API
    const [categoryList, isLoading, error] = useFetch("/category/category-details/men");
console.log(categoryList)
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Categories</h2>

                {isLoading ? (
                    <div>Loading...</div> // Loading state
                ) : error ? (
                    <div className="text-red-500 text-lg font-semibold">Error: {error}</div> // Error handling
                ) : (
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {categoryList.map((category) => (
                            <div key={category.id} className="group relative">
                                <CardMen 
                                    name={category.name} 
                                    description={category.description} 
                                    imageSrc={category.image} 
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
