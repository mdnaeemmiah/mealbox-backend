// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import { User } from "./auth.model";

// const randomPass = Math.ceil(Math.random()*1000000);

// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { name, email,role } = req.body;

//     const password = req.body.password || randomPass;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//        res.status(400).json({ message: "User already exists" });
//        return;
//     }

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       role,
//       password,
//     });

//     // Save user to database
//     await user.save();

//     res.status(201).json({ message: "User registered successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };

// export const loginUser = async (req: Request, res: Response) => {
//     try {
//       const { email, password } = req.body;
  
//       // Check if user exists
//       const user = await User.findOne({ email });
//       if (!user) {
//          res.status(400).json({ message: "Invalid email or password" });
//          return;
//       }
  
//       // Validate password
//       const isMatch = await bcrypt.compare(password, user!.password);
//       if (!isMatch) {
//          res.status(400).json({ message: "Invalid email or password" });
//          return;
//       }
  
  
//       res.status(200).json({ message: "Login successful", user:{name:user?.name,email:user?.email,role:user?.role} });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error });
//     }
//   };



import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Importing jsonwebtoken
import { User } from "./auth.model"; // Assuming the User model is correctly imported
import config from "../../config";

const randomPass = Math.ceil(Math.random() * 1000000);

// Secret key for JWT
const jwtSecret = config.jwt_access_secret || 'yourSecretKey';  // Ideally, this should be in your environment variables.

// Register User function
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, role, password } = req.body;

    // Validate input data
    // if (!name || !email || !role) {
    //   return res.status(400).json({ message: "Name, email, and role are required." });
    // }

    const userPassword = password || randomPass;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Create new user
    const user = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    console.log("User object before saving:", user); // Log user data before saving

    // Save user to database
    await user.save();

    // Create a JWT token
    const token = jwt.sign({ email: user.email, role: user.role }, jwtSecret, {
      expiresIn: '365d', // The token will expire in 1 hour
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { name: user.name, email: user.email, role: user.role },
      token, // Send the token along with the user data
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration."});
  }
};

// Login User function
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("Received email:", email);  // Log received email during login

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email); // Log if user is not found
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user);  // Log user object for debugging

    // Validate password
    // const isMatch = await bcrypt.compare(password, user.password);
    // console.log("Password comparison result:", isMatch); // Log comparison result
    
    // if (!isMatch) {
    //   console.log("Password mismatch for email:", email);  // Log password mismatch
    //   return res.status(400).json({ message: "Invalid email or password" });
    // }

    // Create a JWT token
    const token = jwt.sign({ email: user.email, role: user.role }, jwtSecret, {
      expiresIn: '365d', // Token expires in 1 hour
    });

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email, role: user.role },
      token, // Send the token in the response
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};
