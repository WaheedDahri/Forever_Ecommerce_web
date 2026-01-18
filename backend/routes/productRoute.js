// import express from 'express'
// import {listProducts, singleProduct, addProduct, removeProduct} from '../controllers/productController.js'
// import upload from '../middlewares/multer.js'
// import adminAuth from '../middlewares/adminAuth.js'

// const productRouter = express.Router()

// // GET all products
// productRouter.get('/list', listProducts)

// // GET single product by id
// productRouter.post('/single', singleProduct)

// // ADD new product
// productRouter.post('/add',adminAuth,upload.fields([{name: image1, maxCount: 1},{name: image2, maxCount: 1},{name: image3, maxCount: 1},{name: image4, maxCount: 1}]), addProduct)

// // DELETE product by id
// productRouter.post('/remove',adminAuth, removeProduct)

// export default productRouter

// import express from 'express'

// import {listProducts, singleProduct, addProduct, removeProduct,} from "../controllers/productController.js";
// import upload from "../middlewares/multer.js";
// import adminAuth from "../middlewares/adminAuth.js";

// const productRouter = express.Router();

// // GET all products
// productRouter.get("/list", listProducts);

// // GET single product by id
// productRouter.post("/single", singleProduct);

// // ADD new product
// productRouter.post(
//   "/add",
//   adminAuth,
//   upload.fields([
//     { name: "image1", maxCount: 1 },
//     { name: "image2", maxCount: 1 },
//     { name: "image3", maxCount: 1 },
//     { name: "image4", maxCount: 1 },
//   ]),
//   addProduct
// );

// // DELETE product by id
// productRouter.post("/remove", adminAuth, removeProduct);

// export default productRouter;


import express from 'express';
import { listProducts, singleProduct, addProduct, removeProduct } from "../controllers/productController.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";

const productRouter = express.Router();

// GET all products
productRouter.get("/list", listProducts);

// GET single product
productRouter.post("/single", singleProduct);

// ADD new product (Admin only)
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// DELETE product
productRouter.post("/remove", adminAuth, removeProduct);

export default productRouter;
