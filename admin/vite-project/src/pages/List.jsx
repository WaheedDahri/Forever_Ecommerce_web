import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../config';
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({token}) => {

 const [list, setList] = useState([])

 const fetchList = async () =>{
   try {
    const response = await axios.get(backendUrl+ '/api/product/list')
    if(response.data.success){
      setList(response.data.products);
    } else{
      toast.error(response.data.message)
    }
   } catch (error) {
    console.log(error);
    toast.error(error.message)
   }
 }


//  const removeProduct = async () =>{
//   try {
//     const response = await axios.post(backendUrl+ '/api/product/remove', {id}, {headers:{token}})
//     if (response.data.success) {
//       toast.success(response.data.message)
//       await fetchList();
//     } else {
//       toast.error(response.data.message)
//     }
//   } catch (error) {
//     console.log(error)
//     toast.error(error.message)
//   }
//  }

const removeProduct = async (id) => {
  try {
    // const response = await axios.post(backendUrl+ '/api/product/remove', {id}, {headers:{token}})
    const response = await axios.post(
  backendUrl + '/api/product/remove', 
  { id }, 
  { headers: { Authorization: `Bearer ${token}` } }
)

    if (response.data.success) {
      toast.success(response.data.message)
      await fetchList();
    } else {
      toast.error(response.data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}


 useEffect(()=>{
  fetchList()
 },[])


  return (
<>
  <p className="mb-2 text-lg font-semibold">All Products List</p>

  <div className="flex flex-col gap-2">
    {/* Table Header */}
    <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b>Action</b>
    </div>

    {/* Product Rows */}
    {list.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border rounded md:border-none md:rounded-none gap-2"
      >
        {/* Image */}
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-16 h-16 object-cover rounded"
        />

        {/* Name */}
        <p className="truncate">{item.name}</p>

        {/* Category */}
        <p>{item.category}</p>

        {/* Price */}
        <p>{currency}{item.price}</p>

        {/* Action */}
        <p onClick={() => removeProduct(item._id)} className="text-red-500 font-bold cursor-pointer hover:text-red-700">X</p>
          
        
       
   
      </div>
    ))}
  </div>
</>

  );
}

export default List;


// import React, { useEffect, useState } from 'react';
// import { backendUrl, currency } from '../config';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const List = ({ token }) => {
//   const [list, setList] = useState([]);

//   // Fetch all products
//   const fetchList = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/product/list`, {
//         headers: { token } // include token if needed
//       });

//       if (response.data.success) {
//         setList(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   // Remove a product by ID
//   const removeProduct = async (id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { id },
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         fetchList(); // refresh list after deletion
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchList();
//   }, []);

//   return (
//     <>
//       <p className="mb-2 text-lg font-semibold">All Products List</p>

//       <div className="flex flex-col gap-2">
//         {/* Table Header */}
//         <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>

//         {/* Product Rows */}
//         {list.map((item, index) => (
//           <div
//             key={index}
//             className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border rounded md:border-none md:rounded-none gap-2"
//           >
//             {/* Image */}
//             <img
//               src={item.image[0]}
//               alt={item.name}
//               className="w-16 h-16 object-cover rounded"
//             />

//             {/* Name */}
//             <p className="truncate">{item.name}</p>

//             {/* Category */}
//             <p>{item.category}</p>

//             {/* Price */}
//             <p>{currency}{item.price}</p>

//             {/* Action */}
//             <button
//               onClick={() => removeProduct(item._id)}
//               className="text-red-500 font-bold hover:text-red-700"
//             >
//               X
//             </button>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default List;


// import React, { useEffect, useState } from "react";
// import { backendUrl, currency } from "../config";
// import { toast } from "react-toastify";
// import axios from "axios";

// const List = ({ token }) => {
//   const [list, setList] = useState([]);

//   // Fetch all products
//   const fetchList = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/product/list`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // send token correctly
//         },
//       });

//       if (response.data.success) {
//         setList(response.data.products);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // Remove a product by ID
//   const removeProduct = async (id) => {
//     if (!id) return toast.error("Product ID is required");

//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/product/remove`,
//         { id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // send token correctly
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         fetchList(); // refresh list after deletion
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       toast.error("Admin token not found. Please login.");
//       return;
//     }
//     fetchList();
//   }, [token]);

//   return (
//     <>
//       <p className="mb-2 text-lg font-semibold">All Products List</p>

//       <div className="flex flex-col gap-2">
//         {/* Table Header */}
//         <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm font-semibold">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>

//         {/* Product Rows */}
//         {list.map((item) => (
//           <div
//             key={item._id}
//             className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border rounded md:border-none md:rounded-none gap-2"
//           >
//             {/* Image */}
//             <img
//               src={item.image[0]}
//               alt={item.name}
//               className="w-16 h-16 object-cover rounded"
//             />

//             {/* Name */}
//             <p className="truncate">{item.name}</p>

//             {/* Category */}
//             <p>{item.category}</p>

//             {/* Price */}
//             <p>
//               {currency}
//               {item.price}
//             </p>

//             {/* Action */}
//             <p
//               onClick={() => removeProduct(item._id)}
//               className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
//             >
//               X
//             </p>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default List;
