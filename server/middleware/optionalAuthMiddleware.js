import jwt from "jsonwebtoken";
import User from "../models/User.js";

const optionalAuthMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    // No token → continue as guest
    return next();
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
  } catch (err) {
    // Invalid token → treat as guest (do NOT block)
    req.user = null;
  }

  next();
};

export default optionalAuthMiddleware;
