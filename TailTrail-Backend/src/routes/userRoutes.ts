import { Router } from "express";
import { protect } from "../middlewares/auth";
import { updateMe } from "../controllers/userController";
import { body } from "express-validator";
import { validate } from "../middlewares/validate";
import { changePassword } from "../controllers/userController";
const userRoutes = Router();

userRoutes.get("/me", protect, (req, res) => {
  res.json(req.user);
});

userRoutes.put(
  "/me",
  protect,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("phone")
      .notEmpty()
      .matches(/^\+?[0-9]{7,15}$/)
      .withMessage("Phone must be valid international format"),
    body("country").notEmpty().withMessage("Country is required"),
    body("city").notEmpty().withMessage("City is required"),
  ],
  validate,
  updateMe
);

userRoutes.put(
  "/change-password",
  protect,
  [
    body("currentPassword")
      .notEmpty()
      .withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters"),
  ],
  validate,
  changePassword
);
export default userRoutes;
