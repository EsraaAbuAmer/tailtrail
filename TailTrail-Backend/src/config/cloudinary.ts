import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: "dk90lab7b",
  api_key: "477332698451416",
  api_secret: "D6UzCw-0p9JUJHfXsqMOqKSvajI",
});

export default cloudinary;
