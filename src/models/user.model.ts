import { Table, Column, Model, DataType, Unique, IsEmail } from 'sequelize-typescript';
import { sequelize } from '../config/db';
import { UserAttributes, UserCreationAttributes } from '../types/user.interface';

@Table({
  modelName: 'User',
  timestamps: false,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Unique
  @IsEmail
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;
}

// call `sequelize.addModels([User])` to add the model to sequelize instance:
sequelize.addModels([User]);

export default User;
