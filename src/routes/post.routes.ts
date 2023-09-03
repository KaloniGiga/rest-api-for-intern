import express, { Router } from 'express';
import { postController } from '../controllers/post.controller';
import { userIdValidation } from 'src/middlewares/validators/userValidator.middleware';
import { PostIdValidation, createPostValdation } from 'src/middlewares/validators/postValidator.middleware';

const router = express.Router() as Router;

/**
 * @method POST
 * @description create new posts for user with userId
 */
router.post('/posts/:userId',userIdValidation, createPostValdation, postController.createPost);

/**
 * @method GET
 * @description get all posts of user with userId
 */
router.get('/posts/:userId',userIdValidation, postController.getAllPostOfUser);

/**
 * @method GET
 * @description get post data by Id
 */
router.get('/posts/:id', PostIdValidation, postController.getPostById);
export default router;
