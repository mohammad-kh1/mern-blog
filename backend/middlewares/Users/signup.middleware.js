// validationMiddleware.js
import { body, validationResult } from "express-validator";

// Constants for repeated values
const MIN_PASSWORD_LENGTH = 8;
const MAX_USERNAME_LENGTH = 30;
const MIN_USERNAME_LENGTH = 4;

// Field validation rules
const userValidationRules = [
  body("firstName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last name is required"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email"),

  body("username")
    .trim()
    .escape()
    .isLength({ min: MIN_USERNAME_LENGTH, max: MAX_USERNAME_LENGTH })
    .withMessage(`Username must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters`),

  body("password")
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
    .custom((value, { req }) => {
      if (value !== req.body.passwordConfirm) {
        throw new Error('Passwords must match.');
      }
      return true;
    }),

  body("passwordConfirm")
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(`PasswordConfrim must be at least ${MIN_PASSWORD_LENGTH} characters`)
    .custom((value , {req})=>{
      if(value !== req.body.password){
        throw new Error("passowrds not match");
      }
      return true;
    }).withMessage("passwords not mtach")
];


// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateUserInput = [...userValidationRules, handleValidationErrors];

export default validateUserInput;
