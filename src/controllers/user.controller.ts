import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { matchedData, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/customError/req-validation.error';
import { ErrorHandler } from '../errors/errorHandler';

class UserController {

  async createUser(req: Request, res: Response) {
    try {
    // Implement data validation and user creation
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           throw new RequestValidationError(errors.array())
        }

        const {name, email, phone} = matchedData(req);

        const existingUser = await User.findOne({
          where: {
            email: email,
          }
        })

        if(!existingUser) {
           throw new ErrorHandler(409, 'Email is already in use');
        }

        const newUser = await User.create({
          name,
          email,
          phone,
        })

        return res.status(201).json({newUser, message: 'New user created.'})

    }catch(error) {
       return new ErrorHandler(500, 'An error occured while creating user')
    }
  }

  async getAllUsers(req: Request, res: Response) {
    // Retrieve and send all records
    try {
      const allUsers = await User.findAll();
      return res.status(200).json({allUsers, message: "All users fetched successfully."})
    } catch(error) {
       return new ErrorHandler(500, 'Failed to fetch all users')
    }
  }

  async getUserById(req: Request, res: Response) {
    // Retrieve and send a single record by ID
    try{
      const errors = validationResult(req);
      if(!errors.isEmpty) {
        throw new RequestValidationError(errors.array());
      }
      const { id } = matchedData(req);
      const targetUser = await User.findOne({
        where: {
          id: id
        }
      })
    }catch(error) {
      return new ErrorHandler(500, 'Failed to fetch the user.')
    }
  }

  async updateUser(req: Request, res: Response) {
    // Implement data validation and record update
     try {
        const errors = validationResult(req);
      if(!errors.isEmpty) {
        throw new RequestValidationError(errors.array());
      }
      const data = matchedData(req);

      const updatedUser = await User.update(data, {where: {id: data.id}, returning: true});
      if(!updatedUser[0]) {
          throw new ErrorHandler(401, 'Failed to update user.')
      }

      return res.status(200).json({updatedUser: updatedUser[1], message: 'user is updated'})
     } catch (error) {
        return new ErrorHandler(500, 'An error occured while updating the user.')
     } 
  }

  async deleteUser(req: Request, res: Response) {
    // Delete a record
    const errors = validationResult(req);
      if(!errors.isEmpty) {
        throw new RequestValidationError(errors.array());
      }
      const {id} = matchedData(req); 

      const targetUser = await User.findOne({ where: { id }});
      if(!targetUser) {
        throw new ErrorHandler(404, 'User not found.')
      }

      const deletedUser = await User.destroy({where: { id }})
      if(!deletedUser) {
        throw new ErrorHandler(401, 'Failed to delete user.')
      }
      return res.status(200).json({message: 'user deleted successfully.'})
  }
}

export const userController = new UserController();
