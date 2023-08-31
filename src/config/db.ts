import { Sequelize } from 'sequelize';
import { logger } from '../utils/logger';

// const url = process.env.POSTGRES_URL || ''
// const sequelize = new Sequelize(url, {logging: msg => logger.debug(msg)})

//if you want don't want to use url. comment the below code and uncomment the above line.

export const sequelize = new Sequelize({
  dialect: 'postgres', // Use the appropriate dialect for your database
  host: process.env.DATABASE_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: msg => logger.debug(msg),
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false,
    },
  }
});

//test if db is connected or not
export const configureDB = async() => {
    try {
       await sequelize.authenticate();
       logger.info('Database connected successfully.');
    } catch(error) {
        logger.error('Uable to connect to the database', error)
    }
}
