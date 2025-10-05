import { Router } from "express";
import { body } from "express-validator";
import { protect } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
  resolvePet,
  getNearbyPets,
} from "../controllers/petController";
import upload from "../middlewares/upload";

const petRoutes = Router();

petRoutes.post(
  "/",
  protect,
  upload.array("photos", 5),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("type")
      .isIn(["dog", "cat", "bird", "rabbit", "turtle", "other"])
      .withMessage("Invalid pet type"),
    body("description").notEmpty().withMessage("Description is required"),
    body("status").optional().isIn(["lost", "found", "resolved"]),
    body("location").notEmpty().withMessage("Location is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
  ],
  validate,
  createPet
);
petRoutes.get("/near", getNearbyPets);
petRoutes.get("/", getPets);
petRoutes.get("/:id", getPetById);
petRoutes.put(
  "/:id",
  protect,
  upload.array("photos", 5),
  [
    body("type")
      .optional()
      .isIn(["dog", "cat", "bird", "rabbit", "turtle", "other"]),
    body("status").optional().isIn(["lost", "found", "resolved"]),
    body("photos").optional().isArray(),
  ],
  validate,
  updatePet
);

petRoutes.delete("/:id", protect, deletePet);

petRoutes.patch("/:id/resolve", protect, resolvePet);

export default petRoutes;
