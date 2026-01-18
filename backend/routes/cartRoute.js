// import express from 'express';
// import { addToCart,  updateCart, getUserCart } from '../controllers/cartController.js';
// import authUser from '../middlewares/auth.js';

// const cartRouter = express.Router();

// userRouter.post('/get', authUser ,getUserCart);
// userRouter.post('/add',  authUser , addToCart);
// userRouter.post('/update',  authUser , updateCart); // Admin login gives JWT

// export default cartRouter;
import express from "express";
import { addToCart, updateCart, getUserCart } from "../controllers/cartController.js";
import { verifyToken } from "../middlewares/authUser.js";

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.put("/update", verifyToken, updateCart);
router.get("/get", verifyToken, getUserCart);


export default router;
