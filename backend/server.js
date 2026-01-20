const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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

    // Register routes ONLY after DB is ready
    app.use("/api/auth", authRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Crash instead of half-running
  });


