import mongoose, { Schema, Document } from "mongoose";

export interface IPet extends Document {
  name: string;
  type: "dog" | "cat" | "bird" | "rabbit" | "turtle" | "other";
  description: string;
  photos: string[];
  status: "lost" | "found" | "resolved";
  location: {
    type: "Point";
    coordinates: [number, number];
    city: string;
    country: string;
  };
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PetSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["dog", "cat", "bird", "rabbit", "turtle", "other"],
      required: true,
    },
    description: { type: String, required: true },
    photos: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["lost", "found", "resolved"],
      default: "lost",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

PetSchema.index({ location: "2dsphere" });

export default mongoose.model<IPet>("Pet", PetSchema);
