const jwt = require("jsonwebtoken");

// Middleware to protect admin-only routes
module.exports = (req, res, next) => {
  try {
    // 1️⃣ Get Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authorization token missing"
      });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Check admin role
    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Access denied: Admins only"
      });
    }

    // 5️⃣ Attach admin info to request
    req.admin = {
      id: decoded.userId,
      role: decoded.role
    };

    // 6️⃣ Continue
    next();

  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
