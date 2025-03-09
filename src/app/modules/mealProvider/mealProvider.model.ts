import mongoose, { Schema } from 'mongoose';
import { IMealProvider } from './mealProvider.interface';


// Define the MealProvider schema
const MealProviderSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cuisineSpecialties: { type: [String], required: true },
    availableMealOptions: { type: [String], required: true },
    pricing: {
      priceRange: { type: String, required: true },
      perServing: { type: Number, required: true },
    },
    experience: { type: Number, required: true },
    customerReviews: {
      rating: { type: Number, required: true },
      reviewsCount: { type: Number, required: true },
      comments: { type: [String], required: true },
    },
    location: { type: String },
    contactInfo: {
      phone: { type: String },
      email: { type: String, required: true },
      website: { type: String },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the MealProvider model
const MealProviderModel = mongoose.model<IMealProvider>('MealProvider', MealProviderSchema);

export default MealProviderModel;
