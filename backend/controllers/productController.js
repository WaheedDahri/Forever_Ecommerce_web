// import {v2 as cloudinary} from "cloudinary"
// import productModel from "../models/productModel.js"


// //function for add product
// const addProduct = async (req,res) =>{
//     try {
//     const { name, description, price, category, subCategory, sizes, bestseller } = req.body


//     const image1 =  req.files.image1  && req.files.image1[0]
//     const image2 =  req.files.image2  && req.files.image2[0]
//     const image3 =  req.files.image3  && req.files.image3[0]
//     const image4 =  req.files.image4  && req.files.image4[0]
    
//     const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

//     let imagesUrl = await Promise.all(
//         images.map(async (item) => {
//             results = await cloudinary.uploader.upload(item.path, {resourse_type:'image'})
//             return result.secure_url
//         })
//     )

//     // console.log(name, description, price, category, subCategory, sizes, bestseller);
//     // console.log(imagesUrl);

//      const productData = {
//         name,
//         description,
//         category,
//         price: Number(price),
//         subCategory,
//         bestseller: bestseller === "true" ? true : false,
//         sizes: JSON.parse(sizes),
//         image: imagesUrl,
//         date: Date.Now()
//      }

//      console.log(productData);

//      const product = new productModel(productData)
//      await product.save()

//     res.json({success: true, message:"Product Added"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
//     }
// }

// //function for list product
// const listProducts = async (req,res) =>{
//   try {
//     const products = await productModel.find({});
//     res.json({success:true,products})
//   } catch (error) {
//     console.log(error);
//     res.json({success: false, message: error.message})
//   }
// }

// //function for removing products
// const removeProduct = async (req,res) =>{

//     try {
//       await productModel.findByIdAndDelete(req.body.id)
//          res.json({success:true, message: "product removed"})
//     } catch (error) {
//        console.log(error);
//     res.json({success: false, message: error.message})
//     }

// }

// //function for single product info
// const singleProduct = async (req,res) =>{

// try {
//   const {productId} = req.body
//   const product = await productModel.findById(productId)
//   res.json({success:true,product})
// } catch (error) {
//    console.log(error);
//     res.json({success: false, message: error.message})
// }

// }

// export {listProducts, removeProduct, addProduct, singleProduct}
 

//2nd version code


// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productModel.js";

// // -------------------------------------------
// // ADD NEW PRODUCT
// // -------------------------------------------
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

//     // Check required fields
//     if (!name || !description || !price || !category) {
//       return res.status(400).json({ success: false, message: "Name, description, price, category are required" });
//     }

//     // Handle uploaded images
//     const image1 = req.files.image1 && req.files.image1[0];
//     const image2 = req.files.image2 && req.files.image2[0];
//     const image3 = req.files.image3 && req.files.image3[0];
//     const image4 = req.files.image4 && req.files.image4[0];

//     const images = [image1, image2, image3, image4].filter(item => item !== undefined);

//     // Upload images to Cloudinary
//     const imagesUrl = await Promise.all(
//       images.map(async (item) => {
//         const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
//         return result.secure_url;
//       })
//     );

//     // Parse sizes if passed as JSON string
//     let parsedSizes = [];
//     if (sizes) {
//       try {
//         parsedSizes = JSON.parse(sizes);
//       } catch (err) {
//         return res.status(400).json({ success: false, message: "Sizes must be a JSON array string" });
//       }
//     }

//     // Create product object
//     const productData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       subCategory,
//       bestseller: bestseller === "true",
//       sizes: parsedSizes,
//       image: imagesUrl,
//       date: new Date()
//     };

//     // Save product to DB
//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product Added", product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -------------------------------------------
// // LIST ALL PRODUCTS
// // -------------------------------------------
// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json({ success: true, products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -------------------------------------------
// // REMOVE PRODUCT BY ID
// // -------------------------------------------
// const removeProduct = async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id) return res.status(400).json({ success: false, message: "Product ID required" });

