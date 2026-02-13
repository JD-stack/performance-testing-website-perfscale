const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    originalName: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
      required: true,
    },

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

