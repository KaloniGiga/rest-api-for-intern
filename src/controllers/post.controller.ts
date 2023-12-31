import { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/customError/req-validation.error';
import { postService } from '../services/post.service';
import { ErrorHandler } from '../errors/errorHandler';
import Post from '../models/post.model';
import { userService } from '../services/user.service';
import { Op } from 'sequelize';

export class PostController {
  /**
   * POST, create a post for user with id = userId
   */

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }

      const { userId, title, content } = matchedData(req);

      const newPost = await postService.createPost({ userId, title, content });

      return res.status(201).json({ newPost, message: 'New Post created.' });
    } catch (error) {
      return next(new ErrorHandler(500, 'An error occured while creating post.'));
    }
  }

  /**
   * GET, get all the post of user whose Id = userId
   */

  async getAllPostOfUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }

      //extract the validated and sanitized request data.
      const { userId } = matchedData(req);

      //check if user with given userid exist or not
      const targetUser = await userService.findUserById(userId);
      if (!targetUser) {
        return next(new ErrorHandler(422, 'Invalid userId'));
      }

      const allPosts = await Post.findAll({
        where: { userId: userId },
      });
      return res.status(200).json({ posts: allPosts, message: 'All posts of a user fetched.' });
    } catch (error) {
      return next(new ErrorHandler(500, 'Something went wrong! Server error.'));
    }
  }

  /**
   * GET, get the post by Id
   */

  async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }

      //extract the validated and sanitized request data.
      const { id } = matchedData(req);

      const targetPost = await postService.getPostById(id);
      if (!targetPost) {
        return next(new ErrorHandler(404, 'Post not found'));
      }

      return res.status(200).json({ post: targetPost, message: 'Post fetched successfully!' });
    } catch (error) {
      return next(new ErrorHandler(500, 'Failed to fetch the user.'));
    }
  }

  /**
   * DELETE, all post of a user
   */

  async deleteAllPostOfUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(new RequestValidationError(errors.array()));
      }

      //extract the validated and sanitized request data.
      const { userId } = matchedData(req);

      const targetUser = await userService.findUserById(userId);
      if (!targetUser) {
        return next(new ErrorHandler(422, 'Invalid userId'));
      }

      await Post.destroy({
        where: {
          userId: userId,
        },
      });

      res.status(200).json({ message: 'Successfully deleted all Posts of a User!' });
    } catch (error) {
      return next(new ErrorHandler(500, 'Failed to delete posts of a user.'));
    }
  }
}

export const postController = new PostController();
