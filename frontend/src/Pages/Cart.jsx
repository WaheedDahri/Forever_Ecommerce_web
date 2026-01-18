
// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import Title from "../Components/Title";
// import { assets } from "../assets/assets";
// import CartTotal from "../Components/CartTotal";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const {
//     products,
//     currency,
//     cartItems,
//     addToCart,
//     // removeItem,
//     getCartCount,
//    removeFromCartBackend,
//     navigate
//   } = useContext(ShopContext);

//   const [cartData, setCartData] = useState([]);

//   useEffect(() => {

//     if (products.length > 0) {
//         const tempData = [];

//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         if (cartItems[itemId][size] > 0) {
//           const productData = products.find(
//             (product) => product._id === itemId
//           );

//           if (productData) {
//             tempData.push({
//               _id: itemId,
//               size,
//               quantity: cartItems[itemId][size],
//               product: productData,
//             });
//           }
//         }
//       }
//     }

//     setCartData(tempData);
//     }
  
//   }, [cartItems, products]);

//   return (
//     <div className="border-t pt-14 max-w-6xl mx-auto px-4 mb-10">
//       <div className="text-2xl mb-6">
//         <Title text1={"YOUR"} text2={"CART"} />
//       </div>

//       {cartData.length === 0 && (
//         <p className="text-center text-gray-500 py-20">
//           🛒 Your cart is empty
//         </p>
//       )}

//       <div className="space-y-6">
//         {cartData.map((item, index) => (
//           <div
//             key={index}
//             className="py-4 border rounded-lg text-gray-700 
//             grid grid-cols-[4fr_1fr_1fr] 
//             sm:grid-cols-[4fr_2fr_1fr] 
//             items-center gap-4"
//           >
//             {/* 🔹 Product Info */}
//             <div className="flex items-start gap-6">
//               <img
//                 className="w-16 sm:w-20 rounded ml-5"
//                 src={item.product.image?.[0] || item.product.image}
//                 alt={item.product.name}
//               />

//               <div>
//                 <p className="text-sm sm:text-lg font-medium">
//                   {item.product.name}
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   Size: {item.size}
//                 </p>
//                 {/* <p className="text-sm mt-1">
//                   {currency}
//                   {item.product.price}
//                 </p> */}
//                  <p className="font-semibold">
//                 {currency}
//                 {item.product.price * item.quantity}
//               </p>

//               </div>
//             </div>

//             {/* 🔹 Quantity */}
//             <div className="flex items-center gap-3">
//               {/* <button
//                 onClick={() => removeFromCart(item._id, item.size)}
//                 className="w-8 h-8 border rounded hover:bg-gray-100"
//               >
//                 −
//               </button>

//               <span className="font-semibold">{item.quantity}</span>

//               <button
//                 onClick={() => addToCart(item._id, item.size)}
//                 className="w-8 h-8 border rounded hover:bg-gray-100"
//               >
//                 +
//               </button> */}
//               <button
//         onClick={() => decrementCartItem(item._id, item.size)}
//          className="w-8 h-8 border rounded hover:bg-gray-100"
// >
//   −
// </button>

// <span className="font-semibold">{item.quantity}</span>

// <button
//   onClick={() => incrementCartItem(item._id, item.size)}
//   className="w-8 h-8 border rounded hover:bg-gray-100"
// >
//   +
// </button>

//             </div>

//             {/* 🔹 Total Price + Bin Icon */}
//             <div className="flex items-center justify-end gap-4 mr-10">
//               {/* <p className="font-semibold">
//                 {currency}
//                 {item.product.price * item.quantity}
//               </p> */}

//               <img
//                 src={assets.bin_icon}
//                 alt="remove"
//                 className="w-5 cursor-pointer hover:opacity-70"
//                 onClick={() =>  removeFromCartBackend(item._id, item.size)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-{450px}">
//         <CartTotal/>
//         <div className="w-full text-start mt-10">
//            <button onClick={() => navigate('/place-order')} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
//         </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    incrementCartItem,
    decrementCartItem,
    removeFromCartBackend,
    navigate,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // Prepare cart data for rendering
  useEffect(() => {
    if (products.length > 0 && cartItems) {
      const tempData = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          if (quantity > 0) {
            const productData = products.find((p) => p._id === itemId);
            if (productData) {
              tempData.push({
                _id: itemId,
                size,
                quantity,
                product: productData,
              });
            }
          }
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  if (!cartData || cartData.length === 0) {
    return (
      <div className="border-t pt-14 max-w-6xl mx-auto px-4 mb-10">
        <Title text1="YOUR" text2="CART" />
        <p className="text-center text-gray-500 py-20">
          🛒 Your cart is empty
        </p>
      </div>
    );
  }

  return (
    <div className="border-t pt-14 max-w-6xl mx-auto px-4 mb-10">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="space-y-6">
        {cartData.map((item, index) => (
          <div
            key={index}
            className="py-4 border rounded-lg text-gray-700 
            grid grid-cols-[4fr_1fr_1fr] 
            sm:grid-cols-[4fr_2fr_1fr] 
            items-center gap-4"
          >
            {/* Product Info */}
            <div className="flex items-start gap-6">
              <img
                className="w-16 sm:w-20 rounded ml-5"
                src={item.product.image?.[0] || item.product.image}
                alt={item.product.name}
              />
              <div>
                <p className="text-sm sm:text-lg font-medium">{item.product.name}</p>
                <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                <p className="font-semibold">
                  {currency}{item.product.price * item.quantity}
                </p>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decrementCartItem(item._id, item.size)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                −
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => incrementCartItem(item._id, item.size)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* Remove Item */}
            <div className="flex items-center justify-end gap-4 mr-10">
              <img
                src={assets.bin_icon}
                alt="remove"
                className="w-5 cursor-pointer hover:opacity-70"
                onClick={() => removeFromCartBackend(item._id, item.size)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total & Checkout */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-start mt-10">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

