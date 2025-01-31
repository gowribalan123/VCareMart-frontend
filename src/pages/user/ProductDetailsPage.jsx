import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import toast from "react-hot-toast";

export const ProductDetailsPage = () => {
   const params = useParams();
   const { productId }=params;
    console.log("params===",productId)
    const [ productDetails, setProductDetails,isLoading, error] = useFetch(`/ product/ product-details/${productId}`);

    const handleAddToCart = async () => {
        try {
            const response = await axiosInstance({
                method: "POST",
                url: "/cart/add-to-cart",
                data: { productId },
            });
            toast.success("product added successfully")
        } catch (error) {
            console.log(error);
            toast.error( error?.response?.data?.message || "failed - add to cart");
        }
    };
    const fetchProducts = async () => {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/products/product-details/${productId}`,
            });
            console.log("response====", response);
            setProductDetails(response?.data?.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
             <section>
                <h2 className="text-2xl font-bold">Product Details Page</h2>
            </section>
            <section>
                <h1>{productDetails?.name} </h1>
                <img src={productDetails?.image} alt="" />
                <p>{productDetails?.description} </p>
                <button className="btn btn-success" onClick={handleAddToCart}>add to cart</button>
            </section>
            <div>
                <h1>seller details </h1>
            </div>
        </div>
    );
};