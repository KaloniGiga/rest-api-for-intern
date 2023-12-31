import express, { Router } from 'express';
import { postController } from '../controllers/post.controller';
import {
  IdValidation,
  PostIdValidation,
  createPostValdation,
} from '../middlewares/validators/postValidator.middleware';

const router = express.Router() as Router;

/**
 * @method POST
 * @description create new posts for user with userId
 */
router.post('/posts/:userId', IdValidation, createPostValdation, postController.createPost);

/**
 * @method GET
 * @description get all posts of user with userId
 */
router.get('/posts/user/:userId', IdValidation, postController.getAllPostOfUser);

/**
 * @method GET
 * @description get post data by Id
 */
router.get('/posts/:id', PostIdValidation, postController.getPostById);

/**
 * @method DELETE
 * @description delete all posts of a user with userID
 */

router.delete('/posts/:userId', IdValidation, postController.deleteAllPostOfUser);

export default router;
