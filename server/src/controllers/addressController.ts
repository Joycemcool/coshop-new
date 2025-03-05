import { Request, Response, NextFunction } from 'express';
import Address from '../models/Address';
import { BadRequestError, NotFoundError } from '../errors/customErrors';
import { as } from '@faker-js/faker/dist/airline-D6ksJFwG';

/**
 * Error-handling wrapper for async controller functions.
 */
const asyncHandler = (fn: Function) => 
    (req: Request, res: Response, next: NextFunction) => 
        Promise.resolve(fn(req, res, next)).catch(next);

// export const createAddress = asyncHandler(async (req: Request, res: Response) => {
//     const { unit_number, street_number, address_line, city, state, postal_code, country_id } = req.body;

//     const newAddress = await Address.create({ unit_number, street_number, address_line, city, state, postal_code, country_id });
//     res.status(201).json(newAddress);
// });

export const findOrCreateAddress = async (unit_number: string, street_number: string, address_line: string, city: string, state: string, postal_code: string, country_id: number) => {
    const [address, created] = await Address.findOrCreate({
        where: { unit_number, street_number, address_line, city, state, postal_code, country_id },
        defaults: { unit_number, street_number, address_line, city, state, postal_code, country_id }
    });
    return address;
}

export const getAddrById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const address = await Address.findByPk(id);
    if (!address) {
        throw new NotFoundError('Address not found');
    }

    res.status(200).json(address);
});

export const getAllAddrs = asyncHandler(async (_req: Request, res: Response) => {
    const addresses = await Address.findAll();
    res.status(200).json(addresses);
});

export const updateAddr = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { unit_number, street_number, address_line, city, state, postal_code, country_id } = req.body;

    const address = await Address.findByPk(id);
    if (!address) {
        throw new NotFoundError('Address not found');
    }

    address.unit_number = unit_number || address.unit_number;
    address.street_number = street_number || address.street_number;
    address.address_line = address_line || address.address_line;
    address.city = city || address.city;
    address.state = state || address.state;
    address.postal_code = postal_code || address.postal_code;
    address.country_id = country_id || address.country_id;
    await address.save();

    res.status(200).json(address);
});

export const deleteAddr = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const address = await Address.findByPk(id);
    if (!address) {
        throw new NotFoundError('Address not found');
    }

    await address.destroy();
    res.status(200).json({ message: 'Address deleted successfully' });
});