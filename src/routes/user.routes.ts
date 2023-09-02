import express from 'express';
import { userController } from '../controllers/user.controller';
import { userIdValidation, createUserValidation, updateUserValidation } from '../middlewares/validators/userValidator.middleware';

const router = express.Router();

router.post('/users', createUserValidation, userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userIdValidation, userController.getUserById);
router.put('/users/:id', updateUserValidation, userController.updateUser);
router.delete('/users/:id', userIdValidation,  userController.deleteUser);

export default router;
