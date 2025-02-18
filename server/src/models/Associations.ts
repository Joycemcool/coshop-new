import User from './User';
import Address from './Address';
import UserAddress from './UserAddress';

User.belongsToMany(Address, { through: UserAddress, as: 'addresses', foreignKey: 'user_id' });
Address.belongsToMany(User, { through: UserAddress, as: 'addressUsers', foreignKey: 'address_id' });

export { User, Address, UserAddress };