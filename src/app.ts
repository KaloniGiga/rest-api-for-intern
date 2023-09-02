//import and configure dotenv
import { config } from 'dotenv';
config()

//import other modules
import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';
import validateEnv from './utils/validateEnv';
import { BadRouteError } from './errors/customError/bad-route-error';
import { configureDB } from './config/db';
import "reflect-metadata";
import { logger } from './utils/logger';


//make the instance of the express app
const app = express();

//validate environment
validateEnv()

//connection to the database 
configureDB();

//middleware
app.use(express.json());

//configure routes
app.use('/api', userRoutes);

//if the api does not exist
app.all('/*', () => {
    throw new BadRouteError();
})

// configure custom error middleware
app.use(errorMiddleware);

const PORT:number = Number(process.env.PORT) || 4000;
const HOST:string = process.env.HOST || '0.0.0.0';
console.log(process.env.PORT);
process.on('uncaughtException', (err) => {
  logger.error(`Error: ${err.message}`);
  logger.warn(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});


const server = app.listen(PORT, HOST, () => {
  logger.info(`Server is on fire at port: ${PORT}`);
});


//Unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promsie Rejection`);
  server.close(() => {
    process.exit(1);
  });
});

export default app;
