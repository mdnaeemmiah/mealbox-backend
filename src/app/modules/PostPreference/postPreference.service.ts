import AppError from '../../../errors/AppError';
import mongoose from 'mongoose';
import PostPreferenceModel from './postPreference.model';

export const postPreferenceService = {
  // Get all post preferences
  getPostPreferences: async () => {
    try {
      const postPreferences = await PostPreferenceModel.find();
      return postPreferences;
    } catch (error) {
      throw new AppError(500, 'Error retrieving post preferences');
    }
  },

  // Get a single post preference by ID
  getSinglePostPreference: async (postPreferenceId: string) => {
    if (!mongoose.Types.ObjectId.isValid(postPreferenceId)) {
      throw new AppError(400, 'Invalid post preference ID');
    }

    try {
      const postPreference = await PostPreferenceModel.findById(postPreferenceId);

      if (!postPreference) {
        throw new AppError(404, 'Post preference not found');
      }

      return postPreference;
    } catch (error) {
      throw new AppError(500, 'Error retrieving post preference');
    }
  },

  // Create a new post preference
  createPostPreference: async (data: any) => {
    try {
      // Log the incoming data for debugging
      console.log('Creating post preference with data:', data);

      const newPostPreference = new PostPreferenceModel(data);
      await newPostPreference.save();

      // Optionally log the saved post preference after it's created
      console.log('Post preference created:', newPostPreference);

      return newPostPreference;
    } catch (error) {
      console.error('Error creating post preference:', error);
      throw new AppError(500, 'Error creating post preference');
    }
  },

  // Update an existing post preference by ID
  updatePostPreference: async (postPreferenceId: string, data: any) => {
    if (!mongoose.Types.ObjectId.isValid(postPreferenceId)) {
      throw new AppError(400, 'Invalid post preference ID');
    }

    try {
      const updatedPostPreference = await PostPreferenceModel.findByIdAndUpdate(
        postPreferenceId,
        data,
        { new: true } // Return the updated post preference
      );

      if (!updatedPostPreference) {
        throw new AppError(404, 'Post preference not found');
      }

      return updatedPostPreference;
    } catch (error) {
      throw new AppError(500, 'Error updating post preference');
    }
  },

  // Delete a post preference by ID
  deletePostPreference: async (postPreferenceId: string) => {
    if (!mongoose.Types.ObjectId.isValid(postPreferenceId)) {
      throw new AppError(400, 'Invalid post preference ID');
    }

    try {
      const deletedPostPreference = await PostPreferenceModel.findByIdAndDelete(postPreferenceId);

      if (!deletedPostPreference) {
        throw new AppError(404, 'Post preference not found');
      }

      return deletedPostPreference;
    } catch (error) {
      throw new AppError(500, 'Error deleting post preference');
    }
  },
};
