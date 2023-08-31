import { Request, Response } from 'express';
import User from 'models/user.model';

class UserController {
  async createUser(req: Request, res: Response) {
    // Implement data validation and record creation
  }

  async getAllUsers(req: Request, res: Response) {
    // Retrieve and send all records
  }

  async getUserById(req: Request, res: Response) {
    // Retrieve and send a single record by ID
  }

  async updateUser(req: Request, res: Response) {
    // Implement data validation and record update
  }

  async deleteUser(req: Request, res: Response) {
    // Delete a record
  }
}

export const userController = new UserController();
