import app from './app';
import { logger } from './utils/logger';

const PORT = Number(process.env.PORT) || 4000;

process.on('uncaughtException', (err) => {
  logger.error(`Error: ${err.message}`);
  logger.warn(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

const server = app.listen(PORT, () => {
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
