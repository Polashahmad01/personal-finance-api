import express from "express";
import userController from "../controllers/user.js";
import userValidator from "../utils/userSchemaValidation.js";
const router = express.Router();

router.post(
  "/v1/user",
  userValidator.validateUserCreatePostRoute(),
  userController.createNewUser
);

router.post(
  "/v1/user",
  userValidator.validateUserLoginPostRoute(),
  userController.loginUser
);

export default router;
