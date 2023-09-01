import { check, validationResult } from 'express-validator';

export const validateUser = [
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

  check('phone').trim().escape().not().isEmpty().withMessage('Phone cannot be empty').bail(),
];
