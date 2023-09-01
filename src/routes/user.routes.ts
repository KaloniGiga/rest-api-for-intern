import express from 'express';
import { userController } from '../controllers/user.controller';
import { validateUser } from '../middlewares/validators/userValidator.middleware';

const router = express.Router();

router.post('/users', validateUser, userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;
