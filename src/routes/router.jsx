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
 import {ViewProductPage}  from "../pages/seller/ViewProductPage"
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
import{ViewCategory} from "../pages/admin/ViewCategory";
import{ViewSubCategory} from "../pages/admin/ViewSubCategory";
import{ViewUsers} from "../pages/admin/ViewUsers";
import{ViewSellers} from "../pages/admin/ViewSellers";
import{ViewProductDetailsPage} from "../pages/admin/ViewProductDetailsPage"


import {CreateCategory} from "../pages/seller/CreateCategory";
import {CreateSubCategory} from "../pages/seller/CreateSubCategory";
import {CreateProduct} from "../pages/seller/CreateProduct";
import { AdminLayout } from "../layout/adminLayout";
import { CategoryPage } from "../pages/seller/CategoryPage";
import { SubCategoryPage } from "../pages/seller/SubCategoryPage";
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
        errorElement: <ErrorPage  />,
        children: [
            { path: "", element: <Home /> },
            { path: "signup", element: <SignUp /> },
            { path: "login", element: <Login /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "product", element: <ProductPage /> },


     { path: "Seller_Login", element: <Seller_Login  role="seller" /> },
       // { path: "login", element: <Login  role="seller"  /> },
        { path: "Seller_SignUp", element: <Seller_SignUp role="seller" /> },
       //  { path: "signup", element: <SignUp  role="seller"   /> },
     
            {
        
                element: <ProtectedRouteSeller />,
               
                path: "",
                children: [
                   
                    { path: "/seller/Seller_profile", element: <Seller_profile/> },
                   
                    { path: "/seller/create-product", element: <CreateProduct/> },
                  
                    { path: "/seller/products", element: <ViewProductPage role="seller" /> },
                    { path: "/seller/product-details/:productId", element: <ViewProductDetailsPage /> },
                ],
            },
],
    },
    {
        path: "",
        element:<AdminLayout/>,
        errorElement: <ErrorPage role="admin"/>,
        children: [
            { path: "/", element: <Home /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/login", element: <Login /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
            { path: "/product", element: <ProductPage /> },
       

      

           { path: "Admin_Login", element: <Admin_Login role="admin" /> },
          

            
        {
      
      
         element: <ProtectedRouteAdmin/>,
         path: "admin",
       /// errorElement: <ErrorPage role="admin"/>,
        
        
         children: [
           // { path: "/admin/home", element:  <Home />},
           
               { path: "/admin/Admin_profile", element:  <Admin_profile />},
               { path: "/admin/create-category", element:<CreateCategory/> },
               { path: "/admin/create-subcategory", element:<CreateSubCategory/> },
               
               { path: "/admin/category", element:  <CategoryPage />},
               { path: "/admin/subcategory", element:  <SubCategoryPage/>},
               { path: "/admin/products", element:  <ViewProductPage role="admin" />},
               { path: "/admin/sellers", element:  <ViewSellers />},
               { path: "/admin/users", element:  <ViewUsers/>},
                   
            { path: "/admin/men", element: <Men role="admin"/> },
            { path: "/admin/women", element: <Women  role="admin"/> },
            { path: "/admin/boys", element: <Boys role="admin"/> },
            { path: "/admin/girls", element: <Girls role="admin" /> },

               { path: "/admin/product-details/:productId", element: <ViewProductDetailsPage  /> },


              
              
            ],
        },
    ],
},
]);
