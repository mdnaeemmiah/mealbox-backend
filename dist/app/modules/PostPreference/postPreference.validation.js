"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPreferenceValidationSchema = void 0;
const zod_1 = require("zod");
// Zod validation schema for PostPreference
exports.PostPreferenceValidationSchema = zod_1.z.object({
    mealSelection: zod_1.z.array(zod_1.z.string()).nonempty('Meal selection cannot be empty'),
    dietaryPreferences: zod_1.z.array(zod_1.z.string()).nonempty('Dietary preferences cannot be empty'),
    customerId: zod_1.z.string().min(1, 'Customer ID is required').max(255, 'Customer ID is too long'),
    deliveryDate: zod_1.z.string().optional().nullable(),
});
