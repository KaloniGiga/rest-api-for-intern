import { logger } from './utils/logger';
import app from './app';
import { configureDB } from './config/db';

//Handling Uncaught exception
process.on('uncaughtException', (err) => {
  logger.error(`Error: ${err.message}`);
  logger.warn(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

// connecting to database
configureDB();

const PORT = process.env.PORT || 4000;
//Server is listening
const server = app.listen(PORT, () => {
  logger.info(`Server is on fire at port: ${PORT}`);
});

//Unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
  logger.error(`Error: ${err.message}`);
  logger.info(`Shutting down the server due to Unhandled Promsie Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