//     await productModel.findByIdAndDelete(id);
//     res.json({ success: true, message: "Product removed" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -------------------------------------------
// // GET SINGLE PRODUCT
// // -------------------------------------------
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     if (!productId) return res.status(400).json({ success: false, message: "Product ID required" });

//     const product = await productModel.findById(productId);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({ success: true, product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { listProducts, removeProduct, addProduct, singleProduct };


// 3rd version code

// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productModel.js";

// // -------------------------------------------
// // ADD NEW PRODUCT
// // -------------------------------------------
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

//     // Required fields check
//     if (!name || !description || !price || !category) {
//       return res.status(400).json({ success: false, message: "Name, description, price, category are required" });
//     }

//     // Handle uploaded images safely
//     const images = [];
//     ['image1', 'image2', 'image3', 'image4'].forEach((key) => {
//       if (req.files && req.files[key] && req.files[key][0]) {
//         images.push(req.files[key][0]);
//       }
//     });

//     // Upload images to Cloudinary
//     const imagesUrl = await Promise.all(
//       images.map(async (file) => {
//         const result = await cloudinary.uploader.upload(file.path, {
//           resource_type: 'image',
//           folder: 'ecommerce', // safe folder name
//         });
//         return result.secure_url;
//       })
//     );

//     // Parse sizes if passed as JSON string
//     let parsedSizes = [];
//     if (sizes) {
//       try {
//         parsedSizes = JSON.parse(sizes);
//       } catch (err) {
//         return res.status(400).json({ success: false, message: "Sizes must be a JSON array string" });
//       }
//     }

//     // Create product object
//     const productData = {
//       name,
//       description,
//       category,
//       price: Number(price),
//       subCategory,
//       bestseller: bestseller === "true",
//       sizes: parsedSizes,
//       image: imagesUrl,
//       date: new Date()
//     };

//     // Save product to DB
//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product Added", product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -------------------------------------------
// // LIST ALL PRODUCTS
// // -------------------------------------------
// const listProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({});
//     res.json({ success: true, products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -------------------------------------------
// // REMOVE PRODUCT BY ID
// // -------------------------------------------
// const removeProduct = async (req, res) => {
//   try {
//     const { id } = req.body;
//     if (!id) return res.status(400).json({ success: false, message: "Product ID required" });

//     const deleted = await productModel.findByIdAndDelete(id);
//     if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({ success: true, message: "Product removed" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // -------------------------------------------
// // GET SINGLE PRODUCT
// // -------------------------------------------
// const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     if (!productId) return res.status(400).json({ success: false, message: "Product ID required" });

//     const product = await productModel.findById(productId);
//     if (!product) return res.status(404).json({ success: false, message: "Product not found" });

//     res.json({ success: true, product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export { listProducts, removeProduct, addProduct, singleProduct };


//4th version

import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// ------------------- ADD PRODUCT -------------------
const addProduct = async (req, res) =>{
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ success: false, message: "Name, description, price, category are required" });
    }

    // Collect images
    const images = [];
    ["image1","image2","image3","image4"].forEach(key => {
      if(req.files && req.files[key] && req.files[key][0]) {
        images.push(req.files[key][0]);
      }
    });

    // Upload to Cloudinary with safe folder
    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
          folder: "ecommerce_products" // ✅ safe folder, no slash or dot
        });
        return result.secure_url;
      })
    );

    // Parse sizes correctly
    let parsedSizes = [];
    if(sizes){
      try {
        parsedSizes = JSON.parse(sizes); // expected format: '["S","M","L"]'
      } catch {
        // fallback if comma separated: "S,M,L"
        parsedSizes = sizes.split(",").map(s => s.trim());
      }
    }

    // Save product
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestSeller,
      sizes: parsedSizes,
      image: imagesUrl,
      date: new Date()
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }}


// ------------------- LIST PRODUCTS -------------------
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------- REMOVE PRODUCT -------------------
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ success: false, message: "Product ID required" });

    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ------------------- SINGLE PRODUCT -------------------
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "Product ID required" });

    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { listProducts, removeProduct, addProduct, singleProduct };


