import { Link , useNavigate} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
 


export const ProductCard1 = ({ product,onDelete ,role}) => {
  // console.log("productCard=====", product);
   const navigate = useNavigate();

    // Determine the correct path based on the user's role
    const detailsPath = role === 'seller' 
        ? `/seller/product-details/${product?._id}` 
        : role === 'admin' 
        ? `/admin/product-details/${product?._id}` 
        : `/product-details/${product?._id}`; // Default path if role is neither
   return (
       <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
           <figure>
               <img 
                   src={product?.image} 
                   alt={product?.name} 
                   className="h-64 w-full object-cover" // Adjust height for better aspect ratio
               />
           </figure>
           <div className="card-body p-4">
               <h2 className="card-title text-lg font-semibold text-gray-800 uppercase">{product?.name}</h2>
               <p className="text-gray-600 text-xl font-bold"> ₹{product?.price.toFixed(2)}</p>
               <div className="card-actions justify-end mt-4">
                   <Link to={detailsPath}>
                       <button className="btn btn-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                           More Details
                       </button>
                       </Link>
      {/* Show delete button only to sellers and admins */}
      {(role === 'seller' || role === 'admin') && (
                        <button 
                            className="m-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg mt-2"
                            onClick={() => onDelete(product._id)}
                        >
                            Delete
                        </button>
                    )}
               </div>
           </div>
       </div>
   );
};
 
 

 

export const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage
    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

    // Update localStorage whenever wishlist changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Add product to wishlist
    const addToWishlist = async (productId) => {
        try {
            const response = await axiosInstance.post('/wishlist/add-wishlist', { productId });
            if (response.status === 200) {
                setWishlist([...wishlist, product]); // Update local state
                alert('Product added to wishlist successfully!');
            }
        } catch (err) {
            console.error('Error adding to wishlist:', err);
            alert('Failed to add product to wishlist.');
        }
    };

    // Remove product from wishlist
    const removeFromWishlist = async (productId) => {
        try {
            const response = await axiosInstance.delete('/wishlist/delete-wishlist', { data: { productId } });
            if (response.status === 200) {
                setWishlist(wishlist.filter((item) => item._id !== productId)); // Update local state
                alert('Product removed from wishlist successfully!');
            }
        } catch (err) {
            console.error('Error removing from the wishlist:', err);
            alert('Failed to remove product from wishlist.');
        }
    };

    // Check if product is in wishlist
    const isProductInWishlist = (product) => {
        return wishlist.some((item) => item._id === product._id);
    };

    return (
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
            <figure>
                <img 
                    src={product?.image} 
                    alt={product?.name} 
                    className="h-64 w-full object-cover"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold text-gray-800 uppercase">{product?.name}</h2>
                <p className="text-gray-600 text-xl font-bold"> ₹{product?.price}</p>
                <div className="card-actions justify-end mt-4">
                    <Link to={`/product-details/${product?._id}`}>
                        <button className="btn btn-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                            More Details
                        </button>
                    </Link>
                    <button 
                        className={`m-2 transition duration-300 ease-in-out`}
                        onClick={() => isProductInWishlist(product) ? removeFromWishlist(product._id) : addToWishlist(product._id)}
                    >
                        {isProductInWishlist(product) ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-red-600" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};


export const WishlistCard = ({product}) => {
  const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from localStorage
    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
            setWishlist(JSON.parse(storedWishlist));
        }
    }, []);

    // Update localStorage whenever wishlist changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

  
   
    

    // Check if product is in wishlist
    const isProductInWishlist = (product) => {
        return wishlist.some((item) => item._id === product._id);
    };

    return (
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
            <figure>
                <img 
                    src={product?.image} 
                    alt={product?.name} 
                    className="h-64 w-full object-cover"
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold text-gray-800 uppercase">{product?.name}</h2>
                <p className="text-gray-600 text-xl font-bold"> ₹{product?.price}</p>
                <div className="card-actions justify-end mt-4">
                    <Link to={`/product-details/${product?._id}`}>
                        <button className="btn btn-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                            More Details
                        </button>
                    </Link>
                   
                </div>
            </div>
        </div>
    );
};



