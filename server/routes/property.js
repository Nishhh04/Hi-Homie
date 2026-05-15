import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Property from "../models/Property.js";
import authMiddleware from "../middleware/authMiddleware.js";
import optionalAuthMiddleware from "../middleware/optionalAuthMiddleware.js"
import { validatePropertyData } from "../utils/validators.js";
import User from "../models/User.js"; // adjust path if needed


// Configure multer
const upload = multer({ dest: "uploads/" });

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const router = express.Router();

/* CREATE PROPERTY (Protected) */
router.post("/", authMiddleware, upload.array("images", 5), async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      type,
      bedrooms,
      bathrooms,
      ownerName,
      ownerEmail,
      ownerPhone,
      address,
      city,
      state,
      country
    } = req.body;

    const propertyData = {
      title,
      description,
      price,
      type,
      bedrooms,
      bathrooms,
      location: { address, city, state, country },
      contact: { name: ownerName, email: ownerEmail, phone: ownerPhone }
    };

    // Run validation
    const errors = validatePropertyData(propertyData);
    if (errors.length > 0) return res.status(400).json({ errors });

    // Upload images

    // let imageUrls = [];
    // if (req.files) {
    //   for (const file of req.files) {
    //     const result = await cloudinary.v2.uploader.upload(file.path, { folder: "properties" });
    //     imageUrls.push(result.secure_url);
    //   }
    // }

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(
      () => "https://via.placeholder.com/600"
      );
    }


    const property = await Property.create({
      ...propertyData,
      images: imageUrls,
      ownerId: req.user._id
    });

    res.status(201).json(property);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


/* UPDATE PROPERTY (Protected, owner only) */
router.put("/:id", authMiddleware, upload.array("images", 5), async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    if (property.ownerId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const {
      title,
      description,
      price,
      type,
      bedrooms,
      bathrooms,
      ownerName,
      ownerEmail,
      ownerPhone,
      address,
      city,
      state,
      country,
      removeImages 
    } = req.body;

    const updatedData = {
      title: title ?? property.title,
      description: description ?? property.description,
      price: price ?? property.price,
      type: type ?? property.type,
      bedrooms: bedrooms ?? property.bedrooms,
      bathrooms: bathrooms ?? property.bathrooms,
      location: {
        address: address ?? property.location.address,
        city: city ?? property.location.city,
        state: state ?? property.location.state,
        country: country ?? property.location.country
      },
      contact: {
        name: ownerName ?? property.contact.name,
        email: ownerEmail ?? property.contact.email,
        phone: ownerPhone ?? property.contact.phone
      }
    };

    const errors = validatePropertyData(updatedData);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }


    // Update fields
    property.title = updatedData.title;
    property.description = updatedData.description;
    property.price = updatedData.price;
    property.type = updatedData.type;
    property.bedrooms = updatedData.bedrooms;
    property.bathrooms = updatedData.bathrooms;
    property.location = updatedData.location;
    property.contact = updatedData.contact;


    // Remove selected images if provided
    let imagesToRemove = [];
    if (removeImages) {
      imagesToRemove = Array.isArray(removeImages)
        ? removeImages
        : JSON.parse(removeImages);
    }

    if (imagesToRemove.length > 0) {
      property.images = property.images.filter(
        img => !imagesToRemove.includes(img)
      );
    }

    // Upload new images if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path, {
          folder: "properties",
        });
        property.images.push(result.secure_url);
      }
    }

    await property.save();
    res.json(property);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* DELETE PROPERTY (Protected, owner only) */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    if (property.ownerId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await property.deleteOne();
    res.json({ message: "Property deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* GET ALL PROPERTIES (Optional filters: city, state, type, price range) */
router.get("/", async (req, res) => {
  try {
    const { city, state, type, minPrice, maxPrice, underDeal } = req.query;
   
    let query = {};

    if (city) query["location.city"] = city;
    if (state) query["location.state"] = state;
    if (type) query.type = type;
    if (minPrice || maxPrice) query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
    
    if (underDeal !== undefined) {
      query.underDeal = underDeal === "true";
    }
    

    const properties = await Property.find(query);
    const safeProperties = properties.map((property) => ({
      ...property.toObject(),
      contact: {
        name: property.contact?.name
      }
    }));
    res.json(safeProperties);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET properties added by logged-in agent
router.get("/my-listings", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user._id });
    res.json(properties);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Owner's Info with  Property Detail 
router.get("/:id",optionalAuthMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    // 🔐 Hide contact details if not logged in
    if (property.underDeal || !req.user) {
      property.contact = {
        name: property.contact?.name
      };
    }

    res.json(property);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/wishlist/:propertyId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const propertyId = req.params.propertyId;

    const index = user.wishlist.findIndex(id => id.toString() === propertyId);

    if (index === -1) {
      user.wishlist.push(propertyId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    console.error("Wishlist error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/wishlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("wishlist");

    res.json(user.wishlist);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// TOGGLE UNDER DEAL (Owner only)
router.patch("/:id/under-deal", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    if (property.ownerId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    property.underDeal = !property.underDeal;
    await property.save();

    res.json({
      message: `Property marked as ${property.underDeal ? "Under Deal" : "Available"}`,
      underDeal: property.underDeal
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
