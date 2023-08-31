import winston, { transports, format } from 'winston';
const { printf, combine, timestamp, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level} ${stack || message}`;
});

export const logger = winston.createLogger({
  format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
  transports: [new transports.Console()],
});
