"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postPreference_controller_1 = require("./postPreference.controller");
const postPreferenceRouter = (0, express_1.Router)();
// Route to get all post preferences
postPreferenceRouter.get('/gain', postPreference_controller_1.postPreferenceController.getPostPreferences);
// Route to get a single post preference by ID
postPreferenceRouter.get('/:postPreferenceId', postPreference_controller_1.postPreferenceController.getSinglePostPreference);
// Route to create a new post preference
postPreferenceRouter.post('/', postPreference_controller_1.postPreferenceController.createPostPreference);
// Route to update an existing post preference by ID
postPreferenceRouter.put('/:id', postPreference_controller_1.postPreferenceController.updatePostPreference);
// Route to delete a post preference by ID
postPreferenceRouter.delete('/:id', postPreference_controller_1.postPreferenceController.deletePostPreference);
exports.default = postPreferenceRouter;
