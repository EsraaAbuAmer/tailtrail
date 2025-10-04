import express, { Application } from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import petRoutes from "./routes/petRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();
const app: Application = express();

app.use((req, res, next) => {
  console.log("👉 Request received:", req.method, req.url);
  next();
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (_, res) => {
  res.send("TailTrail Pets API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
