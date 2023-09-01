import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../errors/errorHandler';
import { CustomError } from '../errors/custom-error';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  //if the error is instance of Abstract class Custom Error
  if(err instanceof CustomError) {
    return res.status(err.statusCode).send({errors: err.formatErrors()})
  }

  //if the error is instance of ErrorHandler
  if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof err === 'string') {
        message = err;
      } else if (err instanceof Error) {
        message = err.message;
      }
    }
  }

  let stackTrace = undefined;
  //return stack trace when developing locally
  if (process.env.NODE_ENV !== 'production') {
    stackTrace = err.stack;
  }

  console.error(err);

  return res.status(statusCode).json({ message });
};

export default errorMiddleware;
