import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import AppError from '../../../errors/AppError';
import OrderModel from './order.model';
import { orderService } from './order.service';

// Get all orders
const getOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getOrders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

// Get a single order
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const result = await orderService.getSingleOrder(orderId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

// Create a new order
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;

  // Log the incoming body to show the data that is being created
  console.log('Received data for order creation:', body);

  // Call the service to create the order
  const newOrder = await orderService.createOrder(body);

  // Log the created order (optional, to check the result)
  console.log('Order created successfully:', newOrder);

  // Send response back to the client
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order created successfully',
    data: newOrder,
  });
});

// Update an order
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid order ID');
  }

  const updatedOrder = await orderService.updateOrder(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order updated successfully',
    data: updatedOrder,
  });
});

// Delete an order
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid order ID');
  }

  const deletedOrder = await OrderModel.findByIdAndDelete(id);

  if (!deletedOrder) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Order not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order deleted successfully',
    data: deletedOrder,
  });
});

export const orderController = {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
