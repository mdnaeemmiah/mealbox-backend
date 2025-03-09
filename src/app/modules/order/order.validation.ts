import { z } from 'zod';

// Validation schema for meal selection
const mealSelectionSchema = z.array(z.string()).min(1, 'At least one meal should be selected.');

// Validation schema for dietary preferences
const dietaryPreferencesSchema = z.array(z.string()).min(1, 'At least one dietary preference should be provided.');

// Validation schema for status
const statusSchema = z.enum(['pending', 'in progress', 'delivered']);

// Validation schema for the Order model
export const orderValidationSchema = z.object({
  id: z.string().uuid('Invalid ID format'), // Assuming UUID for order ID, otherwise, you can change this to `z.string()`
  mealSelection: mealSelectionSchema,
  dietaryPreferences: dietaryPreferencesSchema,
  customerId: z.string().uuid('Invalid Customer ID format'), // Assuming UUID for customer ID
  status: statusSchema,
  orderDate: z.date(),
  deliveryDate: z.date().optional(),
});

