


// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"; // Importing jsonwebtoken
// import { User } from "./auth.model"; // Assuming the User model is correctly imported
// import config from "../../config";

// const randomPass = Math.ceil(Math.random() * 1000000);

// // Secret key for JWT
// const jwtSecret = config.jwt_access_secret || 'yourSecretKey';  // Ideally, this should be in your environment variables.

// // Register User function
// export const registerUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { name, email, role, password } = req.body;

//     // Validate input data
//     // if (!name || !email || !role) {
//     //   return res.status(400).json({ message: "Name, email, and role are required." });
//     // }

//     const userPassword = password || randomPass;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User with this email already exists." });
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(userPassword, 10);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       role,
//       password: hashedPassword,
//     });

//     console.log("User object before saving:", user); // Log user data before saving

//     // Save user to database
//     await user.save();

//     // Create a JWT token
//     const token = jwt.sign({ email: user.email, role: user.role }, jwtSecret, {
//       expiresIn: '365d', // The token will expire in 1 hour
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: { name: user.name, email: user.email, role: user.role },
//       token, // Send the token along with the user data
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ message: "Server error during registration."});
//   }
// };

// // Login User function
// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;
//     console.log("Received email:", email);  // Log received email during login

//     // Validate input data
//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required." });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found for email:", email); // Log if user is not found
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     console.log("User found:", user);  // Log user object for debugging

//     // Validate password
//     // const isMatch = await bcrypt.compare(password, user.password);
//     // console.log("Password comparison result:", isMatch); // Log comparison result
    
//     // if (!isMatch) {
//     //   console.log("Password mismatch for email:", email);  // Log password mismatch
//     //   return res.status(400).json({ message: "Invalid email or password" });
//     // }

//     // Create a JWT token
//     const token = jwt.sign({ email: user.email, role: user.role }, jwtSecret, {
//       expiresIn: '365d', // Token expires in 1 hour
//     });

//     res.status(200).json({
//       message: "Login successful",
//       user: { name: user.name, email: user.email, role: user.role },
//       token, // Send the token in the response
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error during login." });
//   }
// };


// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"; // Importing jsonwebtoken
// import { User } from "./auth.model"; // Assuming the User model is correctly imported
// import config from "../../config";
// import catchAsync from "../../../utils/catchAsync";
// import sendResponse from "../../../utils/sendResponse";
// import { StatusCodes } from "http-status-codes";
// import { AuthService } from "./auth.service";

// const randomPass = Math.ceil(Math.random() * 1000000);

// // Secret key for JWT
// const jwtSecret = config.jwt_access_secret || 'yourSecretKey';  // Ideally, this should be in your environment variables.

// // Register User function
// export const registerUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { name, email, role, password } = req.body;

//     // Validate input data
//     // if (!name || !email || !role) {
//     //   res.status(400).json({ message: "Name, email, and role are required." });
//     //   return;
//     // }

//     const userPassword = password || randomPass;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       res.status(400).json({ message: "User with this email already exists." });
//       return;
//     }

//     // Hash the password before saving
//     const hashedPassword = await bcrypt.hash(userPassword, 10);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       role,
//       password: hashedPassword,
//     });

//     console.log("User object before saving:", user); // Log user data before saving

//     // Save user to database
//     await user.save();

//     // Create a JWT token
//     const token = jwt.sign({ email: user.email, role: user.role }, jwtSecret, {
//       expiresIn: '365d', 
//     });

//     res.status(201).json({
//       message: "User registered successfully",
//       user: { name: user.name, email: user.email, role: user.role },
//       token, // Send the token along with the user data
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ message: "Server error during registration." });
//   }
// };

// // Login User function
// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { email, password } = req.body;
//     console.log("Received email:", email);  // Log received email during login

//     // Validate input data
//     if (!email || !password) {
//       res.status(400).json({ message: "Email and password are required." });
//       return;
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log("User not found for email:", email); // Log if user is not found
//       res.status(400).json({ message: "Invalid email or password" });
//       return;
//     }

//     console.log("User found:", user);  // Log user object for debugging

//     // Validate password (if needed, uncomment these lines)
//     // const isMatch = await bcrypt.compare(password, user.password);
//     // console.log("Password comparison result:", isMatch); // Log comparison result
//     // if (!isMatch) {
//     //   console.log("Password mismatch for email:", email);  // Log password mismatch
//     //   res.status(400).json({ message: "Invalid email or password" });
//     //   return;
//     // }

//     // Create a JWT token
//     const token = jwt.sign({ email: user.email, role: user.role }, jwtSecret, {
//       expiresIn: '365d', // Token expires in 365 days
//     });

