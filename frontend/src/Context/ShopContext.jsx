import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  // 🔹 Token (persistent)
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // 🔹 Cart (persistent)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Increment item quantity
const incrementCartItem = (itemId, size) => {
  const currentQty = cartItems[itemId]?.[size] || 0;
  updateCartBackend(itemId, size, currentQty + 1);
};

// Decrement item quantity
const decrementCartItem = (itemId, size) => {
  const currentQty = cartItems[itemId]?.[size] || 0;
  if (currentQty > 0) {
    updateCartBackend(itemId, size, currentQty - 1);
  }
};


  // 🔹 Persist token changes
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  // 🔹 Persist cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🔹 Load cart from backend on app start if token exists
  useEffect(() => {
    if (token) fetchUserCart(token);
  }, [token]);

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/product/list`);
        if (res.data.success) setProducts(res.data.products);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Fetch user cart from backend
  const fetchUserCart = async (authToken) => {
    if (!authToken) return;
    try {
      const res = await axios.get(`${backendUrl}/api/cart/get`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.data.success) setCartItems(res.data.cartData || {});
    } catch (err) {
      toast.error("Unauthorized. Please login.");
    }
  };

  // 🔹 Add item to cart (backend)
  const addToCartBackend = async (itemId, size) => {
    if (!token) return toast.error("Please login first");
    if (!size) return toast.error("Select product size");

    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success && res.data.cartData) {
        setCartItems(res.data.cartData);
        toast.success("Added to cart");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding to cart");
    }
  };

  // 🔹 Update cart item quantity (backend)
  const updateCartBackend = async (itemId, size, quantity) => {
    if (!token) return toast.error("Please login first");

    try {
      const res = await axios.put(
        `${backendUrl}/api/cart/update`,
        { itemId, size, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success && res.data.cartData) {
        setCartItems(res.data.cartData);
        toast.success("Cart updated");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating cart");
    }
  };

  // 🔹 Remove item from cart (backend)
  const removeFromCartBackend = async (itemId, size) => {
    await updateCartBackend(itemId, size, 0);
  };

  // 🔹 Get total cart quantity
  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
      0
    );
  };

  // 🔹 Get total cart amount
  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find((p) => p._id === itemId || p.id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }
    return total;
  };

  // 🔹 Convert cart object to array for PlaceOrder
  const cartItemsArray = Object.entries(cartItems).flatMap(([productId, sizes]) =>
    Object.entries(sizes).map(([size, quantity]) => ({
      productId,
      size,
      quantity,
      price: products.find((p) => p._id === productId || p.id === productId)?.price || 0,
    }))
  );

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        token,
        setToken,
        cartItems,
        setCartItems,
        cartItemsArray,
        addToCartBackend,
        updateCartBackend,
        incrementCartItem, 
        decrementCartItem,
        removeFromCartBackend,
        getCartCount,
        getCartAmount,
        navigate,
        backendUrl,
        fetchUserCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;

