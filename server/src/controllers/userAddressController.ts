import { Request, Response, NextFunction } from 'express';
import { User, Address, UserAddress } from '../models/Associations';
import { findOrCreateAddress } from '../controllers/addressController'

const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

// Get all user-address relationships
export const getAllUserAddr = asyncHandler(async (req: Request, res: Response) => {
    const userAddresses = await UserAddress.findAll();
    res.json(userAddresses);
});

// Add an address to a user
export const addUserAddress = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;
    console.log("Captured User ID:", user_id);
    const { unit_number, street_number, address_line, city, state, postal_code, country_id } = req.body;

    if (!user_id || !unit_number || !street_number || !address_line || !city || !state || !postal_code || !country_id) {
        return res.status(400).json({ error: 'user_id, unit_number, street_number, address_line, city, state, postal_code, country_id are required' });
    }

    const address = await findOrCreateAddress(unit_number, street_number, address_line, city, state, postal_code, country_id);

    const userAddress = await UserAddress.create({ user_id, address_id: address.address_id });
    res.status(201).json(userAddress);
});

// Get all addresses for a specific user
export const getUserAddresses = asyncHandler(async (req: Request, res: Response) => {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
        include: {
            model: Address,
            as: 'addresses',
            through: { attributes: [] }, // Exclude junction table data
        },
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json((user as any).addresses);
});

// Remove an address from a user
export const removeUserAddress = asyncHandler(async (req: Request, res: Response) => {
    const { user_id, address_id } = req.params;

    const deleted = await UserAddress.destroy({ where: { user_id, address_id } });

    if (!deleted) {
        return res.status(404).json({ error: 'UserAddress not found' });
    }

    const addressUsageCount = await UserAddress.count({ where: { address_id }});

    if(addressUsageCount === 0) {
        console.log(`Address ID ${address_id} is no longer used and will be deleted. `);
        await Address.destroy({ where: { address_id }});
    }

    res.json({ message: 'User address deleted successfully' });
});

// Update a specific address for a user
export const updateUserAddress = asyncHandler(async (req: Request, res: Response) => {
    const { user_id, address_id } = req.params;
    const { unit_number, street_number, address_line, city, state, postal_code, country_id } = req.body;

    if (!user_id || !unit_number || !street_number || !address_line || !city || !state || !postal_code || !country_id) {
        return res.status(400).json({ error: 'user_id, unit_number, street_number, address_line, city, state, postal_code, country_id are required' });
    }

    const newAddress = await findOrCreateAddress(unit_number, street_number, address_line, city, state, postal_code, country_id);

    const updated = await UserAddress.update(
        { address_id: newAddress.address_id },
        { where: { user_id, address_id: address_id } }
    );

    if (!updated[0]) {
        return res.status(404).json({ error: 'UserAddress not found' });
    }

    const addressUsageCount = await UserAddress.count({ where: { address_id:address_id }});

    if(addressUsageCount === 0) {
        console.log(`Address ID ${address_id} is no longer used and will be deleted. `);
        await Address.destroy({ where: { address_id:address_id }});
    }

    res.json({ message: 'User address updated successfully' });
});
