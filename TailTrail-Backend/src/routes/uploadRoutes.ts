import { Router } from "express";
import { protect } from "../middlewares/auth";
import upload from "../middlewares/upload";
import { uploadImage } from "../controllers/uploadController";

const uploadRoutes = Router();

uploadRoutes.post("/", protect, upload.single("image"), uploadImage);

export default uploadRoutes;
