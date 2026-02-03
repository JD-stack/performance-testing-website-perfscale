// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true },       // preview
    downloadUrl: { type: String, required: true },  // forced download
    originalName: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

