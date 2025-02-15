import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Carrousel } from "../../components/user/Carrousel";
import { Card1, Card2, Card3, CardMen, CardWomen, CardBoy, CardGirl } from "../../components/user/Cards";

export const Home = () => {
    const [user, setUser] = useState("user");
    const [isUserAuth, setIsUserAuth] = useState(false);

    const toggleAuth = () => {
        setIsUserAuth(!isUserAuth);
        setUser(isUserAuth ? "user" : "Authenticated User");
    };

    return (
        <div className="flex flex-col items-center justify-start px-10 py-10">
            <section className="min-h-96 flex flex-col md:flex-row gap-10 px-4 md:px-20 py-10 w-full bg-gray-50 shadow-lg rounded-lg">
                <div className="w-full md:w-8/12 flex flex-col justify-center">
                    <h1 className="font-bold text-4xl my-5 text-gray-900 transition-transform duration-300 hover:scale-105">
                        Welcome !
                    </h1>
                    <p className="text-xl font-normal text-gray-800 mb-4">
            Offering a seamless user interface for your shopping ventures, VCare Mart is an e-commerce platform in India. With the advent of online shopping, availing of your required products from your comfort zone has become a hassle-free endeavor. Whether you shop online for clothing, footwear, or accessories, you can find a wide array of options at your fingertips while shopping online from VCare  ......................    </p>
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
                <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Fashion</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <CardMen />
                    <CardWomen />
                    <CardGirl />
                    <CardBoy />
                </div>
            </section>
            <section className="my-8 w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Trending Mobiles</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <Card1 />
                    <Card2 />
                    <Card3 />
                </div>
            </section>

          
        </div>
    );
};