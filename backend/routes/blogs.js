const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Blog = require("../models/Blog");
const adminAuth = require("../middleware/adminAuth");
const fetch = require("node-fetch");
const router = express.Router();

// ================= CLOUDINARY CONFIG =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================= MULTER (MEMORY) =================
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
});

// ================= ADMIN: UPLOAD BLOG =================
router.post(
  "/upload",
  adminAuth,
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (!req.file || !req.body.title) {
        return res.status(400).json({ message: "Title and PDF required" });
      }

      const originalName = req.file.originalname.replace(/\.pdf$/i, "");
      const publicId = `${originalName}-${Date.now()}`;

      const uploadResult = await cloudinary.uploader.upload(
        `data:application/pdf;base64,${req.file.buffer.toString("base64")}`,
        {
          resource_type: "raw",
          folder: "perfscale_blogs",
          public_id: publicId,
          use_filename: true,
          unique_filename: false,
        }
      );

      const previewUrl = uploadResult.secure_url;

      const downloadUrl = previewUrl.replace(
        "/upload/",
        `/upload/fl_attachment:${encodeURIComponent(originalName)}.pdf/`
      );

      const blog = await Blog.create({
        title: req.body.title,
        pdfUrl: previewUrl,
        downloadUrl,
        originalName: `${originalName}.pdf`,
      });

      res.status(201).json({ message: "Blog uploaded", blog });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// ================= PUBLIC: GET BLOGS =================
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Fetch blogs error:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

module.exports = router;

