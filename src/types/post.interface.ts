import { Optional } from 'sequelize';

export interface PostAttributes {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}
