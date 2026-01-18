

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { backendUrl, currency } from "../config";
// import { toast } from "react-toastify";
// import { assets } from "../assets/assets";

// const Orders = ({ token }) => {
//   const [name, setName] = useState("");
//   const [orders, setOrders] = useState([]);

//   // 🔹 Fetch all orders (Admin)
//   const fetchAllOrders = async () => {
//     if (!token) return;

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/order/list`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         setOrders(response.data.orders);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

// const statusHandler = async (event, orderid) => {
//   try {
//     const response = await axios.post(
//       `${backendUrl}/api/order/status`,
//       {
//         orderId: orderid,
//         status: event.target.value,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (response.data.success) {
//       await fetchAllOrders();
//       toast.success("Order status updated");
//     } else {
//       toast.error(response.data.message);
//     }
//   } catch (error) {
//     toast.error(error.message);
//   }
// };

//   return (
//     <div className="p-6 max-w-7xl mx-auto ">
//       <h3 className="text-2xl font-semibold mb-6">📦 All Orders</h3>

//       {orders.length === 0 ? (
//         <p className="text-gray-500">No orders found</p>
//       ) : (
//         <div className="space-y-6">
//           {orders.map((order, index) => (
//             <div
//               key={index}
//               className="border  rounded-lg p-5 flex md:w-[700px] py-5  md:flex-row  flex-col gap-4 items-start bg-white w-[250px] shadow-sm"
//             >
//               {/* Parcel Icon */}
//               <img
//                 src={assets.parcel_icon}
//                 alt="parcel"
//                 className="w-12 h-12 mt-1"
//               /> 

//               {/* Order Details */}
//               <div className="flex-1 space-y-2 text-sm ">
//                 {/* 🔹 Customer Info */}
//                 <div className=" mt-3 mr-201">
//                 <p className="">
//                 <b>Name: &nbsp;&nbsp;</b>  {order.address?.firstName} {order.address?.lastName}
//                 </p>
  
//                 <p><b>Email: &nbsp;&nbsp;</b> {order.address?.email}</p>
//                 <p><b>Phone:&nbsp;&nbsp;</b> {order.address?.phone}</p>
//                  </div>
//                 {/* 🔹 Address */}
//                 <p className="text-gray-600 py-5">
//                   <b>Address:</b> <br /> 
//                   Street: &nbsp;&nbsp;&nbsp;&nbsp;{order.address?.street} <br /> City: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{order.address?.city} <br />{" "}
//                   State: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{order.address?.state} <br /> ZipCode: &nbsp;&nbsp;{order.address?.zipcode} <br />{" "}
//                   Country: &nbsp;&nbsp;{order.address?.country}
//                 </p>

//                 {/* 🔹 Items */}
             
//                   <p className="font-medium "><b>Items:</b></p>
//                   {order.items.map((item, i) => (
//                     <p key={i} className="ml-3 mb-8">
//                       • Product ID: &nbsp; {item.productId} × {item.quantity}{" "}
//                       <span className="text-gray-500">({item.size})</span>
//                     </p> 
//                   ))}
               

//                 {/* 🔹 Amount & Payment */}
                

//                 <p > <br />
//                  <b>Payment Method:</b> &nbsp;&nbsp; {order.paymentMethod}
//                 </p>
                
//                   <p className="mt-2 font-medium"> <br />
//                  <b> Price: &nbsp;&nbsp; </b><span className="text-gray-500">{currency}{order.amount}</span>
//                 </p> <br />

                
//               <select
//   value={order.status}
//   onChange={(e) => statusHandler(e, order._id)}
//   className="bg-gray-300 p-1 rounded"
// >
//   <option value="Order Placed">Order Placed</option>
//   <option value="Packing">Packing</option>
//   <option value="Shipped">Shipped</option>
//   <option value="Out for delivery">Out for delivery</option>
//   <option value="Delivered">Delivered</option>
// </select>

//                 </div>
            

//               🔹{/* Order Status */}
//                <div className="text-sm font-medium">
//                 <span
//                   className={`px-3 py-1 rounded-full text-white ${
//                     order.status === "Pending"
//                       ? "bg-yellow-500"
//                       : order.status === "Ready To Ship"
//                       ? "bg-green-500"
//                       : "bg-gray-500"
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//               </div>
               
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../config";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // 🔹 Fetch all orders (Admin)
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // 🔹 Update order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: event.target.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">📦 All Orders</h3>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-6 flex md:w-[700px] max-w-full md:flex-row flex-col gap-4 bg-white shadow-sm"
            >
              {/* Parcel Icon */}
              <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-12 h-12 mt-1"
              />

              {/* Order Details */}
              <div className="flex-1 text-sm space-y-2">
                {/* Customer Info */}
                <p>
                  <b>Name:</b> {order.address?.firstName}{" "}
                  {order.address?.lastName}
                </p>
                <p>
                  <b>Email:</b> {order.address?.email}
                </p>
                <p>
                  <b>Phone:</b> {order.address?.phone}
                </p>

                {/* Address */}
                <p className="text-gray-600 mt-3">
                  <b>Address:</b>
                  <br />
                  {order.address?.street}, {order.address?.city},{" "}
                  {order.address?.state}, {order.address?.zipcode},{" "}
                  {order.address?.country}
                </p>

                {/* Items */}
                <p className="font-medium mt-3">
                  <b>Items:</b>
                </p>
                {order.items?.map((item, i) => (
                  <p key={i} className="ml-3">
                    • {item.productId} × {item.quantity}{" "}
                    <span className="text-gray-500">({item.size})</span>
                  </p>
                ))}

                {/* Payment & Price */}
                <p className="mt-3">
                  <b>Payment Method:</b> {order.paymentMethod}
                </p>
                <p>
                  <b>Price:</b>{" "}
                  <span className="text-gray-500">
                    {currency}
                    {order.amount}
                  </span>
                </p>

                {/* Status Select */}
                <select
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                  className="mt-3 bg-gray-200 p-1 rounded"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              {/* Order Status Badge */}
              <div className="text-sm font-medium">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    order.status === "Order Placed"
                      ? "bg-yellow-500"
                      : order.status === "Delivered"
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
