// import validator from "validator";
// import bcrypt from "bcrypt"
// import userModal from "../models/userModal.js";


// const createToken = (id) => {
//     return jwt.sign({id},process.env.JWT_SECRET)
// }

// //Route for user login
// const loginUser = async (req,res) => {

// }

// //Route for user register
// const registerUser = async (req,res) =>{

//    try {
//     const {name, email, password} = req.body;

//     //checking user already exist or Not
//     const exist = await userModal.findOne({email});

//     if (exists){
//         return res.json({success: false, message:"User already exists"})
//     }

//     //validating email format & strong password
//     if (!validator.isEmail(email)){
//      return res.json({success: false, message:"Please enter a valid email"})
//     }

//     if (password.length < 8){
//      return res.json({success: false, message:"Please enter a stronge password"})
//     }

//     //Hashing user password
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt)

//     const newUser = new userModal({
//         name,
//         email,
//         password: hashedPassword
//     })

//     const user = await newUser.save()

//     const token = createToken(user._id)

//     res.json({success:true, token})

//    } catch (error) {
//     console.log(error);
//     res.json({success:false, message:error.message})
    
//    }

// }

// //Route for admin login
// const adminLogin = async (req,res) =>{

// }

// export {loginUser, registerUser, adminLogin}


import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // ✅ Missing import
import User from "../models/userModel.js"; // ✅ Ensure folder is 'models', not 'modals'

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Route for user login (currently empty)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Create token
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for user register
const registerUser = async (req, res) => {
    const { name, email, password } = req.body || {};
    if(!name || !email || !password){
        return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    try {
        // Checking if user already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        // Create token
        const token = createToken(user._id);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}




const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "dahriwaheed43@gmail.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "waheed@09";
    const JWT_SECRET = process.env.JWT_SECRET || "Waheed@JWT";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {

      const token = jwt.sign(
        {
          email,
          role: "admin" // ✅ THIS LINE FIXES EVERYTHING
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        success: true,
        token
      });

    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default adminLogin;

export { loginUser, registerUser, adminLogin };
