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
import { ProtectedRoute } from "./ProtectedRoute";
import { Categories } from "../pages/user/categories";
import { SellerLayout } from "../layout/sellerLayout";
import { ProtectedRouteSeller } from "./ProtectedRouteSeller";
import { CreateProduct } from "../pages/seller/CreateProduct";
const data={};
export const router = createBrowserRouter([
    {
        path: "",
        element: <UserLayout />,
        errorElement: <ErrorPage  />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "product",
                element: <ProductPage />,
            },
          
            {
                path: "product-details/:productId",
                element: <ProductDetailsPage />,
            },
            {
                element: <ProtectedRoute />,
                path: "user",
                children: [
                    {
                        path: "whishlist",
                      //  element: <h1>Wishlist</h1>,
                    },
                    {
                        path: "profile",
                        element: <h1>Profile page</h1>
                      // element: <Profile />,
                    },
                    {
                        path: "/user/cart",
                       /// element: <h1>My Cart</h1>,
                      // element: <Cart />,
                    },
                    {
                        path: "orders",
                     //  element: <h1> My Orders</h1>,
                   //  element:<Orders/>,
                    },
                    {
                        path: "payment/success",
                      //  element: <h2>Payment success</h2>,
                    },
                ],
            },
        ],
    },
{
    path: "seller",
    element: <SellerLayout />,
    errorElement: <ErrorPage role="seller" />,
    children: [
        {
            path: "login",
            element: <Login role="seller" />,
        },
        {
            path: "signup",
            element: <SignUp role="seller" />,
        },
    ],
},
{
    path:"",
    element: <ProtectedRouteSeller />,
    children: [
        {
            path: "dashboard",
        },
        {
            path: "all-products",
        },
        {
            path: "profile",
            element: <h1>Seller Profile page</h1>
        },
        {
            path: "create-product",
            element: <CreateProduct />,
        },
    ],
},

{
    path: "admin",
    element: <SellerLayout />,
    errorElement: <ErrorPage role="admin" />,
    children: [
        {
            path: "login",
            element: <Login role="admin" />,
        },
        {
            path: "signup",
            element: <SignUp role="admin" />,
        },
    ],
},
]);