import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { ShoppingBag } from "lucide-react";

//import ThemeToggle from '../shared/ThemeToggle';

const NavLinks = () => (
    <ul className="flex justify-center items-center gap-5">
        <li>
            <Link to="/" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">Home</Link>
        </li>
        <li>
            <Link to="/men" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">Men</Link>
        </li>
        <li>
            <Link to="/women" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">Women</Link>
        </li>
        <li>
            <Link to="/boys" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">Boys</Link>
        </li>
        <li>
            <Link to="/girls" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">Girls</Link>
        </li>
        <li>
            <Link to="/about" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">About</Link>
        </li>
        <li>
            <Link to="/contact" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">Contact</Link>
        </li>
        <li>
            <Link to="/product" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">Products</Link>
        </li>
        <li>
            <Link to="/login" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">Login</Link>
        </li>
        <li>
            <Link to="/signup" className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">Sign Up</Link>
        </li>
      
    </ul>
);

export const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="flex justify-between items-center p-4 pr-16 h-20 bg-white dark:bg-gray-800 shadow-md">
            <div className="flex items-center gap-3">
                <Link to="/" className="flex items-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-white">VCare</div>
                </Link>
            </div>
            <nav className="hidden md:flex justify-center items-center gap-8" role="navigation">
                <NavLinks />
                <div className="flex justify-center items-center gap-3">
                  {/*  <ThemeToggle/>
                   */}
                    <DarkMode />  
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                        onClick={() => navigate('/signup')}
                        aria-label="Sign up to shop with us"
                    >
                        Shop with Us
                    </button>
              {/*      <li>
        <Link to={'/user/cart'} className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 transition duration-300">
                    <ShoppingBag/>
                </Link>
         </li>   */}
                </div>
            </nav>
            {/* Mobile Menu Button */}
            <button 
                onClick={toggleMobileMenu} 
                className="md:hidden text-gray-700 dark:text-gray-300" 
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
                {isMobileMenuOpen ? 'Close' : 'Menu'}
            </button>
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md md:hidden">
                    <NavLinks />
                </div>
            )}
        </header>
    );
};
