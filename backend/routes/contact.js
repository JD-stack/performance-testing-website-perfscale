const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

/* ================= CONTACT FORM ================= */
router.post("/", async (req, res) => {
  try {
    const { name, email, company, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required",
      });
    }

    await Contact.create({
      name,
      email,
      company,
      phone,
      message,
    });

    res.status(201).json({
      message: "Message submitted successfully",
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      message: "Failed to submit message",
    });
  }
});

module.exports = router;
