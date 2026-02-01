
const express = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/Blog");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

/* ===================== MULTER CONFIG ===================== */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
});

/* ===================== ADMIN: UPLOAD BLOG PDF ===================== */
router.post(
  "/upload",
  adminAuth,
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (!req.file || !req.body.title) {
        return res.status(400).json({
          message: "Title and PDF are required",
        });
      }

      const blog = new Blog({
        title: req.body.title,
        pdfUrl: `/uploads/${req.file.filename}`,
      });

      await blog.save();

      res.status(201).json({
        message: "Blog uploaded successfully",
        blog,
      });

    } catch (error) {
      console.error("Blog upload error:", error);
      res.status(500).json({
        message: "Failed to upload blog",
      });
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
    res.status(500).json({
      message: "Failed to fetch blogs",
    });
  }
});

module.exports = router;
