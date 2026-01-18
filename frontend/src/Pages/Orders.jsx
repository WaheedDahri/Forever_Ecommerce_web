
import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { backendUrl, products, currency, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // 🔹 Fetch user orders from backend
  const loadOrderData = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setOrderData(res.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders 👉", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // 🔹 Helper to get product info from order item
  const getProductDetails = (productId) => {
    return products.find((p) => p._id === productId || p.id === productId);
  };

   const handleTrackOrder = (order) => {
    if (order.status === "Pending") {
      toast.info("⏳ Your order is in process, please wait.");
    } else {
      // Only show toast when order is updated
      toast.success(`Your order is now "${order.status}"`);
    }
  };

  return (
    <div className="border-t pt-16 mb-10 max-w-6xl mx-auto px-4">
      <div className="text-2xl mb-5">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderData.length === 0 ? (
        <p className="text-center text-gray-500 py-20">
          🛒 You have no orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orderData.map((order, index) => (
            <div
              key={index}
              className="py-4 border rounded-lg text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex flex-col md:flex-col items-start gap-6 text-sm md:w-2/3">
                {order.items.map((item, i) => {
                  const product = getProductDetails(item.productId);
                  if (!product) return null;

                  return (
                    <div key={i} className="flex items-start gap-4 ">
                      <img
                        className="w-16 sm:w-20 ml-6"
                        src={product.image?.[0] || product.image}
                        alt={product.name}
                      />
                      <div className="mt-2">
                        <p className="font-medium">{product.name}</p>
                        <p> 
                          Quantity = &nbsp;
                          {item.quantity} <br />
                          Price = &nbsp;
                       
                          
                           {/* {product.price} × {item.quantity} ={" "} */}
                          {currency}
                          {product.price * item.quantity}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Size: {item.size}
                        </p>


                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="md:w-1/3 flex flex-col md:flex-row justify-between items-start ml-6 md:items-center gap-3 mt-3 md:mt-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full  ${
                      order.status === "Pending"
                        ? "bg-yellow-400"
                        : order.status === "Ready To Ship"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  <p className="text-sm md:text-base mr-10">{order.status}</p>
                </div>
                <button onClick={() => handleTrackOrder(order)} className="border mr-6 md:mr-6 px-4 py-2   text-sm font-medium rounded-sm hover:bg-gray-100 ">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


