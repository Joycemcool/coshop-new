import { Request, Response, NextFunction } from 'express';

import { 
    BadRequestError, 
    NotFoundError
} from '../errors/customErrors';
import Post from '../models/Post';

/**
 * Error-handling wrapper for async controller functions.
 * Eliminate the need for manually wrapping each async function in a try-catch block.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

// Create a new post
export const createPost = asyncHandler ( async(req: Request, res: Response) => {
        const { user_id, title, content } = req.body;
        const post = await Post.create({ user_id, title, content });
        res.status(201).json(post);
});

// Get all posts by a specific user
export const getPostsByUser = asyncHandler( async (req: Request, res: Response) => {
    const { user_id } = req.params;
    if(!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }
    // Fetch posts by user
    const posts = await Post.findAll({ where: { user_id } });
    if (posts.length === 0) {
        return res.status(404).json({ error: 'No posts found for this user' });
    }
    res.status(200).json(posts);
});

// Update a post
export const updatePost = asyncHandler( async (req: Request, res: Response) => {
    const { post_id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findByPk(post_id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();

    res.status(200).json(post);
});

// Delete a post
export const deletePost = asyncHandler( async (req: Request, res: Response) => {
    const { post_id } = req.params;

    const post = await Post.findByPk(post_id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    await post.destroy();
    res.status(204).send();
});