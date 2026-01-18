// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   cartData: { type: Object, default: {} }, // ✅ Cart data as object
//   cartItems: { type: Object, default: {} }
// });

// // Create the model
// const userModel = mongoose.model("User", userSchema);

// // Export it
// export default userModel;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  cartData: { type: Object, default: {} } // ✅ comma added
 
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
