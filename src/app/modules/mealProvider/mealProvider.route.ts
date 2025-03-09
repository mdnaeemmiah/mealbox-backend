import  { Router } from 'express';
import { mealProviderController } from './mealProvider.controller';

const mealProviderRouter = Router();

// Route to get all meal providers
mealProviderRouter.get('/', mealProviderController.getMealProviders);

// Route to get a single meal provider by ID
mealProviderRouter.get('/:mealProviderId', mealProviderController.getSingleMealProvider);

// Route to create a new meal provider
mealProviderRouter.post('/', mealProviderController.createMealProvider);

// Route to update an existing meal provider by ID
mealProviderRouter.put('/:id', mealProviderController.updateMealProvider);

// Route to delete a meal provider by ID
mealProviderRouter.delete('/:id', mealProviderController.deleteMealProvider);

export default mealProviderRouter;
