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
    body("email", "Email is required").trim().isEmail("Invalid email address"),
    body("password", "Password is required").trim().notEmpty(),
  ];
};

export default { validateUserCreatePostRoute, validateUserLoginPostRoute };
