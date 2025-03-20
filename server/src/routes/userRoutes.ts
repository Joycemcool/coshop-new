import express, { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import {
    getUserbyID,
    updateUser,
    deleteUser
} from '../controllers/userController';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { avatorUpload } from '../controllers/userController';
// import AuthMiddleware from '../middleware/auth.middleware';

const router = express.Router();
// const authMiddleware = new AuthMiddleware();

/** 
 * @route GET /api/users/profile
 * @desc get a user profile
 * @access Protected
 */
router.get(
    '/profile/:id',
    validateRequest,
    getUserbyID
);

/** 
 * @route PUT /api/users/profile
 * @desc Update a user profile
 * @access Protected
 */
router.put(
    '/profile',
    // authMiddleware.verifyToken,
    body('name').optional().isString(),
    body('family_name').optional().isString(),
    body('email').optional().isEmail(),
    validateRequest,
    updateUser
);

/** 
 * @route DELETE /api/users/account
 * @desc Delete a user
 * @access Protected
 */
router.delete(
    '/account',
    // authMiddleware.verifyToken,
    validateRequest,
    deleteUser
);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../public/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
            cb(null, uploadDir); // Set the upload directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });

router.post(
    '/avatar',
    validateRequest,
    upload.single('avatar'),
    avatorUpload
);

export default router;



