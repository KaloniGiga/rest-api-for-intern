import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../errors/errorHandler';
import { CustomError } from '../errors/custom-error';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  //if the error is instance of Abstract class Custom Error
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.formatErrors() });
  }

  //if the error is instance of ErrorHandler
  if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    message = err.message;
  }
  return res.status(statusCode).json({ error: message });
};

export default errorMiddleware;
