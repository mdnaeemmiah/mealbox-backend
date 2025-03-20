// import { Request, Response } from "express";
// import * as userService from "./user.service";
// // import { AuthenticatedRequest } from "../payment/payment.controller";

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

import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';
import { Request, Response } from 'express';
import { User } from './user.model';
import mongoose from 'mongoose';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import AppError from '../../../errors/AppError';


const getUser = catchAsync(async (req, res) => {
  const result = await userService.getUser();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users getting successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  console.log(req.params);
  const userId = req.params.userId;

  const result = await userService.getSingleUser(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User getting successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const {id} = req.params;
  const body = req.body;
  const result = await userService.updateUser(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid user ID');
  }

  const deletedUser = await User.findByIdAndDelete(id); // Physically delete the user

  if (!deletedUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: deletedUser,
  });
});


export const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid user ID');
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { status }, // Update the status
    { new: true } // Return the updated document
  );

  if (!updatedUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Status updated successfully',
    data: updatedUser,
  });
});

export const userController = {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
  changeStatus
};
