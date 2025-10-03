import e, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, country, city } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      country,
      city,
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        country: newUser.country,
        city: newUser.city,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id.toString());
    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
        city: user.city,
      },
    });
    
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
