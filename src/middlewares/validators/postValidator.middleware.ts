import { check } from 'express-validator';

export const createPostValdation = [
  check('title')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Post title cannot be empty!')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Minimum 3 characters required!')
    .bail()
    .isLength({ max: 254 })
    .withMessage('Maximum 254 characters allowed!')
    .bail(),

  check('content')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Post Content cannot be empty.')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Minimum characters 2 required!')
    .bail()
    .isLength({ max: 254 })
    .withMessage('Maximum 255 characters allowed!')
    .bail(),
];

export const IdValidation = [
  check('userId')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('id cannot be empty')
    .bail()
    .toInt()
    .isNumeric()
    .withMessage('must be a number')
    .bail(),
];

export const PostIdValidation = [
  check('id')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('id cannot be empty')
    .bail()
    .toInt()
    .isNumeric()
    .withMessage('must be a number')
    .bail(),
];
