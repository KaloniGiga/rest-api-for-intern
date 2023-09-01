import { ValidationError } from 'express-validator';

export type validationErrorMessageType = {
  error: ValidationError[];
};
