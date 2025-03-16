import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import AppError from '../../../errors/AppError';
import { postPreferenceService } from './postPreference.service';
import PostPreferenceModel from './postPreference.model';

// Get all post preferences
const getPostPreferences = catchAsync(async (req: Request, res: Response) => {
  const result = await postPreferenceService.getPostPreferences();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post Preferences retrieved successfully',
    data: result,
  });
});

// Get a single post preference
const getSinglePostPreference = catchAsync(async (req: Request, res: Response) => {
  const postPreferenceId = req.params.postPreferenceId;
  const result = await postPreferenceService.getSinglePostPreference(postPreferenceId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post Preference retrieved successfully',
    data: result,
  });
});

// Create a new post preference
const createPostPreference = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;

  // Log the incoming body to show the data that is being created
  console.log('Received data for post preference creation:', body);

  // Call the service to create the post preference
  const newPostPreference = await postPreferenceService.createPostPreference(body);

  // Log the created post preference (optional, to check the result)
  console.log('Post preference created successfully:', newPostPreference);

  // Send response back to the client
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Post Preference created successfully',
    data: newPostPreference,
  });
});

// Update a post preference
const updatePostPreference = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid post preference ID');
  }

  const updatedPostPreference = await postPreferenceService.updatePostPreference(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Post Preference updated successfully',
    data: updatedPostPreference,
  });
});

// Delete a post preference
const deletePostPreference = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid post preference ID');
  }

  const deletedPostPreference = await PostPreferenceModel.findByIdAndDelete(id);

  if (!deletedPostPreference) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Post Preference not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Post Preference deleted successfully',
    data: deletedPostPreference,
  });
});

export const postPreferenceController = {
  getPostPreferences,
  getSinglePostPreference,
  createPostPreference,
  updatePostPreference,
  deletePostPreference,
};
