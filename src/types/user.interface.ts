import { Optional } from "sequelize";

export interface UserAttributes {
    id: number,
    name: string,
    email: string,
    phone: string,
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

