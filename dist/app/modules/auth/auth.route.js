"use strict";
// import { Router } from 'express';
// import { loginUser, registerUser } from './auth.controllers';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const authRouter = Router();
// authRouter.post('/login', loginUser)
// authRouter.post('/register', registerUser)
// export default authRouter;
// import { Router } from 'express';
// import { AuthControllers } from './auth.controllers';
// const authRouter = Router();
// // Register routes
// authRouter.post('/login', AuthControllers.login);
// authRouter.post('/register', AuthControllers.register);
// authRouter.post( '/refresh-token',AuthControllers.refreshToken);
// export default authRouter;
// import express from "express";
// import { login, register } from "./auth.controllers";
// const authRouter = express.Router();
// authRouter.post("/register", register);
// authRouter.post("/login", login);
// export const authRoutes = authRouter;
const express_1 = require("express");
const user_validation_1 = require("../user/user.validation");
const auth_controllers_1 = require("./auth.controllers");
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidation.UserValidationSchema), auth_controllers_1.AuthControllers.register);
authRouter.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controllers_1.AuthControllers.login);
authRouter.post('/change-password', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordValidationSchema), auth_controllers_1.AuthControllers.changePassword);
authRouter.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenValidationSchema), auth_controllers_1.AuthControllers.refreshToken);
exports.default = authRouter;