export const CategoryCard = ({ category, onDelete }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        // Navigate based on category ID
        switch (category?.name) {
            case 'men':
                navigate('/admin/men');
                break;
            case 'women':
                navigate('/admin/women');
                break;
            case 'girls':
                navigate('/admin/girls');
                break;
            case 'boys':
                  navigate('/admin/boys');
                  break;
            default:
                navigate('/admin/category'); // Fallback if no match
        }
    };

    return (
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
            <figure>
                <img 
                    src={category?.image} 
                    alt={category?.name} 
                    className="h-64 w-full object-cover" // Adjust height for better aspect ratio
                />
            </figure>
            <div className="card-body p-4">
                <h2 className="card-title text-lg font-semibold text-gray-800 uppercase">{category?.name}</h2>
                <button 
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg mt-2"
                    onClick={() => onDelete(category._id)}
                >
                    Delete
                </button>
                <button 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg mt-2 ml-2"
                    onClick={handleNavigate}
                >
                   View
                </button>
            </div>
        </div>
    );
};

export const SubCategoryCard = ({ subcategory, onDelete  }) => {
  
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate based on category ID
    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
      }
  };
  }

  return (
      <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
          <figure>
              <img 
                  src={subcategory?.image} 
                  alt={subcategory?.name} 
                  className="h-64 w-full object-cover" // Adjust height for better aspect ratio
              />
          </figure>
          <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold text-gray-800 uppercase">{subcategory?.name}</h2>
              <button 
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg mt-2"
                onClick={() => onDelete(subcategory._id)}
            >
                Delete
            </button>

          
          </div>
      </div>
  );
};

export const Card1 =  () => {
    //console.log("productCard=====", product);
  //  const navigate = useNavigate();

    return (
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
  <div className="relative p-2.5 h-80 overflow-hidden rounded-xl bg-clip-border">
    <img
      src=" https://m.media-amazon.com/images/I/61oCISLE+PL._SL1500_.jpg"
      alt="card-image"
      className="h-80 w-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
    />
  </div>
  <div className="p-4">
    <div className="mb-2 flex items-center justify-between">
      <p className="text-slate-800 text-xl font-semibold">
      Apple AirPods 4
      </p>
      <p className="text-cyan-600 text-xl font-semibold">
      ₹12,764
      </p>
    </div>
    <p className="text-slate-600 leading-normal font-light">
    Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones, Personalised Spatial Audio, Sweat and Water Resistant, USB-C Charging Case, H2 Chip, Up to 30 Hours...
    </p>
    <button className="rounded-md w-full mt-6 bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
      Add to Cart
    </button>
  </div>
</div>
    );
};
export const Card2 = () => {
  //console.log("productCard=====", product);
//  const navigate = useNavigate();

  return (
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
<div className="relative p-2.5 8-70 overflow-hidden rounded-xl bg-clip-border">
  <img
    src="https://th.bing.com/th/id/OIP.jmopLE8O2WCCTBcM_2SuNQHaJQ?rs=1&pid=ImgDetMain"
    alt="card-image"
    className="h-75 w-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
  />
</div>
<div className="p-4">
  <div className="mb-2 flex items-center justify-between">
    <p className="text-slate-800 text-xl font-semibold">
      Galaxy M15 5G
    </p>
    <p className="text-cyan-600 text-xl font-semibold">
    ₹ 10,999.00
    </p>
  </div>
  <p className="text-slate-600 leading-normal font-light">
  Samsung Galaxy M15 5G Prime Edition (Blue Topaz,4GB RAM,128GB Storage) | Super AMOLED Display| 50MP Triple Cam| 6000mAh Battery| MediaTek Dimensity 6100+
  </p>
  <button className="rounded-md w-full mt-6 bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
    Add to Cart
  </button>
</div>
</div>
  );
};
export const Card3 = () => {
  ///console.log("productCard=====", product);
//  const navigate = useNavigate();

  return (
      <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
<div className="relative p-2.5 h-80 overflow-hidden rounded-xl bg-clip-border">
  <img
    src="https://static.toiimg.com/photo/68391270.cms?imgsize=115476"
    alt="card-image"
    className="h-80 w-full object-cover rounded-md transition-transform duration-300 hover:scale-105"
  />
</div>
<div className="p-4">
  <div className="mb-2 flex items-center justify-between">
    <p className="text-slate-800 text-xl font-semibold">
    boAt Rockerz 480
    </p>
    <p className="text-cyan-600 text-xl font-semibold">
    ₹1,799 
    </p>
  </div>
  <p className="text-slate-600 leading-normal font-light">
  boAt Rockerz 480 w/RGB LEDs, 6 Light Modes, 40mm Drivers, Beast Mode, 60hrs Playback, ENx Tech, BT v5.3, Adaptive Fit & Easy Access Controls, Bluetooth...

  </p>
  <button className="rounded-md w-full mt-6 bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
    Add to Cart
  </button>
</div>
</div>
  );
};


