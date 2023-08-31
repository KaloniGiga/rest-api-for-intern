export class ErrorHandler extends Error {
    statusCode: number;
    message: string;

    constructor(statusCode:number, message:string) {
      if(message) {
        super(message)
      } else {
        super('A generic error occured!')
      }

      //initializing the class properties
      this.statusCode = statusCode;
      this.message = message;   

      Error.captureStackTrace(this, this.constructor);
    }
}