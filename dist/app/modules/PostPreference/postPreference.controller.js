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
exports.postPreferenceController = void 0;
const http_status_codes_1 = require("http-status-codes");
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const postPreference_service_1 = require("./postPreference.service");
const postPreference_model_1 = __importDefault(require("./postPreference.model"));
// Get all post preferences
const getPostPreferences = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield postPreference_service_1.postPreferenceService.getPostPreferences();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Post Preferences retrieved successfully',
        data: result,
    });
}));
// Get a single post preference
const getSinglePostPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postPreferenceId = req.params.postPreferenceId;
    const result = yield postPreference_service_1.postPreferenceService.getSinglePostPreference(postPreferenceId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Post Preference retrieved successfully',
        data: result,
    });
}));
// Create a new post preference
const createPostPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    // Log the incoming body to show the data that is being created
    console.log('Received data for post preference creation:', body);
    // Call the service to create the post preference
    const newPostPreference = yield postPreference_service_1.postPreferenceService.createPostPreference(body);
    // Log the created post preference (optional, to check the result)
    console.log('Post preference created successfully:', newPostPreference);
    // Send response back to the client
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: 'Post Preference created successfully',
        data: newPostPreference,
    });
}));
// Update a post preference
const updatePostPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid post preference ID');
    }
    const updatedPostPreference = yield postPreference_service_1.postPreferenceService.updatePostPreference(id, body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Post Preference updated successfully',
        data: updatedPostPreference,
    });
}));
// Delete a post preference
const deletePostPreference = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid post preference ID');
    }
    const deletedPostPreference = yield postPreference_model_1.default.findByIdAndDelete(id);
    if (!deletedPostPreference) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Post Preference not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: 'Post Preference deleted successfully',
        data: deletedPostPreference,
    });
}));
exports.postPreferenceController = {
    getPostPreferences,
    getSinglePostPreference,
    createPostPreference,
    updatePostPreference,
    deletePostPreference,
};
