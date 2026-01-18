
// import jwt from 'jsonwebtoken';

// const adminAuth = async (req, res, next) => {
//     try {
//         const { token } = req.headers;
//         if (!token) return res.status(401).json({ success: false, message: "Unauthorized, login again" });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Check decoded token matches admin credentials
//         if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.status(401).json({ success: false, message: "Unauthorized, login again" });
//         }

//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ success: false, message: "Unauthorized, login again" });
//     }
// };

// export default adminAuth;

import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // use "Bearer <token>"
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, login again"
      });
    }

    const token = authHeader.split(" ")[1]; // extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check admin role
    if (decoded.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Admin access only"
      });
    }

    // Attach admin info to request
    // req.adminId = decoded.id;
    req.adminEmail = decoded.email;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

export default adminAuth;
