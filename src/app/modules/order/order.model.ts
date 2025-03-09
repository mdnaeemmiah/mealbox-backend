import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from './order.interface';

// Define the Order schema
const OrderSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true }, // Unique identifier for the order
    mealSelection: { type: [String], required: true }, // Array of selected meals
    dietaryPreferences: { type: [String], required: true }, // Array of dietary preferences
    customerId: { type: String, required: true }, // Customer ID who placed the order
    status: {
      type: String,
      enum: ['pending', 'in progress', 'delivered'],
      default: 'pending', // Default status is pending
    },
    orderDate: { type: Date, required: true, default: Date.now }, // Date when the order was placed
    deliveryDate: { type: Date }, // Optional: Date when the order was delivered
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Order model
const OrderModel = mongoose.model<IOrder & Document>('Order', OrderSchema);

export default OrderModel;
