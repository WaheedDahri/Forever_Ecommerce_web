// import orderModel from "../models/orderModel.js";

// //placing order using cod method


// import userModel from "../models/userModel.js";

// // placing order using COD method
// const placeOrder = async (req, res) => {
//   try {
//     // authUser middleware se user id aani chahiye
//     const userId = req.user._id;

//     const { items, amount, address } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Cart is empty"
//       });
//     }

//     const orderData = {
//       userId,
//       items,
//       address,
//       amount,
//       paymentMethod: "COD",
//       payment: false,
//       date: Date.now()
//     };

//     const newOrder = new orderModel(orderData);
//     await newOrder.save();

//     // 🔥 Order place hone ke baad cart clear
//     await userModel.findByIdAndUpdate(userId, {
//       cartData: {}
//     });

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order: newOrder
//     });

//   } catch (error) {
//     console.log("Place Order Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Order placement failed"
//     });
//   }
// };





// //placing order using Stripe method
// const placeOrderStripe = async (req, res) =>{

// }

// //placing order using Razorpay method
// const placeOrderRazorpay = async (req, res) =>{

// }

// //all data order for admin penal
// const allOrders = async (req, res) =>{

// }

// //user order data for frontend 
// const userOrders = async (req, res) =>{

// }

// //update order status from admin penal
// const updateStatus = async (req, res) =>{

// }

// export {placeOrder, placeOrderStripe, placeOrderRazorpay,  allOrders, userOrders, updateStatus}


import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// ================================
// PLACE ORDER (CASH ON DELIVERY)
// ================================
const placeOrder = async (req, res) => {
  try {
    // user id from auth middleware
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { items, amount, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    });

    await newOrder.save();

    // clear cart after order
    await userModel.findByIdAndUpdate(userId, {
      cartData: {}
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });

  } catch (error) {
    console.error("PLACE ORDER ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ================================
// PLACE ORDER (STRIPE)
// ================================
const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { items, amount, address } = req.body;

    if (!userId) return res.status(401).json({ success: false });

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "STRIPE",
      payment: true,
      date: Date.now()
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      cartData: {}
    });

    res.status(201).json({
      success: true,
      message: "Stripe order placed successfully",
      order: newOrder
    });

  } catch (error) {
    console.error("STRIPE ORDER ERROR 👉", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// PLACE ORDER (RAZORPAY)
// ================================
const placeOrderRazorpay = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { items, amount, address } = req.body;

    if (!userId) return res.status(401).json({ success: false });

    const newOrder = new orderModel({
      userId,
      items,
      address,
      amount,
      paymentMethod: "RAZORPAY",
      payment: true,
      date: Date.now()
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      cartData: {}
    });

    res.status(201).json({
      success: true,
      message: "Razorpay order placed successfully",
      order: newOrder
    });

  } catch (error) {
    console.error("RAZORPAY ORDER ERROR 👉", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// GET ALL ORDERS (ADMIN)
// ================================
// const allOrders = async (req, res) => {
//   try {
//     const orders = await orderModel.find({}).populate("userId");

//     res.status(200).json({
//       success: true,
//       orders
//     });

//   } catch (error) {
//     console.error("ALL ORDERS ERROR 👉", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// GET ALL ORDERS (ADMIN)
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate("userId");

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    console.error("ALL ORDERS ERROR 👉", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// ================================
// GET USER ORDERS
// ================================
const userOrders = async (req, res) => {
  try {
    const userId = req.user?._id;

    const orders = await orderModel.find({ userId });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error("USER ORDERS ERROR 👉", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================================
// UPDATE ORDER STATUS (ADMIN)
// ================================
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, {
      status
    });

    res.status(200).json({
      success: true,
      message: "Order status updated"
    });

  } catch (error) {
    console.error("UPDATE STATUS ERROR 👉", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus
};
