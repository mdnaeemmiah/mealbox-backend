"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealProviderValidationSchema = void 0;
const zod_1 = require("zod");
// Zod validation schema for MealProvider
exports.MealProviderValidationSchema = zod_1.z.object({
    id: zod_1.z.string().min(1, 'ID is required').max(255, 'ID is too long'),
    name: zod_1.z.string().min(1, 'Name is required').max(255, 'Name is too long'),
    cuisineSpecialties: zod_1.z.array(zod_1.z.string()).nonempty('Cuisine specialties cannot be empty'),
    availableMealOptions: zod_1.z.array(zod_1.z.string()).nonempty('Available meal options cannot be empty'),
    pricing: zod_1.z
        .number({ required_error: "Pricing is required" }) // Ensures it's a number
        .min(0, "Pricing must be at least 0") // Prevents negative values
        .default(0),
    experience: zod_1.z.number().int().positive('Experience must be a positive integer'),
    customerReviews: zod_1.z.object({
        rating: zod_1.z.number().min(0, 'Rating must be between 0 and 5').max(5, 'Rating must be between 0 and 5'),
        reviewsCount: zod_1.z.number().int().nonnegative('Reviews count cannot be negative'),
        comments: zod_1.z.array(zod_1.z.string()).nonempty('Comments cannot be empty'),
    }),
    location: zod_1.z.string().optional(),
    contactInfo: zod_1.z.object({
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email('Invalid email address'),
        website: zod_1.z.string().url('Invalid website URL').optional(),
    }),
});
