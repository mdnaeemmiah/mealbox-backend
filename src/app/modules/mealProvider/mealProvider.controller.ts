import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import AppError from '../../../errors/AppError';
import { mealProviderService } from './mealProvider.service';
import MealProviderModel from './mealProvider.model';


// Get all meal providers
const getMealProviders = catchAsync(async (req: Request, res: Response) => {
  const result = await mealProviderService.getMealProviders();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meal Providers retrieved successfully',
    data: result,
  });
});

// Get a single meal provider
const getSingleMealProvider = catchAsync(async (req: Request, res: Response) => {
  const mealProviderId = req.params.mealProviderId;
  const result = await mealProviderService.getSingleMealProvider(mealProviderId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meal Provider retrieved successfully',
    data: result,
  });
});

// Create a new meal provider
const createMealProvider = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
  
    // Log the incoming body to show the data that is being created
    console.log('Received data for meal provider creation:', body);
  
    // Call the service to create the meal provider
    const newMealProvider = await mealProviderService.createMealProvider(body);
  
    // Log the created meal provider (optional, to check the result)
    console.log('Meal provider created successfully:', newMealProvider);
  
    // Send response back to the client
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Meal Provider created successfully',
      data: newMealProvider,
    });
  });
  

// Update a meal provider
const updateMealProvider = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid meal provider ID');
  }

  const updatedMealProvider = await mealProviderService.updateMealProvider(id, body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Meal Provider updated successfully',
    data: updatedMealProvider,
  });
});

const deleteMealProvider = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  console.log('Received ID for deletion:', id); // Debugging log

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error('Invalid ID format:', id);
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid meal provider ID');
  }

  const deletedMealProvider = await MealProviderModel.findByIdAndDelete(id);

  if (!deletedMealProvider) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Meal Provider not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Meal Provider deleted successfully',
    data: deletedMealProvider,
  });
});


export const mealProviderController = {
  getMealProviders,
  getSingleMealProvider,
  createMealProvider,
  updateMealProvider,
  deleteMealProvider,
};
