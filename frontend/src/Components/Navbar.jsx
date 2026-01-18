import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, setToken, token, setCartItems} = useContext(ShopContext); // ✅ Context integration


 const logout = () =>{
   navigate('/login')
   localStorage.removeItem('token')
   
   setToken('')
   setCartItems({})
  
 }


  const navLinks = [
    { title: "HOME", path: "/" },
    { title: "COLLECTION", path: "/collection" },
    { title: "ABOUT", path: "/about" },
    { title: "CONTACT", path: "/contact" },
  ];

  return (
    <div className="flex items-center justify-between py-5 font-medium relative z-50">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* Nav Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map(({ title, path }) => (
          <NavLink
            key={path}
            to={path}
            className="flex flex-col items-center gap-1 font-bold text-gray-700"
          >
            <p>{title}</p>
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
          onClick={() => setShowSearch(true)} // ✅ open SearchBar
        />

        

    <div className="group relative">
  {/* Profile Icon (NO direct link) */}
  <img
  onClick={() => token ? null : navigate('/login')}
    className="w-5 cursor-pointer"
    src={assets.profile_icon}
    alt="profile"
  />

  {/* Dropdown */}
  {token &&
  <div className="group-hover:block hidden absolute right-0 pt-4">
    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">

      <p
        onClick={() => navigate("/profile")}
        className="cursor-pointer hover:text-black"
      >
        My Profile
      </p>

      <p
        onClick={() => navigate("/orders")}
        className="cursor-pointer hover:text-black"
      >
        Orders
      </p>

      <p
        onClick={logout}
        className="cursor-pointer hover:text-black"
      >
        Logout
      </p>

    </div>
  </div>}
</div>


        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5 cursor-pointer" alt="cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Sidebar Menu */}
      <div className={`fixed top-0 right-0 overflow-hidden z-50 bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col text-gray-600 ">
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="back" />
            <p>Back</p>
          </div>
          <div className="flex flex-col gap-4 p-6">
            {navLinks.map(({ title, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `font-bold ${isActive ? "text-red-600" : "text-gray-700"}`}
                onClick={() => setVisible(false)}
              >
                {title}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

