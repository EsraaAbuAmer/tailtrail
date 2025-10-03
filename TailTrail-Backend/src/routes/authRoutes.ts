import { Router } from "express";
import { body } from "express-validator";
import { signup,login } from "../controllers/authController";
import { validate } from "../middlewares/validate";

const authRoutes = Router();

authRoutes.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("phone")
      .notEmpty()
      .matches(/^\+?[0-9]{7,15}$/)
      .withMessage("Phone must be valid international format"),
    body("country").notEmpty().withMessage("Country is required"),
    body("city").notEmpty().withMessage("City is required"),
  ],
  validate,
  signup
);

authRoutes.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

export default authRoutes;
