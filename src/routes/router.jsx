import { createBrowserRouter } from "react-router-dom";
import { UserLayout } from "../layout/userLayout";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { ProductPage } from "../pages/user/ProductPage";
import { SignUp } from "../pages/shared/SignUp";
import { Login } from "../pages/shared/Login";
import { ProductDetailsPage } from "../pages/user/ProductDetailsPage";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { Profile } from "../pages/user/Profile";
import { Cart } from "../pages/user/Cart";
import { Orders } from "../pages/user/Orders";
import { ProtectedRoute } from "./ProtectedRoute";

import { SellerLayout } from "../layout/sellerLayout";
import { ProtectedRouteSeller } from "./ProtectedRouteSeller";
import { CreateProduct } from "../pages/seller/CreateProduct";

import {Men} from '../pages/user/Men';
import {Women} from '../pages/user/Women';
import {Boys} from '../pages/user/Boys';
import {Girls} from '../pages/user/Girls';



export const router = createBrowserRouter([
    {
        path: "",
        element: <UserLayout />,
        errorElement: <ErrorPage />,
        children: [
            { path: "", element: <Home /> },
            { path: "signup", element: <SignUp /> },
            { path: "login", element: <Login /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "product", element: <ProductPage /> },
            { path: "product-details/:productId", element: <ProductDetailsPage /> },
            { path: "men", element: <Men /> },
            { path: "women", element: <Women /> },
            { path: "boys", element: <Boys /> },
            { path: "girls", element: <Girls /> },

            {
                element: <ProtectedRoute />,
                path: "user",
                children: [
                    { path: "home", element: <Home/> },
                    { path: "whishlist", element: <h1>Wishlist</h1> },
                    { path: "profile", element: <Profile /> },
                    { path: "cart", element: <Cart /> },
                    { path: "orders", element: <Orders /> },
                    { path: "payment/success", element: <h2>Payment success</h2> },
                ],
            },
        ],
    },
    {
        path: "seller",
        element: <SellerLayout />,
        errorElement: <ErrorPage role="seller" />,
        children: [
            { path: "login", element: <Login role="seller" /> },
            { path: "signup", element: <SignUp role="seller" /> },
        ],
    },
    {
        path: "seller",
        element: <ProtectedRouteSeller />,
        children: [
            { path: "dashboard", element: <h1>Seller Dashboard</h1> },
            { path: "get-all-products", element: <h1>All Products</h1> },
            { path: "profile", element: <h1>Seller Profile page</h1> },
            { path: "create-product", element: <CreateProduct /> },
        ],
    },
    {
        path: "admin",
        element: <SellerLayout />,
        errorElement: <ErrorPage role="admin" />,
        children: [
            { path: "login", element: <Login role="admin" /> },
            { path: "signup", element: <SignUp role="admin" /> },
        ],
    },
]);
