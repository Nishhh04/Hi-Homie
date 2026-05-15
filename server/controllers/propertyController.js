import Property from "../models/Property.js";

// Add property controller
export const addProperty = async (req, res) => {
  try {
    const { title, description, price, type, bedrooms, bathrooms } = req.body;
    const location = JSON.parse(req.body.location);
    const contact = JSON.parse(req.body.contact);

    // Validation
    if (!title || !price || !type) {
      return res.status(400).json({ message: "Title, price and type are required" });
    }

    if (!location?.address || !location?.city || !location?.state || !location?.country) {
      return res.status(400).json({ message: "Complete location info is required" });
    }

    if (!contact?.phone || !contact?.email) {
      return res.status(400).json({ message: "Contact phone and email are required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    if (req.files.length > 5) {
      return res.status(400).json({ message: "Maximum 5 images allowed" });
    }

    const property = new Property({
      title,
      description,
      price,
      type,
      bedrooms,
      bathrooms,
      location,
      contact,
      ownerId: req.user.id,
      images: req.files.map(file => file.filename)
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
