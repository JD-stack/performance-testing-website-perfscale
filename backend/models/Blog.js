const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Cloudinary secure_url (used for preview)
    fileUrl: {
      type: String,
      required: true,
    },

    // Original filename WITH .pdf
    originalName: {
      type: String,
      required: true,
    },

    // Optional but VERY useful later
    category: {
      type: String,
      enum: ["fundamentals", "advanced"],
      required: true,
    },

    uploadedBy: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
