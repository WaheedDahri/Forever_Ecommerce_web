import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";

import userRouter from "../routes/userRoute.js";
import productRouter from "../routes/productRoute.js";
import cartRouter from "../routes/cartRoute.js";
import orderRouter from "../routes/orderRoute.js";

// Initialize app
const app = express();

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

// Middlewares
const allowedOrigins = [
  "https://forever-ecommerce-web.vercel.app",  // Frontend
  "https://forever-ecommerce-web-admin.vercel.app" // Admin
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API is working");
});

export default app;