export const CartCards = ({ item, handleRemove, updateQuantity }) => {
    if (!item) {
        return <div className="text-red-500">Item not available</div>;
    }

    const { productId, quantity } = item; // Assuming item has a quantity property

    const handleIncrease = () => {
        updateQuantity(productId._id, quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            updateQuantity(productId._id, quantity - 1);
        }
    };

    return (
        <div className="flex w-full h-52 items-center gap-6 bg-gray-100 shadow-lg rounded-lg p-4 mb-6 transition-transform transform hover:scale-105">
            <img 
                src={productId.image || "placeholder-image-url.jpg"} 
                alt={productId.name || "cart-item"} 
                className="w-35 h-50 object-cover rounded-md" 
                loading="lazy" 
            />

            <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">Name: {productId.name}</h2>
                <h3 className="text-md font-medium text-gray-600">Price: ₹{productId.price}</h3>
                <h2 className="text-md font-medium text-gray-600">Description: {productId.description}</h2>
                <h3 className="text-md font-medium text-gray-600">Size: {productId.size}</h3>
                <h3 className="text-md font-medium text-gray-600">Stock: {productId.stock}</h3>
                <h3 className="text-md font-medium text-gray-600">Rating: {productId.rating}</h3>
                <h3 className="text-md font-medium text-gray-600">Color: {productId.color}</h3>
                 

                <div className="flex items-center mt-2">
                    <button 
                        className="bg-gray-300 text-black font-bold py-1 px-2 rounded hover:bg-gray-400"
                        onClick={handleDecrease}
                        aria-label={`Decrease quantity of ${productId.name}`}
                    >
                        -
                    </button>
                    <span className="mx-2 text-lg">{quantity}</span>
                    <button 
                        className="bg-gray-300 text-black font-bold py-1 px-2 rounded hover:bg-gray-400"
                        onClick={handleIncrease}
                        aria-label={`Increase quantity of ${productId.name}`}
                    >
                        +
                    </button>
                </div>

              
            </div>

            <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
                onClick={() => handleRemove(productId._id)}
                aria-label={`Remove ${productId.name} from cart`}
            >
                Remove
            </button>
        </div>
    );
};
export const CartCards1 = ({ item, handleRemove }) => {
  if (!item || !item) {
    return <div className="text-red-500">Item not available</div>;
  }

  return (
      <div className="flex w-full h-52 items-center gap-6 bg-gray-100 shadow-lg rounded-lg p-4 mb-6 transition-transform transform hover:scale-105">
          <img 
              src={item.productId.image || "placeholder-image-url.jpg"} 
              alt={item.productId.name || "cart-item"} 
              className="w-35 h-50 object-cover rounded-md" 
              loading="lazy" // Lazy loading for better performance
          />

          <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">Name: {item.productId.name}</h2>
              <h3 className="text-md font-medium text-gray-600">Price: ₹{item.productId.price}</h3>
              <h2 className="text-md font-medium text-gray-600">Description: {item.productId.description}</h2>
              <h3 className="text-md font-medium text-gray-600">Size: {item.productId.size}</h3>
              <h3 className="text-md font-medium text-gray-600">Stock: {item.productId.stock}</h3>
              <h3 className="text-md font-medium text-gray-600">Rating: {item.productId.rating}⭐</h3>
              <h3 className="text-md font-medium text-gray-600">Color: {item.productId.color}</h3>
             
              
          </div>

          <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
              onClick={() => handleRemove(item.productId._id)}
              aria-label={`Remove ${item.productId.name} from cart`}
          >
              Remove
          </button>
      </div>
  );
};

