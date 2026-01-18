//shafique changes

// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// import { ShopContext } from '../Context/ShopContext';
// import { toast } from 'react-toastify';

// const Login = () => {

//   const [currentState, setCurrentState] = useState('Login');
//   const {token, setToken, navigate, backendUrl} = useContext(ShopContext)

//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');


// const handleSubmit = async (event) => {
//   event.preventDefault();

//   try {
//     if (currentState === 'Sign Up') {
//       const response = await axios.post(
//         backendUrl + '/api/user/register',
//         { name, email, password }
//       );

//       console.log("SIGNUP RESPONSE 👉", response.data);

//       if (response.data.success) {
//         setToken(response.data.token);
//         localStorage.setItem('token', response.data.token);
//       } else {
//         toast.error(response.data.message);
//       }

//     } else {
//       const response = await axios.post(
//         backendUrl + '/api/user/login',
//         { email, password }
//       );

//       console.log("LOGIN RESPONSE 👉", response.data);

//       if (response.data.success) {
//         setToken(response.data.token);
//         localStorage.setItem('token', response.data.token);
//       } else {
//         toast.error(response.data.message);
//       }
//     }

//   } catch (error) {
//     console.log(
//       "LOGIN ERROR 👉",
//       error.response?.data || error.message
//     );
//     toast.error(error.response?.data?.message || error.message);
//   }
// };

//  useEffect(()=>{
//   if (token) {
//     navigate('/')
//   }
//  })

//   return (
//     <form 
//       onSubmit={handleSubmit}
//       className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
//     >

//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//       </div>

//       {/* Name field only for Sign Up */}
//       {currentState === 'Login' ? null : (
//         <input
//         onChange={(e) => setName(e.target.value)} value={name}
//           className='w-full px-3 py-2 border border-gray-800'
//           type="text"
//           placeholder='Name'
//           required
//         />
//       )}

//       <input
//        onChange={(e) => setEmail(e.target.value)} value={email}
//         className='w-full px-3 py-2 border border-gray-800'
//         type="email"
//         placeholder='Email'
//         required
//       />

//       <input
//        onChange={(e) => setPassword(e.target.value)} value={password}
//         className='w-full px-3 py-2 border border-gray-800'
//         type="password"
//         placeholder='Password'
//         required
//       />

//       <div className='w-full flex justify-between text-sm mt-[-8px]'>
//         <p className='cursor-pointer'>Forgot your password?</p>

//         {currentState === 'Login' ? (
//           <p
//             onClick={() => setCurrentState('Sign Up')}
//             className='cursor-pointer font-medium'
//           >
//             Create Account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState('Login')}
//             className='cursor-pointer font-medium'
//           >
//             Login
//           </p>
//         )}
//       </div>

//       {/* 🔥 Button */}
//       <button
//         type="submit"
//         className='w-32 bg-black text-white py-2 mt-4 hover:bg-gray-800 transition-all mb-5'
//       >
//         {currentState === 'Login' ? 'Sign in' : 'Sign Up'}
//       </button>

//     </form>
//   );
// };

// export default Login;


//waheed changes

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";
import API from "../Api/api"; // ✅ import axios instance

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response;

      if (currentState === "Sign Up") {
        // Sign Up API
        response = await API.post("/register", { name, email, password });
      } else if (currentState === "Login") {
        // User Login API
        response = await API.post("/login", { email, password });
      } else if (currentState === "Admin Login") {
        // Admin login API
        response = await API.post("/admin", { email, password });
      }

      console.log(`${currentState} RESPONSE 👉`, response.data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/"); // redirect to homepage
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("LOGIN ERROR 👉", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Name field only for Sign Up */}
      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border border-gray-800"
          type="text"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-2 border border-gray-800"
        type="email"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-3 py-2 border border-gray-800"
        type="password"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>

        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer font-medium"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer font-medium"
          >
            Login
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-32 bg-black text-white py-2 mt-4 hover:bg-gray-800 transition-all mb-5"
      >
        {currentState === "Login" ? "Sign in" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;

