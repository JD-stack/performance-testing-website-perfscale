const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Blog = require("../models/Blog");
const adminAuth = require("../middleware/adminAuth");
const userAuth = require("../middleware/userAuth");

const router = express.Router();

/* ================= CLOUDINARY CONFIG ================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ================= ENSURE UPLOADS FOLDER EXISTS ================= */
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

/* ================= MULTER (DISK STORAGE - SAFE) ================= */
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB safer limit
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

      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(
        req.file.path,
        {
          resource_type: "raw",
          folder: "perfscale_blogs",
        }
      );

      // Delete temp file after upload
      fs.unlinkSync(req.file.path);

      const blog = await Blog.create({
        title,
        category,
        pdfUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        originalName: req.file.originalname,
      });

      res.status(201).json({
        message: "Blog uploaded successfully",
        blog,
      });

    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      res.status(500).json({
        message: error.message || "Upload failed",
      });
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
router.get("/download/:id", userAuth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const downloadUrl = cloudinary.url(blog.publicId, {
      resource_type: "raw",
      type: "upload",
      flags: "attachment",
      attachment: blog.originalName,
    });

    res.json({ downloadUrl });

  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Download failed" });
  }
});

module.exports = router;
