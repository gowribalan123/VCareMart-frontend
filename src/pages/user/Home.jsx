import React, { useState } from "react";
import { Carrousel } from "../../components/user/Carrousel";
import { Card } from "../../components/user/Cards";
export const Home = () => {
    const [user, setUser] = useState("user");
    const [isUserAuth, setIsUserAuth] = useState(false);

    return (
        <div className="px-20">
            <section className="min-h-96 flex gap-20 px-20 py-10 w-full">
                <div className="w-8/12">
                    <h1 className="font-bold text-4xl my-5  ">Welcome {user} </h1>
                    <p className="text-xl font-normal">
                    Offering a seamless user interface for your shopping ventures, VCare Mart is an e-commerce platform in India. With the advent of online shopping, availing of your required products from your comfort zone has become a hassle-free endeavour. Whether you shop online for clothing, footwear, or accessories, you can find a wide array of options at your fingertips while shopping online from Shopsy. This way, you also have the scope to explore a plethora of choices for you with just a few swipes and clicks. So, your shopping experience can not only become significantly streamlined but also be time-saving and convenient. 
                    </p>
                </div>
                <div className="w-5/12">
                    <img
                        className="w-full"
                        src="https://woovina.com/images/2020/07/25/best-ecommerce-website-templates.jpg"
                        alt="home-image"
                    />
                </div>
            </section>

            <section className="my-16">
                  <Carrousel/>
            </section>

          
            <section className="my-16">
                <Card />
            </section>
        </div>
    );
};