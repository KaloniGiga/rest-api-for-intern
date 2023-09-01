import { CustomError } from "../custom-error";

export class BadRouteError extends CustomError {
   statusCode = 404;

   constructor() {
     super()
   }

   formatErrors() {
        return [{message: 'This route does not exist!'}]
   }
}