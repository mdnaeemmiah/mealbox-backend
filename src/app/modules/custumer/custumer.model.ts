import mongoose, { Schema, Document } from 'mongoose';
import { ICustomer } from './custumer.interface';



export const CustomerStatus = ['in-progress', 'blocked'];

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String},
    address: { type: String},
    status: { type: String, enum: CustomerStatus, default: 'in-progress' },
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
