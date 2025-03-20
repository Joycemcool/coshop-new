import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  

// Define Post attributes
interface IPostAttributes {
    post_id: number;
    title: string;
    content: string;
    location: string;
    user_id: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a user
interface IPostCreationAttributes extends Optional<IPostAttributes, 'post_id' | 'createdAt' | 'updatedAt'> {}

// Define the User model
class Post extends Model<IPostAttributes, IPostCreationAttributes> implements IPostAttributes {
    public post_id!: number;
    public title!: string;
    public content!: string;
    public location!: string;
    public user_id!: number;
    public createdAt?: Date;
    public updatedAt?: Date;
}

// Initialize the model
Post.init(
    {
        post_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Auto-generate IDs
            primaryKey: true,     // Marks as the primary key
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
            onDelete: 'CASCADE',
        }
    },
    {
        sequelize: db,  // Database instance
        tableName: 'posts',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

export default Post;
