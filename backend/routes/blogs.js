const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Blog = require("../models/Blog");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

/* ===================== CLOUDINARY CONFIG ===================== */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ===================== MULTER (MEMORY STORAGE) ===================== */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
});

/* ===================== ADMIN: UPLOAD BLOG ===================== */
router.post(
  "/upload",
  adminAuth,
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (!req.file || !req.body.title) {
        return res
          .status(400)
          .json({ message: "Title and PDF are required" });
      }

      const originalName = req.file.originalname; // KEEP FULL NAME
      const publicId = `${originalName.replace(/\.pdf$/i, "")}-${Date.now()}`;

      const uploadResult = await cloudinary.uploader.upload(
        `data:application/pdf;base64,${req.file.buffer.toString("base64")}`,
        {
          resource_type: "auto",
          folder: "perfscale_blogs",
          public_id: publicId,
          use_filename: true,
          unique_filename: false,
        }
      );

      const blog = await Blog.create({
        title: req.body.title,
        pdfUrl: uploadResult.secure_url, // PREVIEW URL
        originalName,                   // FOR DOWNLOAD NAME
      });

      res.status(201).json({
        message: "Blog uploaded successfully",
        blog,
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

/* ===================== PUBLIC: GET BLOGS ===================== */
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

