"use strict";
// import { Router } from 'express';
// import { loginUser, registerUser } from './auth.controllers';
Object.defineProperty(exports, "__esModule", { value: true });
// const authRouter = Router();
// authRouter.post('/login', loginUser)
// authRouter.post('/register', registerUser)
// export default authRouter;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const authRouter = (0, express_1.Router)();
// Register routes
authRouter.post('/login', auth_controllers_1.loginUser);
authRouter.post('/register', auth_controllers_1.registerUser);
exports.default = authRouter;
