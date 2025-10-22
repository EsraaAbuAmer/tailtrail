import { Request, Response } from "express";
import Pet from "../models/Pet";
import { AuthRequest } from "../middlewares/auth";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary";

export const createPet = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const { name, type, description, status, city, country, location } =
      req.body;

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res
        .status(400)
        .json({ message: "At least one photo is required" });
    }

    if (!type) return res.status(400).json({ message: "Pet type is required" });

    if (!location)
      return res.status(400).json({ message: "Location is required" });

    const files = req.files as Express.Multer.File[] &
      { path: string; filename: string }[];
    const photos = files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
    const parsedLocation = JSON.parse(location);
    const [lat, lng] = parsedLocation.coordinates;

    const newPet = new Pet({
      name : name || undefined,
      type,
      description,
      photos,
      status: status || "lost",
      location: {
        type: "Point",
        coordinates: [lng, lat],
        city,
        country,
      },
      createdBy: req.user._id,
    });

    await newPet.save();
    res
      .status(201)
      .json({ message: "Pet post created successfully", pet: newPet });
  } catch (error) {
    console.error("❌ Create pet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPets = async (req: Request, res: Response) => {
  try {
    const {
      status,
      type,
      city,
      country,
      search,
      page = 1,
      limit = 10,
    } = req.query;
    const query: any = { isDeleted: false };
    if (status) query.status = status;
    if (type) query.type = type;
    if (city) query["location.city"] = city;
    if (country) query["location.country"] = country;
    if (search) {
      const searchRegex = { $regex: search as string, $options: "i" };
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { "location.city": searchRegex },
        { "location.country": searchRegex },
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const pets = await Pet.find(query)
      .populate("createdBy", "name email phone")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    const total = await Pet.countDocuments(query);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      pets,
    });
  } catch (error) {
    console.error("❌ Get pets error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pet ID" });
    }

    const pet = await Pet.findOne({ _id: id, isDeleted: false }).populate(
      "createdBy",
      "name email phone country city"
    );
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    console.error("❌ Get pet by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePet = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const pet = await Pet.findById(id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });

    if (pet.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own posts" });
    }
    const allowedUpdates = [
      "name",
      "type",
      "description",
      "status",
      "city",
      "country",
      "location",
    ];
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        pet[field] =
          field === "location" ? JSON.parse(req.body[field]) : req.body[field];
      }
    });

    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const files = req.files as Express.Multer.File[] &
        { path: string; filename: string }[];
      const newPhotos = files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));

      if (req.query.replacePhotos === "true") {
        for (const photo of pet.photos) {
          await cloudinary.uploader.destroy(photo.public_id);
        }
        pet.photos = newPhotos;
      } else {
        pet.photos.push(...newPhotos);
      }
    }

    await pet.save();

    res.json({
      message: "Pet updated successfully",
      pet,
    });
  } catch (error) {
    console.error("❌ Update pet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePet = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }

    pet.isDeleted = true;
    await pet.save();

    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    console.error("❌ Delete pet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resolvePet = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const pet = Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    if (pet.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only resolve your own posts" });
    }
    pet.status = "resolved";
    await pet.save();
    res.json({
      message: "Pet marked as resolved ✅",
      pet,
    });
  } catch (error) {
    console.error("❌ Resolve pet error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getNearbyPets = async (req: Request, res: Response) => {
  try {
    const {
      lng,
      lat,
      distance = 5000, // default 5km
      type,
      status,
      search,
      country,
      city,
      page = 1,
      limit = 10,
    } = req.query;

    if (!lng || !lat) {
      return res.status(400).json({ message: "lng and lat are required" });
    }

    const lngNum = Number(lng);
    const latNum = Number(lat);
    const maxDist = Number(distance);
    const skip = (Number(page) - 1) * Number(limit);

    const geoQuery: any = { isDeleted: false };

    if (type) geoQuery.type = type;
    if (status) geoQuery.status = status;
    if (country) geoQuery["location.country"] = country;
    if (city) geoQuery["location.city"] = city;

    if (search) {
      const searchRegex = { $regex: search as string, $options: "i" };
      geoQuery.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { "location.city": searchRegex },
        { "location.country": searchRegex },
      ];
    }

    const pipeline: any[] = [
      {
        $geoNear: {
          near: { type: "Point", coordinates: [lngNum, latNum] },
          distanceField: "distanceInMeters",
          maxDistance: maxDist,
          spherical: true,
          query: geoQuery,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      { $unwind: "$createdBy" },
      {
        $project: {
          name: 1,
          type: 1,
          status: 1,
          description: 1,
          photos: 1,
          location: 1,
          "createdBy.name": 1,
          "createdBy.phone": 1,
          "createdBy.city": 1,
          "createdBy.country": 1,
          distanceInKm: {
            $round: [{ $divide: ["$distanceInMeters", 1000] }, 2],
          },
          createdAt: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: Number(limit) }],
        },
      },
      {
        $project: {
          data: 1,
          total: { $ifNull: [{ $arrayElemAt: ["$metadata.total", 0] }, 0] },
        },
      },
    ];

    const result = await Pet.aggregate(pipeline);
    const pets = result[0]?.data || [];
    const total = result[0]?.total || 0;

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
      count: pets.length,
      pets,
    });
  } catch (error) {
    console.error("❌ getNearbyPets error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
