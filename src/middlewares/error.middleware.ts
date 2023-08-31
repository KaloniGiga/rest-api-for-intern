import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "utils/errorHandler";

const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode =  500;
    let message = 'Something went wrong';

    //if the error is the custom defined error
    if(err instanceof ErrorHandler) {
        statusCode = err.statusCode
        message = err.message;
    }else {
         
        if(process.env.NODE_ENV !== "production") {
            if(typeof err === 'string'){
                message = err;
            } else if (err instanceof Error) {
                message = err.message
            }
        }
    }

    let stackTrace = undefined;
    //return stack trace when developing locally
    if(process.env.NODE_ENV !== "production") {
        stackTrace = err.stack
    }

    console.error(err);

    return res.status(statusCode).json({message})
}

export default errorMiddleware;