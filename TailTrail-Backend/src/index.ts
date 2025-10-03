import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

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
app.post("/test", (req, res) => {
  res.json({ body: req.body });
});

app.get("/", (_, res) => {
  res.send("TailTrail Pets API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
