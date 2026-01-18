

// import userModel from "../models/userModel.js";



// // ---------------- ADD TO CART ----------------
// const addToCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { itemId, size } = req.body;

//     if (!itemId || !size) {
//       return res.status(400).json({
//         success: false,
//         message: "ItemId and size are required",
//       });
//     }

//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const cartData = user.cartData || {};
//     if (!cartData[itemId]) cartData[itemId] = {};
//     cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

//     const updatedUser = await userModel.findByIdAndUpdate(
//       userId,
//       { cartData },
//       { new: true } // ✅ return updated document
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Product added to cart",
//       cartData: updatedUser.cartData,
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };







// // ---------------- UPDATE CART ----------------
// const updateCart = async (req, res) => {
//   try {
//     const { userId, itemId, size, quantity } = req.body;

//     // validation
//     if (!userId || !itemId || !size || quantity === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing required fields",
//       });
//     }

//     // quantity validation
//     if (quantity < 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Quantity cannot be negative",
//       });
//     }

//     // find user
//     const userData = await userModel.findById(userId);

//     if (!userData) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     let cartData = userData.cartData || {};

//     // check product & size exist
//     if (!cartData[itemId] || !cartData[itemId][size]) {
//       return res.status(404).json({
//         success: false,
//         message: "Item not found in cart",
//       });
//     }

//     // if quantity = 0 → remove size
//     if (quantity === 0) {
//       delete cartData[itemId][size];

//       // if no sizes left → remove product
//       if (Object.keys(cartData[itemId]).length === 0) {
//         delete cartData[itemId];
//       }
//     } 
//     // update quantity
//     else {
//       cartData[itemId][size] = quantity;
//     }

//     // update database
//     await userModel.findByIdAndUpdate(userId, { cartData });

//     return res.status(200).json({
//       success: true,
//       message: "Cart updated successfully",
//       cartData,
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // GET USER CART
// const getUserCart = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const user = await userModel.findById(userId);

//     res.json({
//       success: true,
//       cartData: user.cartData
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export {addToCart,  updateCart, getUserCart}


import userModel from "../models/userModel.js";

// ---------------- ADD TO CART ----------------
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Always from JWT
    const { itemId, size } = req.body;

    if (!itemId || !size) {
      return res.status(400).json({
        success: false,
        message: "ItemId and size are required",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = user.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true } // ✅ return updated document
    );

    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ---------------- UPDATE CART ----------------
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Secure: always from JWT
    const { itemId, size, quantity } = req.body;

    // validation
    if (!itemId || !size || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = user.cartData || {};

    // check product & size exist
    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ---------------- GET USER CART ----------------
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      cartData: user.cartData || {},
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
