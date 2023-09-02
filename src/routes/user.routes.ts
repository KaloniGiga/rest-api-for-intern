import express, { Router } from 'express';
import { userController } from '../controllers/user.controller';
import {
  userIdValidation,
  createUserValidation,
  updateUserValidation,
} from '../middlewares/validators/userValidator.middleware';

const router = express.Router() as Router;

/**
 * @method POST
 * @description create new user
 */
router.post('/users', createUserValidation, userController.createUser);

/**
 * @method GET
 * @description get all users data
 */
router.get('/users', userController.getAllUsers);

/**
 * @method GET
 * @description get user data by Id
 */
router.get('/users/:id', userIdValidation, userController.getUserById);

/**
 * @method PUT
 * @description update user data by Id
 */
router.put('/users/:id', updateUserValidation, userController.updateUser);

/**
 * @method DELETE
 * @description delete user by Id
 */
router.delete('/users/:id', userIdValidation, userController.deleteUser);

export default router;
