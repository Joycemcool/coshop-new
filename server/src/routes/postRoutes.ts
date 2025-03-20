import express from 'express';
import { query } from 'express-validator';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { 
    createPost,
    getPostsByUser,
    updatePost,
    deletePost,
    getPost
} from '../controllers/postController';

const router = express.Router();

/**
 * @route POST /api/posts
 * @desc Create a new post
 * @access Public
 */
router.post('/', 
    body('user_id').isInt().withMessage('User ID is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    validateRequest,
    createPost
);

/**
 * @route GET /api/posts?user_id=user_id
 * @desc Get all posts by a specific user
 * @access Public
 */
router.get('/',    
    validateRequest, 
    getPostsByUser);

/**
 * @route GET /api/posts/:post_id
 * @desc Get a post ny ID 
 * @access Public
 */
router.get('/:post_id',    
    validateRequest, 
    getPost);

/**
 * @route PUT /api/posts/:post_id
 * @desc Update a post by ID
 * @access Public
 */
router.put('/:post_id', 
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
router.delete('/:post_id', 
    param('post_id').isInt().withMessage('Invalid post ID'),
    validateRequest,
    deletePost
);

export default router;
