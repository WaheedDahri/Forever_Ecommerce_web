// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js';
// import productRouter from './routes/productRoute.js'


// // Config App
// const app = express()
// const port = process.env.PORT || 4000

// connectDB()
// connectCloudinary()

// // middleware
// app.use(express.json())
// app.use(cors())

// // api endpoints
// app.use("/api/user", userRouter)
// app.use('/api/product' , productRouter)

// // test route
// app.get('/', (req,res)=>{
//     res.send("api is working")
// })

// app.listen(port, () => 
//   console.log("port is working correct: " + port)
// )


import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from "./routes/orderRoute.js";

// Config App
const app = express();
const port = process.env.PORT || 4000;

// Connect DB & Cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());

// API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter)
app.use("/api/order", orderRouter);

// Test route
app.get('/', (req, res) => {
    res.send("API is working");
});

// Start server
app.listen(port, () => console.log("Server running on port: " + port));
