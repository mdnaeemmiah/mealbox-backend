import { Router } from 'express';
import { postPreferenceController } from './postPreference.controller';

const postPreferenceRouter = Router();

// Route to get all post preferences
postPreferenceRouter.get('/gain', postPreferenceController.getPostPreferences);

// Route to get a single post preference by ID
postPreferenceRouter.get('/:postPreferenceId', postPreferenceController.getSinglePostPreference);

// Route to create a new post preference
postPreferenceRouter.post('/', postPreferenceController.createPostPreference);

// Route to update an existing post preference by ID
postPreferenceRouter.put('/:id', postPreferenceController.updatePostPreference);

// Route to delete a post preference by ID
postPreferenceRouter.delete('/:id', postPreferenceController.deletePostPreference);

export default postPreferenceRouter;
