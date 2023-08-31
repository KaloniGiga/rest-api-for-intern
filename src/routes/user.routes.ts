import express from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();

router.post('/records', userController.createUser);
router.get('/records', userController.getAllUsers);
router.get('/records/:id', userController.getUserById);
router.put('/records/:id', userController.updateUser);
router.delete('/records/:id', userController.deleteUser);

export default router;
