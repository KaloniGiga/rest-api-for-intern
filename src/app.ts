import express from 'express';
import { config } from 'dotenv';
import errorMiddleware from './middlewares/error.middleware';
import userRoutes from './routes/user.routes';

//make the instance of the express app
const app = express();

//configure the dotenv
config();

//middleware
app.use(express.json());

//configure routes
app.use('/api', userRoutes);

// configure custom error middleware
app.use(errorMiddleware);

export default app;