export const CardMen = () => {
  return (
    <Link to="/men" className="relative flex flex-col my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative p-2 h-48 overflow-hidden rounded-lg bg-clip-border">
        <img
          src="https://urbanmenoutfits.com/wp-content/uploads/2018/06/summer-beach-wedding-outfits-male-guests-21.jpg"
          alt="card-image"
          className="h-48 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col items-center">
        <p className="text-slate-800 text-lg font-semibold text-blue-600 mb-1">Men</p>
        <p className="text-slate-600 text-sm text-center">
          Explore the latest trends in men's fashion.
        </p>
      </div>
    </Link>
  );
};

export const CardWomen = () => {
  return (
    <Link to="/women" className="relative flex flex-col my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative p-2 h-48 overflow-hidden rounded-lg bg-clip-border">
        <img
          src="https://media.xogrp.com/images/fca44051-8452-187e-919d-fffef9ae68b9?quality=50"
          alt="card-image"
          className="h-48 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col items-center">
        <p className="text-slate-800 text-lg font-semibold text-blue-600 mb-1">Women</p>
        <p className="text-slate-600 text-sm text-center">
          Discover the latest styles in women's fashion.
        </p>
      </div>
    </Link>
  );
};

export const CardGirl = () => {
  return (
    <Link to="/girls" className="relative flex flex-col g my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative p-2 h-48 overflow-hidden rounded-lg bg-clip-border">
        <img
          src="https://cdn.shopify.com/s/files/1/0346/5021/products/nora-flower-embroidery-strasburg-children-pink-dress-for-girls-floral-ribbon-embroidery-on-handmade-heirloom-dress-dresses-11786980393042_480x.jpg?v=1616876095"
          alt="card-image"
          className="h-48 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col items-center">
        <p className="text-slate-800 text-lg font-semibold text-blue-600 mb-1">Girls</p>
        <p className="text-slate-600 text-sm text-center">
          Find adorable outfits for every occasion.
        </p>
      </div>
    </Link>
  );
};

export const CardBoy = () => {
  return (
    <Link to="/boys" className="relative flex flex-col my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative p-2 h-48 overflow-hidden rounded-lg bg-clip-border">
        <img
          src="https://i.pinimg.com/736x/22/b2/af/22b2af4b7b659ae637d1e55b1ab7cee1.jpg"
          alt="card-image"
          className="h-48 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col items-center">
        <p className="text-slate-800 text-lg font-semibold text-blue-600 mb-1">Boys</p>
        <p className="text-slate-600 text-sm text-center">
          Explore fun and stylish outfits for boys.
        </p>
      </div>
    </Link>
  );
};


export const CardShirt = () => {
  return (
    <Link to="/#shirts" className="relative flex flex-col my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative p-2 h-48 overflow-hidden rounded-lg bg-clip-border">
        <img
          src="http://res.cloudinary.com/dvvacfrz3/image/upload/v1739172830/zwixmhumrgramxfwomf2.jpg"
          alt="card-image"
          className="h-48 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col items-center">
        <p className="text-slate-800 text-lg font-semibold text-blue-600 mb-1">Shirts</p>
        <p className="text-slate-600 text-sm text-center">
          Explore fun and stylish shirts for Men.
        </p>
      </div>
    </Link>
  );
};

export const CardPant = () => {
  return (
    <Link to="/#pants" className="relative flex flex-col my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative p-2 h-48 overflow-hidden rounded-lg bg-clip-border">
        <img
          src="http://res.cloudinary.com/dvvacfrz3/image/upload/v1739795288/jfqd23gwoxr6spcjoqjr.jpg"
          alt="card-image"
          className="h-48 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col items-center">
        <p className="text-slate-800 text-lg font-semibold text-blue-600 mb-1">Pants</p>
        <p className="text-slate-600 text-sm text-center">
          Explore fun and stylish pants for Men.
        </p>
      </div>
    </Link>
  );
};



export const CardFrock = () => {
  return (
    <Link to="/#frocks" className="relative flex flex-col my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative p-2 h-48 overflow-hidden rounded-lg bg-clip-border">
        <img
          src="http://res.cloudinary.com/dvvacfrz3/image/upload/v1739173732/unjo2veoojeorckr1p91.jpg"
          alt="card-image"
          className="h-48 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col items-center">
        <p className="text-slate-800 text-lg font-semibold text-blue-600 mb-1">Frocks</p>
        <p className="text-slate-600 text-sm text-center">
          Explore fun and stylish frocks for Girls.
        </p>
      </div>
    </Link>
  );
};

