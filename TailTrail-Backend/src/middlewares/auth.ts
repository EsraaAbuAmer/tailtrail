import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export interface AuthRequest extends Request {
  user?: IUser;
}

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
