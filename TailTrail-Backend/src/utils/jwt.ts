import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret"; 
const JWT_EXPIRES_IN = "1d"; 

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};