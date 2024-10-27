import { body } from "express-validator";

const validateUserCreatePostRoute = () => {
  return [
    body("name", "Name is required").trim().notEmpty(),
    body("email", "Invalid email address").trim().isEmail(),
    body("password", "Password is required").trim().notEmpty(),
  ];
};

const validateUserLoginPostRoute = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

export default { validateUserCreatePostRoute, validateUserLoginPostRoute };
