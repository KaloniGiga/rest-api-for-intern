import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
import { matchedData, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/customError/req-validation.error';
import { ErrorHandler } from '../errors/errorHandler';
import { userService } from '../services/user.service';

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Implement data validation and user creation

      /**
       * check if the req is valid or not based on validation parameter
       * set using express validator in the route middleware.
       **/
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }

      //extract the validated and sanitized request data.
      const { name, email, phone } = matchedData(req);

      /**
       * since email must be unique
       * check if the email is already in or not.
       */
      const existingUser = await userService.findUserByEmail(email);

      if (existingUser) {
        return next(new ErrorHandler(409, 'Email is already in use'));
      }

      /**
       * if received data are valid and
       * email is unique, then create new user
       */
      const newUser = await userService.createUser(name, email, phone);

      return res.status(201).json({ newUser, message: 'New user created.' });
    } catch (error) {
      return next(new ErrorHandler(500, 'An error occured while creating user'));
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    // Retrieve and send all users
    try {
      const allUsers = await User.findAll();
      return res.status(200).json({ users: allUsers, message: 'All users fetched successfully.' });
    } catch (error) {
      return next(new ErrorHandler(500, 'Something went wrong! Server error.'));
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    // Retrieve and send a single user by ID
    try {
      /**
       * validate the id i.e. UserId
       */
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }
      const { id } = matchedData(req);
      //retrieve the user with the given id.
      const targetUser = await userService.findUserById(id);
      /**
       * if user is not found
       */
      if (!targetUser) {
        return next(new ErrorHandler(404, 'User not found'));
      }

      return res.status(200).json({ user: targetUser, message: 'User fetched successfully!' });
    } catch (error) {
      return next(new ErrorHandler(500, 'Failed to fetch the user.'));
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    // Implement data validation and record update
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }
      const { id, name, email, phone } = matchedData(req);

      const updatedUser = await User.update({ name, email, phone }, { where: { id: id }, returning: true });
      if (!updatedUser[0]) {
        return next(new ErrorHandler(401, 'Failed to update user.'));
      }

      return res.status(200).json({ updatedUser: updatedUser[1], message: 'user is updated' });
    } catch (error) {
      return next(new ErrorHandler(500, 'An error occured while updating the user.'));
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    // Delete a record
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }
      const { id } = matchedData(req);

      //retrieve the user with the given id.
      const targetUser = await userService.findUserById(id);
      /**
       * if user is not found
       */
      if (!targetUser) {
        return next(new ErrorHandler(404, 'User not found'));
      }

      await User.destroy({ where: { id: id } });

      return res.status(200).json({ message: 'user deleted successfully.' });
    } catch (error) {
      return next(new ErrorHandler(500, 'Something went wrong while deleting user.'));
    }
  }
}

export const userController = new UserController();
