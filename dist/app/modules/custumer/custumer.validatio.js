"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = exports.CustomerValidationSchema = void 0;
const zod_1 = require("zod");
const custumer_constant_1 = require("./custumer.constant");
// Define the Zod schema
exports.CustomerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, { message: "Name must be at least 3 characters long" })
            .max(50, { message: "Name must be at most 50 characters long" })
            .nonempty({ message: "Name is required" })
            .trim(),
        email: zod_1.z
            .string()
            .email({ message: "Please enter a valid email address" })
            .trim(),
        password: zod_1.z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" })
            .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: "Password must have at least one uppercase letter, one number, and one special character",
        }),
        role: zod_1.z.enum(["admin", "customer", "mealProvider"]).default("customer"),
        phone: zod_1.z
            .string()
            .regex(/^\+?[1-9]\d{1,14}$/, {
            message: "Invalid phone number format. Use an international format.",
        })
            .optional()
            .or(zod_1.z.literal("")),
        address: zod_1.z
            .string()
            .min(5, { message: "Address must be at least 5 characters long" })
            .max(100, { message: "Address cannot exceed 100 characters" })
            .trim()
            .optional()
            .or(zod_1.z.literal("")),
        city: zod_1.z
            .string()
            .min(2, { message: "City must be at least 2 characters long" })
            .max(50, { message: "City cannot exceed 50 characters" })
            .trim()
            .optional()
            .or(zod_1.z.literal("")),
        isBlocked: zod_1.z.boolean().default(false),
    }),
});
const changeStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([...custumer_constant_1.CustomerStatus], {
            message: "Invalid status value",
        }),
    }),
});
exports.UserValidation = {
    CustomerValidationSchema: exports.CustomerValidationSchema,
    changeStatusValidationSchema,
};
