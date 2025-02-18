import express, { Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { authenticateJWT } from '../middleware/authMiddleware';
import {
    getUserAddresses,
    addUserAddress,
    removeUserAddress,
    updateUserAddress,
} from '../controllers/userAddressController';

const router = express.Router();

/** 
 * @route GET /api/userAddresses/:userid/addresses
 * @desc Fetch all addresses linked to a user
 * @access Public
 */
router.get('/:user_id/addresses', 
    validateRequest,
    getUserAddresses
)

/** 
 * @route POST /api/userAddresses/:userid/addresses
 * @desc Add a new address for a user
 * @access Public
 */

router.post('/:user_id/addresses', 
    validateRequest,
    addUserAddress
)

/** 
 * @route PUT /api/userAddresses/:userid/addresses/:address_id
 * @desc Update a specific address for a user.
 * @access Public
 */

router.put('/:user_id/addresses/:address_id', 
    validateRequest,
    updateUserAddress
)

/** 
 * @route DELETE /api/userAddresses/:userid/addresses/:address_id
 * @desc Remove an address from a user and delete it if unused.
 * @access Public
 */

router.delete('/:user_id/addresses/:address_id',
    validateRequest,
    removeUserAddress
)

export default router;