export const CardKurti = () => {
  return (
    <Link to="/#kurtis" className="relative flex flex-col my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative p-2 h-48 overflow-hidden rounded-lg bg-clip-border">
        <img
          src="http://res.cloudinary.com/dvvacfrz3/image/upload/v1739173063/ossdrogzbth4fxquqqgp.jpg"
          alt="card-image"
          className="h-48 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col items-center">
        <p className="text-slate-800 text-lg font-semibold text-blue-600 mb-1">Kurti</p>
        <p className="text-slate-600 text-sm text-center">
          Explore fun and stylish kurtis for Women.
        </p>
      </div>
    </Link>
  );
};
export const CardSaree = () => {
  return (
    <Link to="/#Sarees" className="relative flex flex-col my-1 bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative p-2 h-48 overflow-hidden rounded-lg bg-clip-border">
        <img
          src="http://res.cloudinary.com/dvvacfrz3/image/upload/v1739795347/qdoqwrauyc30bxd5kjsa.jpg"
          alt="card-image"
          className="h-48 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-3 flex flex-col items-center">
        <p className="text-slate-800 text-lg font-semibold text-blue-600 mb-1">Saree</p>
        <p className="text-slate-600 text-sm text-center">
          Explore fun and stylish Sarees for Women.
        </p>
      </div>
    </Link>
  );
};

export const CardMenDetails = ({ products }) => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
              <ProductCard key={product._id} className="p-4">
                  <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-auto object-cover" 
                  />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">Price: ₹{product.price.toFixed(2)}</p>
                  <p className="text-gray-500">{product.description}</p>
              </ProductCard>
          ))}
      </div>
  );
};export const UserCard1 = ({ item, handleRemove }) => {
  if (!item) {
    return <div className="text-red-500">Item not available</div>;
  }

  return (
      <div className="flex w-full h-52 items-center gap-6 bg-gray-100 shadow-lg rounded-lg p-4 mb-6 transition-transform transform hover:scale-105">
          <img 
              src={item.image || "placeholder-image-url.jpg"} 
              alt={item.name || "User"} 
              className="w-35 h-50 object-cover rounded-md" 
              loading="lazy"
          />
 
          <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">Name: {item.name || "Unnamed User"}</h2>
              <p className="text-gray-600">Email: {item.email || "No email provided"}</p>
          </div>

          <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
              onClick={() => handleRemove(item._id)}
              aria-label={`Remove ${item.name || "user"} from list`}
          >
              Remove
          </button>
      </div>
  );
};
 

export const UserCard = ({ user, handleRemove }) => {
  
  const navigate = useNavigate();

  return (
      <div className="card bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
          <figure>
              <img 
                  src={user?.image || "placeholder-image-url.jpg"} 
                  alt={user?.name || "User Image"} 
                  className="h-64 w-full object-cover" // Adjust height for better aspect ratio
              />
          </figure>
          <div className="card-body p-4">
              <h2 className="card-title text-lg font-semibold text-gray-800 uppercase">{user?.name || "Unnamed User"}</h2>
              <div className="card-actions justify-end mt-4">
                  <button 
                      className="btn btn-danger bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                      onClick={() => handleRemove(user?._id)}
                  >
                      Remove User
                  </button>
                  <button 
                      className="btn btn-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                      onClick={() => navigate(`/user-details/${user?._id}`)}
                  >
                      More Details
                  </button>
              </div>
          </div>
      </div>
  );
}
 

 
 

