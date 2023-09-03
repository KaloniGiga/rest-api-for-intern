import { Optional } from 'sequelize';

export interface PostAttributes {
  id: number;
  title: string;
  content: string;
}

export interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}
