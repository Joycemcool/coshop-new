import { DataTypes, Model, Optional } from 'sequelize';
import db from '../lib/dbConnection';  

// Define Comment attributes
interface ICommentAttributes {
    comment_id: number;
    user_id: number;
    post_id: number;
    parent_comment_id?: number;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Optional attributes for creating a comment
interface ICommentCreationAttributes extends Optional<ICommentAttributes, 'comment_id' | 'parent_comment_id' | 'createdAt' | 'updatedAt'> {}

// Define the Comment model
class Comment extends Model<ICommentAttributes, ICommentCreationAttributes> implements ICommentAttributes {
    public comment_id!: number;
    public user_id!: number;
    public post_id!: number;
    public parent_comment_id?: number;
    public content!: string;
    public createdAt?: Date;
    public updatedAt?: Date;
}

// Initialize the model
Comment.init(
    {
        comment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,  // Auto-generate IDs
            primaryKey: true,     // Marks as the primary key
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id',
            },
            onDelete: 'CASCADE',
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts',
                key: 'post_id',
            },
            onDelete: 'CASCADE',
        },
        parent_comment_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'comments',
                key: 'comment_id',
            },
            onDelete: 'CASCADE',
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize: db,  // Database instance
        tableName: 'comments',
        timestamps: true,  // Enables createdAt and updatedAt
    }
);

export default Comment;
