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
exports.postPreferenceService = void 0;
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const mongoose_1 = __importDefault(require("mongoose"));
const postPreference_model_1 = __importDefault(require("./postPreference.model"));
exports.postPreferenceService = {
    // Get all post preferences
    getPostPreferences: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postPreferences = yield postPreference_model_1.default.find();
            return postPreferences;
        }
        catch (error) {
            throw new AppError_1.default(500, 'Error retrieving post preferences');
        }
    }),
    // Get a single post preference by ID
    getSinglePostPreference: (postPreferenceId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(postPreferenceId)) {
            throw new AppError_1.default(400, 'Invalid post preference ID');
        }
        try {
            const postPreference = yield postPreference_model_1.default.findById(postPreferenceId);
            if (!postPreference) {
                throw new AppError_1.default(404, 'Post preference not found');
            }
            return postPreference;
        }
        catch (error) {
            throw new AppError_1.default(500, 'Error retrieving post preference');
        }
    }),
    // Create a new post preference
    createPostPreference: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Log the incoming data for debugging
            console.log('Creating post preference with data:', data);
            const newPostPreference = new postPreference_model_1.default(data);
            yield newPostPreference.save();
            // Optionally log the saved post preference after it's created
            console.log('Post preference created:', newPostPreference);
            return newPostPreference;
        }
        catch (error) {
            console.error('Error creating post preference:', error);
            throw new AppError_1.default(500, 'Error creating post preference');
        }
    }),
    // Update an existing post preference by ID
    updatePostPreference: (postPreferenceId, data) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(postPreferenceId)) {
            throw new AppError_1.default(400, 'Invalid post preference ID');
        }
        try {
            const updatedPostPreference = yield postPreference_model_1.default.findByIdAndUpdate(postPreferenceId, data, { new: true } // Return the updated post preference
            );
            if (!updatedPostPreference) {
                throw new AppError_1.default(404, 'Post preference not found');
            }
            return updatedPostPreference;
        }
        catch (error) {
            throw new AppError_1.default(500, 'Error updating post preference');
        }
    }),
    // Delete a post preference by ID
    deletePostPreference: (postPreferenceId) => __awaiter(void 0, void 0, void 0, function* () {
        if (!mongoose_1.default.Types.ObjectId.isValid(postPreferenceId)) {
            throw new AppError_1.default(400, 'Invalid post preference ID');
        }
        try {
            const deletedPostPreference = yield postPreference_model_1.default.findByIdAndDelete(postPreferenceId);
            if (!deletedPostPreference) {
                throw new AppError_1.default(404, 'Post preference not found');
            }
            return deletedPostPreference;
        }
        catch (error) {
            throw new AppError_1.default(500, 'Error deleting post preference');
        }
    }),
};
