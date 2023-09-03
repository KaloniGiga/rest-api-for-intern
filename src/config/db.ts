import { Sequelize } from 'sequelize-typescript';
import { logger } from '../utils/logger';
import User from '../models/user.model';
import Post from '../models/post.model';

export const sequelize = new Sequelize({
  dialect: 'postgres', // Use the appropriate dialect for your database
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: (msg) => logger.debug(msg),
  dialectOptions: {
    ssl: { rejectUnauthorized: false },
  },
  models: [User, Post],
});

//test if db is connected or not
export const configureDB = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
    }
    logger.info('Database connected successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database', error);
    process.exit(1);
  }
};
