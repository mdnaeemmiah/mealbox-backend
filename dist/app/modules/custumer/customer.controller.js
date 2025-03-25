"use strict";
// import { StatusCodes } from 'http-status-codes';
// import { Request, Response } from 'express';
// import mongoose from 'mongoose';
// import catchAsync from '../../../utils/catchAsync';
// import sendResponse from '../../../utils/sendResponse';
// import AppError from '../../../errors/AppError';
// import { customerService } from './custumer.service';
// import { Customer } from './custumer.model';
// const getCustomer = catchAsync(async (req: Request, res: Response) => {
//   const result = await customerService.getCustomer();
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Customers retrieved successfully',
//     data: result,
//   });
// });
// const getSingleCustomer = catchAsync(async (req: Request, res: Response) => {
//   const customerId = req.params.customerId;
//   const result = await customerService.getSingleCustomer(customerId);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Customer retrieved successfully',
//     data: result,
//   });
// });
// const updateCustomer = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const body = req.body;
//   const result = await customerService.updateCustomer(id, body);
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: 'Customer updated successfully',
//     data: result,
//   });
// });
// const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid customer ID');
//   }
//   const deletedCustomer = await Customer.findByIdAndDelete(id);
//   if (!deletedCustomer) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'Customer not found');
//   }
//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     message: 'Customer deleted successfully',
//     data: deletedCustomer,
//   });
// });
// const changeStatus = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid customer ID');
//   }
//   const updatedCustomer = await Customer.findByIdAndUpdate(
//     id,
//     { status },
//     { new: true }
//   );
//   if (!updatedCustomer) {
//     throw new AppError(StatusCodes.BAD_REQUEST, 'Customer not found');
//   }
//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     message: 'Customer status updated successfully',
//     data: updatedCustomer,
//   });
// });
// export const customerController = {
//   getCustomer,
//   getSingleCustomer,
//   updateCustomer,
//   deleteCustomer,
//   changeStatus,
// };
