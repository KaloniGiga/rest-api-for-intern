import { check } from 'express-validator';

export const createUserValidation = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name cannot be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail()
    .isLength({ max: 25 })
    .withMessage('Maximum 25 characters allowed!')
    .bail(),

  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty')
    .bail()
    .isEmail()
    .withMessage('Invalid email address')
    .bail(),

  check('phone')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Phone cannot be empty')
    .bail()
    .matches(/^\d+$/)
    .withMessage('must be number')
    .bail()
    .isLength({ min: 7, max: 13 })
    .withMessage('must be between 7 and 13 digits')
    .bail(),
];

export const userIdValidation = [
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

export const updateUserValidation = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name cannot be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail()
    .isLength({ max: 25 })
    .withMessage('Maximum 25 characters allowed!')
    .bail(),

  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty')
    .bail()
    .isEmail()
    .withMessage('Invalid email address')
    .bail(),

  check('phone')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Phone cannot be empty')
    .bail()
    .matches(/^\d+$/)
    .withMessage('must  be number')
    .bail()
    .isLength({ min: 7, max: 13 })
    .withMessage('must be between 7 and 13 digits')
    .bail(),

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