export const UserCard2 = ({ user, onRemove, onUpdate, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = () => {
        onUpdate(editedUser);
        setIsEditing(false);
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            onRemove(user._id);
        }
    };

   return (
    <div className="flex border border-gray-300 rounded-lg p-6 bg-white shadow-lg transition-transform transform hover:scale-105">
        <div className="flex-shrink-0 w-1/3">
            <img src={user.image} alt={`${user.name}'s profile`} className="w-full h-auto rounded-full mb-4" />
          
        {/**    <button 
                className="bg-red-600 hover:bg-red-700 text-white px-10 py-1.5 rounded-lg transition duration-200" 
                onClick={handleDelete}
            >
                Delete
            </button>
*/} 
            <button 
                onClick={() => onToggle(user._id, user.isActive)} 
                className={`mt-2 px-4 py-2 rounded ${user.isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
                {user.isActive ? 'Deactivate' : 'Activate'}
            </button>
        </div>
        <div className="w-2/3 pl-4">
            <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
            <ul className="mt-4 text-gray-600">
                <li>Email: <span className="font-medium">{user.email}</span></li>
                {user.phone && <li>Phone: <span className="font-medium">{user.phone}</span></li>}
                {user.role && <li>Role: <span className="font-medium">{user.role}</span></li>}
                <li>Status: <span className={`font-semibold text-${user.isActive ? 'green' : 'red'}-500`}>{user.isActive ? 'ACTIVE' : 'INACTIVE'}</span></li>
                <li>Date of Birth: <span className="font-medium">{new Date(user.dob).toLocaleDateString()}</span></li>
                <li>Shipping Address: <span className="font-medium">{user.shippingaddress}</span></li>
            </ul>
        </div>

        {isEditing && (
            <div className="modal">
                <div className="modal-content">
                    <h2>Edit User</h2>
                    <label>
                        Name:
                        <input type="text" name="name" value={editedUser.name} onChange={handleEditChange} className="border rounded p-1" />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" value={editedUser.email} onChange={handleEditChange} className="border rounded p-1" />
                    </label>
                    <label>
                        Phone:
                        <input type="text" name="phone" value={editedUser.phone} onChange={handleEditChange} className="border rounded p-1" />
                    </label>
                    <label>
                        Role:
                        <input type="text" name="role" value={editedUser.role} onChange={handleEditChange} className="border rounded p-1" />
                    </label>
                    <div className="flex justify-between mt-4">
                        <button 
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg transition duration-200"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button 
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition duration-200"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
);

};


 


 

 

export const SellerCard2 = ({ user, onRemove, onUpdate, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSave = () => {
        // Add validation here if needed
        onUpdate(editedUser);
        setIsEditing(false);
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            onRemove(user._id);
        }
    };

  

    return (
        <div className="flex border border-gray-300 rounded-lg p-6 bg-white shadow-lg transition-transform transform hover:scale-105">
            <div className="flex-shrink-0 w-1/3">
                <img src={user.image} alt={`${user.name}'s profile`} className="w-full h-auto rounded-full mb-4" />
                <button 
                    onClick={() => onToggle(user._id, user.isActive)} 
                    aria-label={user.isActive ? 'Deactivate user' : 'Activate user'}
                    className={`mt-2 px-4 py-2 rounded ${user.isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
                >
                    {user.isActive ? 'Deactivate' : 'Activate'}
                </button>

                <Link to={`/admin/products/${user?._id}`}>
                    <button 
                       
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        View Products
                    </button> 
                </Link>
            </div>
            
            <div className="w-2/3 pl-4">
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <ul className="mt-4 text-gray-600">
                    <li>Email: <span className="font-medium">{user.email}</span></li>
                    {user.phone && <li>Phone: <span className="font-medium">{user.phone}</span></li>}
                    {user.role && <li>Role: <span className="font-medium">{user.role}</span></li>}
                    <li>Status: <span className={`font-semibold text-${user.isActive ? 'green' : 'red'}-500`}>{user.isActive ? 'ACTIVE' : 'INACTIVE'}</span></li>
                    <li>Date of Birth: <span className="font-medium">{new Date(user.dob).toLocaleDateString()}</span></li>
                    <li>Shipping Address: <span className="font-medium">{user.shippingaddress}</span></li>
                </ul>
            </div>

            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit User</h2>
                        <label>
                            Name:
                            <input type="text" name="name" value={editedUser.name} onChange={handleEditChange} className="border rounded p-1" />
                        </label>
                        <label>
                            Email:
                            <input type="email" name="email" value={editedUser.email} onChange={handleEditChange} className="border rounded p-1" />
                        </label>
                        <label>
                            Phone:
                            <input type="text" name="phone" value={editedUser.phone} onChange={handleEditChange} className="border rounded p-1" />
                        </label>
                        <label>
                            Role:
                            <input type="text" name="role" value={editedUser.role} onChange={handleEditChange} className="border rounded p-1" />
                        </label>
                        <div className="flex justify-between mt-4">
                            <button 
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg transition duration-200"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button 
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition duration-200"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


 