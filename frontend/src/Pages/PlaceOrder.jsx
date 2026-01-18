import React, { useContext, useState } from "react";
import Title from "../Components/Title";
import CartTotal from "../Components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Common input style
const inputStyle =
  "border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-black";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const {
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // Handle input change
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Place order handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!cartItems || Object.keys(cartItems).length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const total = getCartAmount() + delivery_fee;

    // Prepare items array
    const items = Object.entries(cartItems)
      .flatMap(([productId, sizes]) =>
        Object.entries(sizes).map(([size, quantity]) => {
          const product = products.find((p) => p._id === productId);
          return quantity > 0
            ? { productId, size, quantity, price: product?.price || 0 }
            : null;
        })
      )
      .filter(Boolean);

    const orderData = {
      items,
      amount: total,
      address: formData,
      paymentMethod: method.toUpperCase(),
      payment: method === "cod" ? false : true,
      date: Date.now(),
    };

    try {
      let res;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (method === "cod") {
        res = await axios.post(`${backendUrl}/api/order/place`, orderData, config);
      } else if (method === "stripe") {
        res = await axios.post(`${backendUrl}/api/order/stripe`, orderData, config);
      } else if (method === "razorpay") {
        res = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, config);
      }

      if (res?.data?.success) {
        toast.success("🎉 Order placed successfully!");
        setCartItems({});
        navigate("/Orders"); // ✅ Redirect to success page
      } else {
        toast.error(res?.data?.message || "Order failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-10 min-h-[80vh] border-t"
    >
      {/* DELIVERY INFORMATION */}
      <div className="w-full sm:max-w-[480px] flex flex-col gap-4">
        <Title text1="DELIVERY" text2="INFORMATION" />

        <div className="flex gap-3">
          <input
            className={inputStyle}
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            placeholder="First Name"
            required
          />
          <input
            className={inputStyle}
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            placeholder="Last Name"
            required
          />
        </div>

        <input
          className={inputStyle}
          name="email"
          type="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
          required
        />

        <input
          className={inputStyle}
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          placeholder="Street Address"
          required
        />

        <div className="flex gap-3">
          <input
            className={inputStyle}
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            placeholder="City"
            required
          />
          <input
            className={inputStyle}
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            placeholder="State"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            className={inputStyle}
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip Code"
            required
          />
          <input
            className={inputStyle}
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            placeholder="Country"
            required
          />
        </div>

        <input
          className={inputStyle}
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          placeholder="Phone Number"
          required
        />
      </div>

      {/* PAYMENT & CART TOTAL */}
      <div className="w-full sm:max-w-[480px]">
        <CartTotal />

        <div className="mt-8">
          <Title text1="PAYMENT" text2="METHODS" />

          <div className="flex flex-col gap-3 mt-4">
            <PaymentOption
              option="stripe"
              // text="Stripe"
              logo={assets.stripe_logo}
              method={method}
              setMethod={setMethod}
            />
            <PaymentOption
              option="razorpay"
              // text="Razorpay"
              logo={assets.razorpay_logo}
              method={method}
              setMethod={setMethod}
            />
            <PaymentOption
              option="cod"
              text="Cash on Delivery"
              method={method}
              setMethod={setMethod}
            />
          </div>

          <button
       
            type="submit"
            className="mt-8 bg-black text-white px-8 py-3 w-full rounded-md"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

// PAYMENT OPTION COMPONENT
const PaymentOption = ({ option, text, logo, method, setMethod }) => (
  <div
    onClick={() => setMethod(option)}
    className={`flex items-center gap-3 border p-3 cursor-pointer rounded ${
      method === option ? "border-green-500" : "border-gray-300"
    }`}
  >
    <span
      className={`w-4 h-4 rounded-full border ${
        method === option ? "bg-green-500" : ""
      }`}
    />
    {logo && <img src={logo} alt={text} className="h-5 ml-2" />}
    <p className="text-sm font-medium">{text}</p>
  </div>
);

export default PlaceOrder;