//     res.status(200).json({
//       message: "Login successful",
//       user: { name: user.name, email: user.email, role: user.role },
//       token, // Send the token in the response
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Server error during login." });
//   }
// };


// export const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthService.refreshToken(refreshToken);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'refreshToken token is retrieved successfully!',
//     data: {
//       result
//     },
//   });
// });









// import { Request, Response } from "express";
// import { StatusCodes } from "http-status-codes";
// import { AuthService } from "./auth.service";
// import config from "../../config";
// import catchAsync from "../../../utils/catchAsync";
// import { User } from "./auth.model";
// import sendResponse from "../../../utils/sendResponse";

// const register = catchAsync(async(req: Request, res: Response)=>{
//     const result = await AuthService.register(req.body);
//     const { name, email, role,password } = req.body;

//     // Default role is 'user', can be 'admin' if specified
//     const newUserRole = role === 'meal-provider' ? 'meal-provider' : 'customer'; 

//     const newUser = new User({
//       name,
//       email,
//       password,
//       role: newUserRole, // Set the role during registration
//     });

//     await newUser.save();
//     sendResponse(res,{
//       statusCode: StatusCodes.ACCEPTED,
//       success: true,
//       message: "User Registered in successfully",
//       data: result
//   })
// })

// const login = catchAsync(async(req: Request, res: Response)=>{
//     const result = await AuthService.login(req.body);

//     const { refreshToken, accessToken } = result;

//     res.cookie('refreshToken', refreshToken, {
//       secure: config.NODE_ENV === 'production',
//       httpOnly: true,
//       sameSite: 'none',
//       maxAge: 1000 * 60 * 60 * 24 * 365,
//     });

//     sendResponse(res,{
//         statusCode: StatusCodes.ACCEPTED,
//         success: true,
//         message: "User logged in successfully",
//         data: {
//             accessToken
//         }
//     })
// })

// const changePassword = catchAsync(async (req, res) => {
//     const { ...passwordData } = req.body;
  
//     const result = await AuthService.changePassword(req.user, passwordData);
//     sendResponse(res, {
//       statusCode: StatusCodes.OK,
//       success: true,
//       message: 'Password is updated successfully!',
//       data: result,
//     });
//   });

//   const refreshToken = catchAsync(async (req, res) => {
//     const { refreshToken } = req.cookies;
//     const result = await AuthService.refreshToken(refreshToken);
  
//     sendResponse(res, {
//       statusCode: StatusCodes.OK,
//       success: true,
//       message: 'refreshToken token is retrieved successfully!',
//       data: {
//         result
//       },
//     });
//   });


// export const AuthControllers = {
//     register,
//     login,
//     changePassword,
//     refreshToken,
// }






// import { Request, Response } from "express";
// import { registerUser, loginUser } from "./auth.service";

// //Register
// export const register = async (req: Request, res: Response) => {
//   try {
//     const user = await registerUser(req.body);
//     res.status(201).json({
//       success: true,
//       message: "User registered successfully. Please log in.",
//       user,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Registration failed. Please try again.",
//     });
//   }
// };

// //Login
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await loginUser(email, password);
//     res.status(200).json({
//       success: true,
//       message: "Login successful!",
//       user,
//     });
//   } catch (error: any) {
//     res.status(401).json({
//       success: false,
//       message: error.message || "Invalid credentials. Please try again.",
//     });
//   }
// };









import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "./auth.service";
import config from "../../config";
import { User } from "../user/user.model";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const register = catchAsync(async(req: Request, res: Response)=>{
    const result = await AuthService.register(req.body);
    const { name, email, role,password } = req.body;

    // Default role is 'user', can be 'admin' if specified
    const newUserRole = role === 'mealProvider' ? 'mealProvider' : 'customer'; 

    const newUser = new User({
      name,
      email,
      password,
      role: newUserRole, // Set the role during registration
    });

    await newUser.save();
    sendResponse(res,{
      statusCode: StatusCodes.ACCEPTED,
      success: true,
      message: "User Registered in successfully",
      data: result
  })
})

const login = catchAsync(async(req: Request, res: Response)=>{
    const result = await AuthService.login(req.body);

    const { refreshToken, accessToken, needsPasswordChange } = result;

    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res,{
        statusCode: StatusCodes.ACCEPTED,
        success: true,
        message: "User logged in successfully",
        data: {
            accessToken,
            needsPasswordChange,
        }
    })
})

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
  
    const result = await AuthService.changePassword(req.user, passwordData);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Password is updated successfully!',
      data: result,
    });
  });

  const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'refreshToken token is retrieved successfully!',
      data: {
        result
      },
    });
  });


export const AuthControllers = {
    register,
    login,
    changePassword,
    refreshToken,
}