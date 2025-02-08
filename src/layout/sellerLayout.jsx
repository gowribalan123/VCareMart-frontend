import React from "react";
import { Footer } from "../components/user/Footer";
import { Outlet } from "react-router-dom";
import { SellerHeader } from "../components/seller/SellerHeader";
import { Header } from "../components/seller/Header";

export const SellerLayout = () => {
    const isUserAuth = false;

    return (
        <div>
            {isUserAuth ? <SellerHeader/> : <Header />}

            <div className="min-h-96">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
};