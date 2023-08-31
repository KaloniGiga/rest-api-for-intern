import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db'; // Assuming you've set up Sequelize connection

class User extends Model {
  // Define fields and associations here
}

User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'User',
  },
);

export default User;
