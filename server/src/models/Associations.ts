import User from './User';
import Address from './Address';
import UserAddress from './UserAddress';
import { U } from '@faker-js/faker/dist/airline-D6ksJFwG';
import Post from './Post';
import Comment from './Comment';

User.belongsToMany(Address, { through: UserAddress, as: 'addresses', foreignKey: 'user_id' });
Address.belongsToMany(User, { through: UserAddress, as: 'addressUsers', foreignKey: 'address_id' });

User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

Comment.hasMany(Comment, { 
    as: 'Replies', 
    foreignKey: 'parent_comment_id' 
});
Comment.belongsTo(Comment, { 
    as: 'ParentComment', 
    foreignKey: 'parent_comment_id' 
});


export { User, Address, UserAddress };