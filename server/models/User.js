import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property"
    }]

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
