import mongoose, { Schema, Document, Model } from "mongoose";
import { ICustomer } from "./custumer.interface";

export const CustomerStatus = ["in-progress", "blocked"];

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Add password field
    role: { type: String, enum: ["mealProvider", "customer", "admin"], required: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    needsPasswordChange: { type: Boolean, default: false },
    passwordChangedAt: { type: Date },
    status: { type: String, enum: CustomerStatus, default: "in-progress" },
    isBlocked: { type: Boolean, default: false } // Add isBlocked field
  },
  {
    timestamps: true,
  }
);

export const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
