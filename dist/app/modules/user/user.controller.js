"use strict";
// import { Request, Response } from "express";
// import * as userService from "./user.service";
// // import { AuthenticatedRequest } from "../payment/payment.controller";
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
exports.userController = exports.changeStatus = exports.deleteUser = void 0;
// //get user
// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await userService.getAllUsers();
//     res.status(200).json({
//       success: true,
//       message: "Users retrieved successfully",
//       users,
//     });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };
// //get single user
// export const singleUser = async (req: Request, res: Response) => {
//   try {
//     const user = await userService.getSingleUser(req.params.id);
//     res.status(200).json({ message: "User retrieved successfully", user });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };
// //update user
// // export const updateProfile = async (
// //   req: AuthenticatedRequest,
// //   res: Response
// // ) => {
// //   try {
// //     const { userId } = req.params;
// //     const updatedUser = await userService.updateUserProfile(userId, req.body);
// //     res.status(200).json({
// //       success: true,
// //       message: "Profile updated successfully",
// //       updatedUser,
// //     });
// //   } catch (error: any) {
// //     res.status(400).json({ message: error.message });
// //   }
// // };
// export const updateRole = async (req: Request, res: Response) => {
//   try {
//     const updatedUser = await userService.updateUserRole(
//       req.params.id,
//       req.body.role
//     );
//     res.status(200).json({
//       success: true,
//       message: "Role is updated successfully",
//       updatedUser,
//     });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };
// //delete
// export const removeUser = async (req: Request, res: Response) => {
//   try {
//     await userService.deleteUser(req.params.id);
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };
// req and res manage
const http_status_codes_1 = require("http-status-codes");
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const getUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getUser();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Users getting successfully',
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const userId = req.params.userId;
    const result = yield user_service_1.userService.getSingleUser(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User getting successfully',
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    const result = yield user_service_1.userService.updateUser(id, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
}));
exports.deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid user ID');
    }
    const deletedUser = yield user_model_1.User.findByIdAndDelete(id); // Physically delete the user
    if (!deletedUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'User deleted successfully',
        data: deletedUser,
    });
}));
exports.changeStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid user ID');
    }
    const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, { status }, // Update the status
    { new: true } // Return the updated document
    );
    if (!updatedUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Status updated successfully',
        data: updatedUser,
    });
}));
exports.userController = {
    getUser,
    getSingleUser,
    updateUser,
    deleteUser: exports.deleteUser,
    changeStatus: exports.changeStatus
};
