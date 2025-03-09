import OrderModel from './order.model';
import { IOrder } from './order.interface';
import AppError from '../../../errors/AppError';
import mongoose from 'mongoose';

// Get all orders
const getOrders = async () => {
  try {
    const orders = await OrderModel.find();
    return orders;
  } catch (error) {
    throw new AppError(500, 'Error retrieving orders');
  }
};

// Get a single order by its ID
const getSingleOrder = async (orderId: string) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError(400, 'Invalid order ID');
  }

  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new AppError(404, 'Order not found');
    }
    return order;
  } catch (error) {
    throw new AppError(500, 'Error retrieving the order');
  }
};

// Create a new order
const createOrder = async (data: IOrder) => {
  try {
    const newOrder = new OrderModel(data);
    await newOrder.save();
    return newOrder;
  } catch (error) {
    throw new AppError(500, 'Error creating order');
  }
};

// Update an existing order
const updateOrder = async (orderId: string, data: IOrder) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError(400, 'Invalid order ID');
  }

  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, data, { new: true });
    if (!updatedOrder) {
      throw new AppError(404, 'Order not found');
    }
    return updatedOrder;
  } catch (error) {
    throw new AppError(500, 'Error updating the order');
  }
};

// Delete an order by its ID
const deleteOrder = async (orderId: string) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError(400, 'Invalid order ID');
  }

  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      throw new AppError(404, 'Order not found');
    }
    return deletedOrder;
  } catch (error) {
    throw new AppError(500, 'Error deleting the order');
  }
};

export const orderService = {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
