const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const Post = require("../models/Post");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ storage: multer.memoryStorage() });

/* ================= CREATE BLOG POST ================= */
router.post("/create", adminAuth, upload.single("thumbnail"), async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!req.file || !title || !content || !author) {
      return res.status(400).json({ message: "All fields required" });
    }

    const uploadResult = await cloudinary.uploader.upload(
      `data:image/png;base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "perfscale_posts",
      }
    );

    const post = await Post.create({
      title,
      content,
      author,
      thumbnail: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ message: "Post creation failed" });
  }
});

/* ================= GET ALL POSTS ================= */
router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

/* ================= GET SINGLE POST ================= */
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

module.exports = router;
