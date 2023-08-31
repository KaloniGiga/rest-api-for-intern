import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres', // Use the appropriate dialect for your database
  host: 'localhost',
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
});

export default sequelize;