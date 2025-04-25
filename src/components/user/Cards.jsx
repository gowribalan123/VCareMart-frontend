import { Link , useNavigate} from "react-router-dom";
import React from "react";
 
export const ProductCard = ({ product }) => {
   // console.log("productCard=====", product);
    const navigate = useNavigate();

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

export const CategoryCard = ({ category }) => {
  
   const navigate = useNavigate();

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
             {/**
               <div className="card-actions justify-end mt-4">
                   <Link to={`/category-details/${category?._id}`}>
                       <button className="btn btn-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
                           More Details
                       </button>
                   </Link>
               </div>
                */} 
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
              <h3 className="text-md font-medium text-gray-600">Rating: {item.productId.rating}</h3>
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
};
