import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { PostAttributes, PostCreationAttributes } from '../types/post.interface';
import { sequelize } from '../config/db';
import User from './user.model';

@Table({
  modelName: 'Post',
  timestamps: true,
})
export class Post extends Model<PostAttributes, PostCreationAttributes> {
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
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

sequelize.addModels([Post]);
export default Post;
