import { validationResult } from "express-validator";
import User from "../models/User.js";

const createNewUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        "Unable to proceed. The information you entered is not valid. Please review and correct your entries."
      );
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "User is already exists!",
      });
    }

    const user = await User.create({ name, email, password });
    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User has been successfully registered!",
      data: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error(
        "Unable to proceed. The information you entered is not valid. Please review and correct your entries."
      );
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Invalid email address or password.",
      });
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User has been successfully logged in.",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export default {
  createNewUser,
  loginUser,
};
