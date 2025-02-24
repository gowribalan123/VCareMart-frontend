import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Carrousel } from "../../components/user/Carrousel";
import { Card1, Card2, Card3, CardMen, CardWomen, CardBoy, CardGirl, CardShirt, CardKurti, CardPant, CardFrock } from "../../components/user/Cards";
import { useFetch } from "../../hooks/useFetch";
import { ProductCard } from "../../components/user/Cards";
import { ProductSkelton } from "../../components/shared/Skeltons";

export const Home = () => {
  //const [user, setUser] = useState("user");
  //const [isUserAuth, setIsUserAuth] = useState(false);
   const [productList, isLoading, error] = useFetch("/category/get-all-category");
   const [shirtList] = useFetch("/product/get-product-by-subcategory/67a9abdec575e8d5efb0df52");
    const [pantList] = useFetch("/product/get-product-by-subcategory/67b32b581c846ae8c1252a87");
    const [frockList] = useFetch("/product/get-product-by-subcategory/67a9af63c575e8d5efb0df63");
    const [kurtisList] = useFetch("/product/get-product-by-subcategory/67a9acc6c575e8d5efb0df54");
      
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col items-center justify-start px-10 py-10">
            <section className="min-h-96 flex flex-col md:flex-row gap-10 px-4 md:px-20 py-10 w-full bg-gray-50 shadow-lg rounded-lg">
                <div className="w-full md:w-8/12 flex flex-col justify-center">
                    <h1 className="font-bold text-4xl my-5 text-gray-900 transition-transform duration-300 hover:scale-105">
                        Welcome!
                    </h1>
                    <p className="text-xl font-normal text-gray-800 mb-4">
                        Offering a seamless user interface for your shopping ventures, VCare Mart is an e-commerce platform in India. With the advent of online shopping, availing of your required products from your comfort zone has become a hassle-free endeavor. Whether you shop online for clothing, footwear, or accessories, you can find a wide array of options at your fingertips while shopping online from VCare.
                    </p>
                    <Link to="/product">
                        <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-300">
                            Start Shopping
                        </button>
                    </Link>
                </div>
                <div className="w-full md:w-5/12">
                    <img
                        className="w-full rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        src="https://woovina.com/images/2020/07/25/best-ecommerce-website-templates.jpg"
                        alt="A vibrant illustration of e-commerce shopping experience"
                    />
                </div>
            </section>

            <section className="my-16 w-full h-80">
                <Carrousel />
            </section>

            <section className="my-1 w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Fashion By Category</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <Link to="/men">
                        <CardMen />
                    </Link>
                    <Link to="/women">
                        <CardWomen />
                    </Link>
                    <Link to="/girl">
                        <CardGirl />
                    </Link>
                    <Link to="/boy">
                        <CardBoy />
                    </Link>
                </div>
            </section>

            <section className="my-1 w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Fashion by Sub Category</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <Link to="/" onClick={() => scrollToSection('shirts')}>
                        <CardShirt />
                    </Link>
                    <Link to="/" onClick={() => scrollToSection('pants')}>
                        <CardPant />
                    </Link>
                    <Link to="/" onClick={() => scrollToSection('kurtis')}>
                        <CardKurti />
                    </Link>
                    <Link to="/" onClick={() => scrollToSection('frocks')}>
                        <CardFrock />
                    </Link>
                </div>
            </section>
{/**
            <section className="my-8 w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Trending Mobiles</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <Card1 />
                    <Card2 />
                    <Card3 />
                </div>
            </section>
 */}
            <section id="shirts" className="my-8 w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-2">Shirts</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {shirtList?.map((product) => (
                        <div key={product?.subcategoryid} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

            <section id="pants" className="my-8 w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-2">Pants</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {pantList?.map((product) => (
                        <div key={product?.subcategoryid} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>
            <section id="frocks" className="my-8 w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-2">Frocks</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {frockList?.map((product) => (
                        <div key={product?.subcategoryid} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

            <section id="kurtis" className="my-8 w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-2">Kurtis</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                    {kurtisList?.map((product) => (
                        <div key={product?.subcategoryid} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};