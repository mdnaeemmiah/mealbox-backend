import { z } from "zod";
import { CustomerStatus } from "./custumer.constant";

// Define the Zod schema
export const CustomerValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(50, { message: "Name must be at most 50 characters long" })
      .nonempty({ message: "Name is required" })
      .trim(),

    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .trim(),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must have at least one uppercase letter, one number, and one special character",
        }
      ),

    role: z.enum(["admin", "customer", "mealProvider"]).default("customer"),

    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message: "Invalid phone number format. Use an international format.",
      })
      .optional()
      .or(z.literal("")),

    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters long" })
      .max(100, { message: "Address cannot exceed 100 characters" })
      .trim()
      .optional()
      .or(z.literal("")),

    city: z
      .string()
      .min(2, { message: "City must be at least 2 characters long" })
      .max(50, { message: "City cannot exceed 50 characters" })
      .trim()
      .optional()
      .or(z.literal("")),

    isBlocked: z.boolean().default(false),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...CustomerStatus] as [string, ...string[]], {
      message: "Invalid status value",
    }),
  }),
});

export const UserValidation = {
  CustomerValidationSchema,
  changeStatusValidationSchema,
};
