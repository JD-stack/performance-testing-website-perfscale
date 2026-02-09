const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact"); 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("PerfScale backend is running");
});

const PORT = process.env.PORT || 5000;

// ⛔ DO NOT ACCEPT REQUESTS UNTIL MONGODB CONNECTS
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });






