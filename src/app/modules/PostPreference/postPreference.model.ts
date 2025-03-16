import mongoose, { Schema } from 'mongoose';
import { IPostPreference } from './postPreference.interface';



// Define the PostPreference schema
const PostPreferenceSchema: Schema = new Schema(
  {
    mealSelection: { type: [String], required: true },
    dietaryPreferences: { type: [String], required: true },
    customerId: { type: String, required: true, index: true }, // Indexed for efficient queries
    deliveryDate: { type: String, default: null }, // Nullable field
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the PostPreference model
const PostPreferenceModel = mongoose.model<IPostPreference>('PostPreference', PostPreferenceSchema);

export default PostPreferenceModel;
