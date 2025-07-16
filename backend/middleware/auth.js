const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

// Authenticate admin middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Access token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin user
    const admin = await Admin.findByPk(decoded.adminId);
    if (!admin || !admin.is_active) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid or expired token",
      });
    }

    // Add admin to request object
    req.admin = admin;
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Token has expired",
      });
    }

    res.status(500).json({
      error: "Internal Server Error",
      message: "Authentication failed",
    });
  }
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findByPk(decoded.adminId);

      if (admin && admin.is_active) {
        req.admin = admin;
      }
    }

    next();
  } catch (error) {
    // Ignore auth errors for optional auth
    next();
  }
};

// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// Verify token without middleware
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  authenticateAdmin,
  optionalAuth,
  generateToken,
  verifyToken,
};
