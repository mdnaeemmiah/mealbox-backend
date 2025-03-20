"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mealProvider_controller_1 = require("./mealProvider.controller");
const mealProviderRouter = (0, express_1.Router)();
// Route to get all meal providers
mealProviderRouter.get('/', mealProvider_controller_1.mealProviderController.getMealProviders);
// Route to get a single meal provider by ID
mealProviderRouter.get('/:mealProviderId', mealProvider_controller_1.mealProviderController.getSingleMealProvider);
// Route to create a new meal provider
mealProviderRouter.post('/create', mealProvider_controller_1.mealProviderController.createMealProvider);
// Route to update an existing meal provider by ID
mealProviderRouter.put('/:id', mealProvider_controller_1.mealProviderController.updateMealProvider);
// Route to delete a meal provider by ID
mealProviderRouter.delete('/:id', mealProvider_controller_1.mealProviderController.deleteMealProvider);
exports.default = mealProviderRouter;
