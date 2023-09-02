import { ValidationError } from 'express-validator';
import { CustomError } from '../custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();
  }

  formatErrors() {
    return this.errors.map((err) => {
      console.log(err);
      return { message: err.msg, field: err.type == 'field' ? err.path : 'body' };
    });
  }
}
