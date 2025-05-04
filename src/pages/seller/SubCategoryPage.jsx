import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import { SubCategorySkelton } from "../../components/shared/Skeltons";
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';
import { ProductCard1, SubCategoryCard } from "../../components/user/Cards";

export const SubCategoryPage = ({ role }) => {
    const [refreshState, setRefreshState] = useState(false);
    const [SubCategoryList, isLoading, error, setSubCategoryList] = useFetch("/subcategory/get-all-subcategory", refreshState);
    
    const categoryEndpoints = {
        shirts: "/product/get-product-by-subcategory/680893fdf6d6f0d701ce2d53",
        pants: "/product/get-product-by-subcategory/67b32b581c846ae8c1252a87",
        frocks: "/product/get-product-by-subcategory/6813cfa7542575025778fa7e",
        kurtis: "/product/get-product-by-subcategory/67a9acc6c575e8d5efb0df54",
        sarees: "/product/get-product-by-subcategory/67b32b931c846ae8c1252a89"
    };

    const productLists = Object.fromEntries(
        Object.entries(categoryEndpoints).map(([key, endpoint]) => [key, useFetch(endpoint)])
    );

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this subcategory?");
        if (confirmDelete) {
            try {
                await axiosInstance.delete(`/subcategory/subcategory-delete/${id}`);
                toast.success("SubCategory removed successfully");
                setRefreshState(prev => !prev);
                setSubCategoryList(prev => prev.filter(subcategory => subcategory._id !== id));
            } catch (err) {
                console.error("Failed to delete subcategory:", err);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-start px-4 py-16 max-w-screen-xl mx-auto">
            {isLoading ? (
                <SubCategorySkelton />
            ) : error ? (
                <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
            ) : (
                <>

<section className="my-2 w-full mb-8">
                        
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 text-2xl font-bold text-blue-600 mb-4 text-center"> 
     {Object.keys(productLists).map((key) => (
                                <Link to="/admin/subcategory" key={key} onClick={() => scrollToSection(key)} 
                                className="p-4 border rounded-lg hover:bg-blue-100 transition-colors duration-300"
                                >
                                    <h2 className="text-lg text-blue-600">{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
                                </Link>
                            ))}
                        </div>
                    </section>
                    <section className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-blue-800 mb-4">Trending Fashion</h1>
                        <p className="text-gray-600">Explore our wide range of subcategories.</p>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {SubCategoryList?.map((subcategory) => (
                            <SubCategoryCard
                                key={subcategory?._id}
                                subcategory={subcategory}
                                onDelete={handleDelete}
                                role={role}
                            />
                        ))}
                    </section>
                    
                   

                    <section className="my-1 w-full p-8">
                        <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center ">Fashion by Products</h1>
                    </section>

                    {Object.keys(productLists).map((key) => {
                        const [productList, loading] = productLists[key];
                        return (
                            <section id={key} key={key} className="my-8 w-full">
                                <h1 className="text-2xl font-bold text-blue-600 mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h1>
                                {loading ? (
                                    <SubCategorySkelton />
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                                        {productList?.map((product) => (
                                            <div key={product?.subcategoryid} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                                                <ProductCard1 product={product} role={role} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        );
                    })}
                </>
            )}
        </div>
    );
};
