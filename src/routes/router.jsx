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
 
import { Seller_SignUp } from "../pages/seller/Seller_SignUp";
import {Seller_Login} from "../pages/seller/Seller_Login";
import {Seller_profile} from "../pages/seller/Seller_profile";
import {CreateProductForm} from "../components/seller/CreateProductForm";
import {Men} from '../pages/user/Men';
import {Women} from '../pages/user/Women';
import {Boys} from '../pages/user/Boys';
import {Girls} from '../pages/user/Girls';
import Subcategories from "../pages/user/Subcategories";
import { Categories } from "../pages/user/Categories";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { PaymentSuccess } from "../pages/user/PaymentSuccess";

 
import { Admin_Login } from "../pages/admin/Admin_Login";
import { Admin_profile } from "../pages/admin/Admin_profile";
import {CreateCategory} from "../pages/admin/CreateCategory";
import { AdminLayout } from "../layout/adminLayout";
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
           // { path: "Admin_Login", element: <Admin_Login role="admin" /> },
          //  { path: "Seller_Login", element: <Seller_Login  /> },
            //{ path: "Seller_SignUp", element: <Seller_SignUp  /> },
     
          { path: "men", element: <Men /> },
            { path: "women", element: <Women /> },
            { path: "boys", element: <Boys /> },
            { path: "girls", element: <Girls /> },

            {
                element: <ProtectedRoute />,
                path: "user",
                children: [
                    { path: "home", element: <Home/> },
                    
                    { path: "men", element: <Men /> },
                    { path: "women", element: <Women /> },
                    { path: "boys", element: <Boys /> },
                    { path: "girls", element: <Girls /> },
                    { path: "product", element: <ProductPage /> },
                    { path: "product-details/:productId", element: <ProductDetailsPage /> }, 
                    { path: "whishlist", element: <h1>Wishlist</h1> },
                    { path: "profile", element: <Profile /> },
                    { path: "cart", element: <Cart /> },
                    { path: "order", element: <Orders /> },
                    { path: "payment/success", element: <PaymentSuccess/> },
                ],
            },
        ],
    },
    {
        path: "",
        element: <SellerLayout />,
        errorElement: <ErrorPage role="seller" />,
        children: [
            { path: "/seller", element: <Home/> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
        //    { path: "men", element: <Men /> },
          //  { path: "women", element: <Women /> },
          //  { path: "boys", element: <Boys /> },
          //  { path: "girls", element: <Girls /> },
           { path: "product", element: <ProductPage /> },
          //  { path: "product-details/:productId", element: <ProductDetailsPage /> }, 
            { path: "Seller_Login", element: <Seller_Login role="seller" /> },
            { path: "Seller_SignUp", element: <Seller_SignUp role="seller" /> },
           
     
    {
        
        element: <ProtectedRouteSeller />,
       
    
        children: [
           
            { path: "/seller/Seller_profile", element: <Seller_profile/> },
            { path: "/seller/create-product", element: <CreateProductForm/> },
            { path: "/seller/products", element: <ProductPage /> },
        ],
    },
],
    },
    {
        path: "",
        element:<AdminLayout/>,
        errorElement: <ErrorPage role="admin"/>,
        children: [
            { path: "/admin", element: <Home /> },
            { path: "/admin/signup", element: <SignUp /> },
            { path: "/admin/login", element: <Login /> },
            { path: "/admin/about", element: <About /> },
            { path: "/admin/contact", element: <Contact /> },
            { path: "/admin/product", element: <ProductPage /> },
            { path: "/admin/product-details/:productId", element: <ProductDetailsPage /> },


          
          { path: "/admin/men", element: <Men /> },
            { path: "/admin/women", element: <Women /> },
            { path: "/admin/boys", element: <Boys /> },
            { path: "/admin/girls", element: <Girls /> },

            { path: "Admin_Login", element: <Admin_Login role="admin" /> },
          

            
        {
      
      
         element: <ProtectedRouteAdmin/>,
        // path: "",
       /// errorElement: <ErrorPage role="admin"/>,
        
        
         children: [
            { path: "/admin/home", element:  <Home />},
           
               { path: "/admin/Admin_profile", element:  <Admin_profile />},

              { path: "/admin/create-category", element:<CreateCategory/> },
            ],
        },
    ],
},
]);
