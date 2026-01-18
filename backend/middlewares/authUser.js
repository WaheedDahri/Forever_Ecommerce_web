
// import jwt from "jsonwebtoken";


// const authUser = (req, res, next) => {
//    const {token} = req.headers;

//    if (!token) {
//       return res.json({
//         success: false,
//         message: "Unauthorized, login again"
//       });
//    }
   

//      try {
//          const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//          req.body.userid = token_decode.id
//          next()
//      } catch (error) {
//         console.log(error);
//         res.json({
//         success: false,
//         message: error.message
//       });
//      }
// };

// export default authUser;

// import jwt from "jsonwebtoken";

// const authUser = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized, login again"
//       });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = { id: decoded.id }; // ✅ attach to req.user
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({
//       success: false,
//       message: "Invalid token"
//     });
//   }
// };

// export default authUser;

// authUser.js

// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader)
//     return res.status(401).json({ success: false, message: "No token" });

//   const token = authHeader.split(" ")[1];
//   if (!token)
//     return res.status(401).json({ success: false, message: "Token missing" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ success: false, message: "Token invalid" });
//   }
// };


import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    next();
  } catch (error) {
    console.error("Auth Error 👉", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};
