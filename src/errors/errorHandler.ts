export class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);

    //initializing the class properties
    this.statusCode = statusCode;
    this.message = message;
    console.log(statusCode, 'inside errorhandler');
    Error.captureStackTrace(this, this.constructor);
  }
}
