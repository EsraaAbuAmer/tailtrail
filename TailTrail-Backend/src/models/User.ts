import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  country: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);