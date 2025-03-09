
import AppError from '../../../errors/AppError';
import mongoose from 'mongoose';
import MealProviderModel from './mealProvider.model';

export const mealProviderService = {
  // Get all meal providers
  getMealProviders: async () => {
    try {
      const mealProviders = await MealProviderModel.find();
      return mealProviders;
    } catch (error) {
      throw new AppError(500, 'Error retrieving meal providers');
    }
  },

  // Get a single meal provider by ID
  getSingleMealProvider: async (mealProviderId: string) => {
    if (!mongoose.Types.ObjectId.isValid(mealProviderId)) {
      throw new AppError(400, 'Invalid meal provider ID');
    }

    try {
      const mealProvider = await MealProviderModel.findById(mealProviderId);

      if (!mealProvider) {
        throw new AppError(404, 'Meal provider not found');
      }

      return mealProvider;
    } catch (error) {
      throw new AppError(500, 'Error retrieving meal provider');
    }
  },

// Create a new meal provider
createMealProvider: async (data: any) => {
    try {
      // Log the incoming data for debugging
      console.log('Creating meal provider with data:', data);
  
      const newMealProvider = new MealProviderModel(data);
      await newMealProvider.save();
  
      // Optionally log the saved meal provider after it's created
      console.log('Meal provider created:', newMealProvider);
  
      return newMealProvider;
    } catch (error) {
      console.error('Error creating meal provider:', error);
      throw new AppError(500, 'Error creating meal provider');
    }
  },
  
  // Update an existing meal provider by ID
  updateMealProvider: async (mealProviderId: string, data: any) => {
    if (!mongoose.Types.ObjectId.isValid(mealProviderId)) {
      throw new AppError(400, 'Invalid meal provider ID');
    }

    try {
      const updatedMealProvider = await MealProviderModel.findByIdAndUpdate(
        mealProviderId,
        data,
        { new: true } // Return the updated meal provider
      );

      if (!updatedMealProvider) {
        throw new AppError(404, 'Meal provider not found');
      }

      return updatedMealProvider;
    } catch (error) {
      throw new AppError(500, 'Error updating meal provider');
    }
  },

  // Delete a meal provider by ID
  deleteMealProvider: async (mealProviderId: string) => {
    if (!mongoose.Types.ObjectId.isValid(mealProviderId)) {
      throw new AppError(400, 'Invalid meal provider ID');
    }

    try {
      const deletedMealProvider = await MealProviderModel.findByIdAndDelete(mealProviderId);

      if (!deletedMealProvider) {
        throw new AppError(404, 'Meal provider not found');
      }

      return deletedMealProvider;
    } catch (error) {
      throw new AppError(500, 'Error deleting meal provider');
    }
  },
};
