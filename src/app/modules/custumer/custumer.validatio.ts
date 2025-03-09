import { z } from 'zod';
import { CustomerStatus } from './custumer.constant';

// Define the Zod schema
export const CustomerValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .nonempty({ message: 'Name is required' })
      .trim(),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    role: z.enum(['admin', 'customer','mealProvider']).default('customer'),
    isBlocked: z.boolean().default(false),
  }),
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...CustomerStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
    CustomerValidationSchema,
  changeStatusValidationSchema
};
