const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { sequelize } = require("./models");
const deviceRoutes = require("./routes/devices");
const errorRoutes = require("./routes/errors");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Security and performance middleware
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }),
);

app.use(compression());
app.use(morgan("combined"));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
});
app.use("/api/", limiter);

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://ant-v3.com", "https://www.ant-v3.com"]
        : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// API Routes
app.use("/api/devices", deviceRoutes);
app.use("/api/errors", errorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: `The requested endpoint ${req.method} ${req.originalUrl} was not found.`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  // Sequelize validation errors
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      details: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid token",
      message: "Please login again.",
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Database connection and server startup
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Sync database models (use force: false in production)
    await sequelize.sync({
      force:
        process.env.NODE_ENV === "development" &&
        process.env.DB_FORCE_SYNC === "true",
    });
    console.log("✅ Database models synchronized.");

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 ANT-V3 Backend Server running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Unable to start server:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("📥 SIGTERM received, shutting down gracefully...");
  await sequelize.close();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("📥 SIGINT received, shutting down gracefully...");
  await sequelize.close();
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;
