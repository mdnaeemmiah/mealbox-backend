import { z } from 'zod';

// Zod validation schema for PostPreference
export const PostPreferenceValidationSchema = z.object({
  mealSelection: z.array(z.string()).nonempty('Meal selection cannot be empty'),
  dietaryPreferences: z.array(z.string()).nonempty('Dietary preferences cannot be empty'),
  customerId: z.string().min(1, 'Customer ID is required').max(255, 'Customer ID is too long'),
  deliveryDate: z.string().optional().nullable(),
});
