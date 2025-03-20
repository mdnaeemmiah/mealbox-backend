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
exports.mealProviderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const mealProvider_service_1 = require("./mealProvider.service");
const mealProvider_model_1 = __importDefault(require("./mealProvider.model"));
// Get all meal providers
const getMealProviders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield mealProvider_service_1.mealProviderService.getMealProviders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Meal Providers retrieved successfully',
        data: result,
    });
}));
// Get a single meal provider
const getSingleMealProvider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mealProviderId = req.params.mealProviderId;
    const result = yield mealProvider_service_1.mealProviderService.getSingleMealProvider(mealProviderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Meal Provider retrieved successfully',
        data: result,
    });
}));
// Create a new meal provider
const createMealProvider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Log the incoming body to show the data that is being created
    console.log('Received data for meal provider creation:', body);
    // Call the service to create the meal provider
    const newMealProvider = yield mealProvider_service_1.mealProviderService.createMealProvider(body);
    // Log the created meal provider (optional, to check the result)
    console.log('Meal provider created successfully:', newMealProvider);
    // Send response back to the client
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: 'Meal Provider created successfully',
        data: newMealProvider,
    });
}));
// Update a meal provider
const updateMealProvider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid meal provider ID');
    }
    const updatedMealProvider = yield mealProvider_service_1.mealProviderService.updateMealProvider(id, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Meal Provider updated successfully',
        data: updatedMealProvider,
    });
}));
const deleteMealProvider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('Received ID for deletion:', id); // Debugging log
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error('Invalid ID format:', id);
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid meal provider ID');
    }
    const deletedMealProvider = yield mealProvider_model_1.default.findByIdAndDelete(id);
    if (!deletedMealProvider) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Meal Provider not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Meal Provider deleted successfully',
        data: deletedMealProvider,
    });
}));
exports.mealProviderController = {
    getMealProviders,
    getSingleMealProvider,
    createMealProvider,
    updateMealProvider,
    deleteMealProvider,
};
