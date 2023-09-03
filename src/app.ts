//import and configure dotenv
import { config } from 'dotenv';
config();

//import other modules
import express, { Express } from 'express';
import errorMiddleware from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import validateEnv from './utils/validateEnv';
import { BadRouteError } from './errors/customError/bad-route-error';
import { configureDB } from './config/db';
import helmet from 'helmet';
import 'reflect-metadata';

//make the instance of the express app
const app = express() as Express;

//validate environment
validateEnv();

//connection to the database
configureDB();

//middleware
app.use(express.json());
app.use(helmet());
//configure routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

//if the api does not exist
app.all('/*', () => {
  throw new BadRouteError();
});

// configure custom error middleware
app.use(errorMiddleware);

export default app;
