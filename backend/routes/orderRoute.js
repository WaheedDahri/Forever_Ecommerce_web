// import express from 'express';
// import  {placeOrder, placeOrderStripe, placeOrderRazorpay,  allOrders, userOrders, updateStatus} from '../controllers/orderController.js';
// import adminAuth from '../middlewares/adminAuth.js';

// const orderRouter =  express.Router();


import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus
} from "../controllers/orderController.js";

import { verifyToken } from "../middlewares/authUser.js"; // ✅ named import

import adminAuth from "../middlewares/adminAuth.js";

const orderRouter = express.Router();

/* ================= USER ROUTES ================= */

// COD Order
orderRouter.post("/place", verifyToken, placeOrder);

// Stripe Order
orderRouter.post("/stripe", verifyToken,  placeOrderStripe);

// Razorpay Order
orderRouter.post("/razorpay", verifyToken,  placeOrderRazorpay);

// Logged-in user orders
orderRouter.get("/userorders", verifyToken, userOrders);


/* ================= ADMIN ROUTES ================= */

// Get all orders (admin only)
orderRouter.post("/list", adminAuth, allOrders);

// Update order status (admin only)
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;
