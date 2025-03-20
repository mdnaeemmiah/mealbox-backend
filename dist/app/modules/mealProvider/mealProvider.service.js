"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealProviderService = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const mealProvider_model_1 = __importDefault(require("./mealProvider.model"));
exports.mealProviderService = {
    // Get all meal providers
    getMealProviders: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const mealProviders = yield mealProvider_model_1.default.find();
            return mealProviders;
        }
        catch (error) {
            throw new AppError_1.default(500, 'Error retrieving meal providers');
        }
    }),
    // Get a single meal provider by ID
    getSingleMealProvider: (mealProviderId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(mealProviderId)) {
            throw new AppError_1.default(400, 'Invalid meal provider ID');
        }
        try {
            const mealProvider = yield mealProvider_model_1.default.findById(mealProviderId);
            if (!mealProvider) {
                throw new AppError_1.default(404, 'Meal provider not found');
            }
            return mealProvider;
        }
        catch (error) {
            throw new AppError_1.default(500, 'Error retrieving meal provider');
        }
    }),
    // Create a new meal provider
    createMealProvider: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Log the incoming data for debugging
            console.log('Creating meal provider with data:', data);
            const newMealProvider = new mealProvider_model_1.default(data);
            yield newMealProvider.save();
            // Optionally log the saved meal provider after it's created
            console.log('Meal provider created:', newMealProvider);
            return newMealProvider;
        }
        catch (error) {
            console.error('Error creating meal provider:', error);
            throw new AppError_1.default(500, 'Error creating meal provider');
        }
    }),
    // Update an existing meal provider by ID
    updateMealProvider: (mealProviderId, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(mealProviderId)) {
            throw new AppError_1.default(400, 'Invalid meal provider ID');
        }
        try {
            const updatedMealProvider = yield mealProvider_model_1.default.findByIdAndUpdate(mealProviderId, data, { new: true } // Return the updated meal provider
            );
            if (!updatedMealProvider) {
                throw new AppError_1.default(404, 'Meal provider not found');
            }
            return updatedMealProvider;
        }
        catch (error) {
            throw new AppError_1.default(500, 'Error updating meal provider');
        }
    }),
    // Delete a meal provider by ID
    deleteMealProvider: (mealProviderId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(mealProviderId)) {
            throw new AppError_1.default(400, 'Invalid meal provider ID');
        }
        console.log(mealProviderId);
        try {
            const deletedMealProvider = yield mealProvider_model_1.default.findByIdAndDelete(mealProviderId);
            if (!deletedMealProvider) {
                throw new AppError_1.default(404, 'Meal provider not found');
            }
            return deletedMealProvider;
        }
        catch (error) {
            throw new AppError_1.default(500, 'Error deleting meal provider');
        }
    }),
};
