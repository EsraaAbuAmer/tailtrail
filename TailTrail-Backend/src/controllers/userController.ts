import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { json } from "stream/consumers";

export const updateMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const { name, phone, country, city } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, country, city },
      { new: true, runValidators: true, select: "-password" }
    );
    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Change password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
