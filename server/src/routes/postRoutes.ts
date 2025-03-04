import express from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createPost,
    getPostsByUser,
    updatePost,
    deletePost
} from '../controllers/postController';

const router = express.Router();

/**
 * @route POST /api/posts
 * @desc Create a new post
 * @access Public
 */
router.post('/posts', 
    body('user_id').isInt().withMessage('User ID is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    validateRequest,
    createPost
);

/**
 * @route GET /api/users/:user_id/posts
 * @desc Get all posts by a specific user
 * @access Public
 */
router.get('/users/:user_id/posts',    
    param('user_id').isInt().withMessage('Invalid user ID'),
    validateRequest, 
    getPostsByUser);

/**
 * @route PUT /api/posts/:post_id
 * @desc Update a post by ID
 * @access Public
 */
router.put('/posts/:post_id', 
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    validateRequest,
    updatePost
);
/**
 * @route DELETE /api/posts/:id
 * @desc Delete a post by ID
 * @access Public
 */
router.delete('/posts/:post_id', 
    param('post_id').isInt().withMessage('Invalid post ID'),
    validateRequest,
    deletePost
);

export default router;
