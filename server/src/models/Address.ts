import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  // Adjust the path based on your project structure
import User from './User';
import Order from './Order';
import UserAddress from './UserAddress';

// Define Address attributes
interface IAddressAttributes {
    address_id: number;
    unit_number: string;
    street_number: string;
    address_line: string;
    city: string;
    state: string;
    postal_code: string;
    country_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating an address
interface IAddressCreationAttributes extends Optional<IAddressAttributes, 'address_id' |'createdAt' | 'updatedAt'> {}

// Define the Address model
class Address extends Model<IAddressAttributes, IAddressCreationAttributes> implements IAddressAttributes {
    public address_id!: number;
    public unit_number!: string;
    public street_number!: string;
    public address_line!: string;
    public city!: string;
    public state!: string;
    public postal_code!: string;
    public country_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Initialize the model
Address.init(
    {
        address_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        unit_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address_line: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'countries',
                key: 'country_id',
            }
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'addresses',
        timestamps: true, // Enables createdAt and updatedAt
    }
);

Address.belongsToMany(User, { 
    through: UserAddress,
    as: 'users', 
    foreignKey: 'address_id',
});


Address.hasMany(Order, {
    foreignKey: 'shipping_address_id',
    onUpdate: 'CASCADE',
});



export default Address;
