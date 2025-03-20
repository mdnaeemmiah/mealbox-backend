"use strict";
// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"; // Importing jsonwebtoken
// import { User } from "./auth.model"; // Assuming the User model is correctly imported
// import config from "../../config";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importing jsonwebtoken
const auth_model_1 = require("./auth.model"); // Assuming the User model is correctly imported
const config_1 = __importDefault(require("../../config"));
const randomPass = Math.ceil(Math.random() * 1000000);
// Secret key for JWT
const jwtSecret = config_1.default.jwt_access_secret || 'yourSecretKey'; // Ideally, this should be in your environment variables.
// Register User function
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, role, password } = req.body;
        // Validate input data
        // if (!name || !email || !role) {
        //   res.status(400).json({ message: "Name, email, and role are required." });
        //   return;
        // }
        const userPassword = password || randomPass;
        // Check if user already exists
        const existingUser = yield auth_model_1.User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists." });
            return;
        }
        // Hash the password before saving
        const hashedPassword = yield bcryptjs_1.default.hash(userPassword, 10);
        // Create new user
        const user = new auth_model_1.User({
            name,
            email,
            role,
            password: hashedPassword,
        });
        console.log("User object before saving:", user); // Log user data before saving
        // Save user to database
        yield user.save();
        // Create a JWT token
        const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, jwtSecret, {
            expiresIn: '365d', // The token will expire in 365 days
        });
        res.status(201).json({
            message: "User registered successfully",
            user: { name: user.name, email: user.email, role: user.role },
            token, // Send the token along with the user data
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error during registration." });
    }
});
exports.registerUser = registerUser;
// Login User function
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log("Received email:", email); // Log received email during login
        // Validate input data
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }
        // Check if user exists
        const user = yield auth_model_1.User.findOne({ email });
        if (!user) {
            console.log("User not found for email:", email); // Log if user is not found
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }
        console.log("User found:", user); // Log user object for debugging
        // Validate password (if needed, uncomment these lines)
        // const isMatch = await bcrypt.compare(password, user.password);
        // console.log("Password comparison result:", isMatch); // Log comparison result
        // if (!isMatch) {
        //   console.log("Password mismatch for email:", email);  // Log password mismatch
        //   res.status(400).json({ message: "Invalid email or password" });
        //   return;
        // }
        // Create a JWT token
        const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, jwtSecret, {
            expiresIn: '365d', // Token expires in 365 days
        });
        res.status(200).json({
            message: "Login successful",
            user: { name: user.name, email: user.email, role: user.role },
            token, // Send the token in the response
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
});
exports.loginUser = loginUser;
