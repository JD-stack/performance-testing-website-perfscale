const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Blog = require("../models/Blog");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

/* ================= CLOUDINARY CONFIG ================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ================= MULTER (MEMORY) ================= */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
});

/* ================= ADMIN: UPLOAD BLOG ================= */
router.post(
  "/upload",
  adminAuth,
  upload.single("pdf"),
  async (req, res) => {
    try {
      const { title, category } = req.body;

      if (!req.file || !title || !category) {
        return res.status(400).json({
          message: "Title, category and PDF are required",
        });
      }

      // Upload PDF to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(
        `data:application/pdf;base64,${req.file.buffer.toString("base64")}`,
        {
          resource_type: "raw",
          folder: "perfscale_blogs",
          allowed_formats: ["pdf"]
        }
      );

      const blog = await Blog.create({
        title,
        category, // manual | automation
        pdfUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        originalName: req.file.originalname, // keeps .pdf
      });

      res.status(201).json({
        message: "Blog uploaded successfully",
        blog,
      });
    } catch (error) {
      console.error("Blog upload error:", error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

/* ================= PUBLIC: GET BLOGS ================= */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Fetch blogs error:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});
/* ================= SECURE DOWNLOAD ================= */
router.get("/download/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Generate secure download URL with attachment
    const downloadUrl = cloudinary.url(blog.publicId, {
      resource_type: "raw",
      flags: "attachment",
      attachment: blog.originalName, // forces filename
    });

    res.json({ downloadUrl });

  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Download failed" });
  }
});

module.exports = router;

