"use strict";
// import { NextFunction, Request, Response } from 'express';
// import httpStatus from 'http-status';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import AppError from '../errors/AppError';
// import config from '../app/config';
// import catchAsync from '../utils/catchAsync';
// import { ICustomerRole } from '../app/modules/custumer/custumer.interface';
// import { Customer } from '../app/modules/custumer/custumer.model';
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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../app/config"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth_model_1 = require("../app/modules/auth/auth.model");
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Get token after "Bearer"
        // Checking if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
        }
        try {
            // Checking if the given token is valid
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            const { role, email } = decoded;
            console.log("Decoded JWT:", decoded); // Log the decoded JWT payload
            // Check if user exists in the database
            const user = yield auth_model_1.User.findOne({ email }); // Ensure you are using the correct model
            if (!user) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "This user is not found !");
            }
            if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized to access this resource.");
            }
            req.user = user; // Attach user to the request object
            next();
        }
        catch (error) {
            console.error("JWT verification error:", error);
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid or expired token");
        }
    }));
};
exports.default = auth;
