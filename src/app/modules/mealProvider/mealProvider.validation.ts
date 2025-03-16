import { z } from 'zod';

// Zod validation schema for MealProvider
export const MealProviderValidationSchema = z.object({
  id: z.string().min(1, 'ID is required').max(255, 'ID is too long'),
  name: z.string().min(1, 'Name is required').max(255, 'Name is too long'),
  cuisineSpecialties: z.array(z.string()).nonempty('Cuisine specialties cannot be empty'),
  availableMealOptions: z.array(z.string()).nonempty('Available meal options cannot be empty'),
  pricing:  z
  .number({ required_error: "Pricing is required" }) // Ensures it's a number
  .min(0, "Pricing must be at least 0") // Prevents negative values
  .default(0),
  experience: z.number().int().positive('Experience must be a positive integer'),
  customerReviews: z.object({
    rating: z.number().min(0, 'Rating must be between 0 and 5').max(5, 'Rating must be between 0 and 5'),
    reviewsCount: z.number().int().nonnegative('Reviews count cannot be negative'),
    comments: z.array(z.string()).nonempty('Comments cannot be empty'),
  }),
  location: z.string().optional(),
  contactInfo: z.object({
    phone: z.string().optional(),
    email: z.string().email('Invalid email address'),
    website: z.string().url('Invalid website URL').optional(),
  }),
});