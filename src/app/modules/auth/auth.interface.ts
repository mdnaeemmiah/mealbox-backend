import { Document } from "mongoose";

// Define the interface for the user
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  method: "credentials" | "github" | "google";
  role: "customer" | "meal-provider" | "admin";
  phone?: string;
  address?: string;
  city?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
