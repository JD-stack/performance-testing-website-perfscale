const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String, // HTML from rich editor
      required: true,
    },

    thumbnail: {
      type: String, // Cloudinary URL
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    publicId: {
      type: String, // thumbnail public id
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
