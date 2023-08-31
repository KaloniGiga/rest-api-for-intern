import express from 'express';
import { config } from 'dotenv';

//make the instance of the express app
const app = express();

//configure the dotenv
config();

//middleware
app.use(express.json());

//configure routes

//configure custom error middleware
// app.use()

export default app;

