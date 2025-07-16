const express = require("express");
const { body, param, query, validationResult } = require("express-validator");
const { Device, Error, DeviceError } = require("../models");
const { authenticateAdmin } = require("../middleware/auth");

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation Error",
      details: errors.array(),
    });
  }
  next();
};

// GET /api/devices - Get all devices
router.get(
  "/",
  [
    query("supported").optional().isBoolean(),
    query("category").optional().isIn(["all", "supported", "popular", "new"]),
    query("sort").optional().isIn(["name", "popularity", "rating", "price"]),
    query("limit").optional().isInt({ min: 1, max: 100 }),
    query("offset").optional().isInt({ min: 0 }),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const {
        supported,
        category = "all",
        sort = "popularity",
        limit = 50,
        offset = 0,
      } = req.query;

      // Build where clause
      const where = {};
      if (supported !== undefined) {
        where.is_supported = supported === "true";
      }
      if (category === "supported") {
        where.is_supported = true;
        where.status = "active";
      }

      // Build order clause
      let order = [];
      switch (sort) {
        case "name":
          order = [["name", "ASC"]];
          break;
        case "rating":
          order = [["popularity_score", "DESC"]];
          break;
        case "price":
          order = [["price_range", "ASC"]];
          break;
        default:
          order = [
            ["sort_order", "ASC"],
            ["popularity_score", "DESC"],
          ];
      }

      const devices = await Device.findAndCountAll({
        where,
        order,
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      const formattedDevices = devices.rows.map((device) =>
        device.toPublicJSON(),
      );

      res.json({
        devices: formattedDevices,
        total: devices.count,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < devices.count,
      });
    } catch (error) {
      console.error("Error fetching devices:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch devices",
      });
    }
  },
);

// GET /api/devices/:deviceId - Get specific device
router.get(
  "/:deviceId",
  [param("deviceId").notEmpty().trim().escape()],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { deviceId } = req.params;

      const device = await Device.findByDeviceId(deviceId);

      if (!device) {
        return res.status(404).json({
          error: "Device Not Found",
          message: `Device with ID "${deviceId}" not found`,
        });
      }

      res.json({
        device: device.toPublicJSON(),
      });
    } catch (error) {
      console.error("Error fetching device:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch device",
      });
    }
  },
);

// GET /api/devices/:deviceId/errors - Get errors for specific device
router.get(
  "/:deviceId/errors",
  [
    param("deviceId").notEmpty().trim().escape(),
    query("category")
      .optional()
      .isIn(["signal", "channels", "network", "hardware"]),
    query("priority").optional().isIn(["low", "medium", "high", "critical"]),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { deviceId } = req.params;
      const { category, priority } = req.query;

      // First check if device exists
      const device = await Device.findByDeviceId(deviceId);
      if (!device) {
        return res.status(404).json({
          error: "Device Not Found",
          message: `Device with ID "${deviceId}" not found`,
        });
      }

      // Build where clause for errors
      const errorWhere = { is_active: true };
      if (category) errorWhere.category = category;
      if (priority) errorWhere.priority = priority;

      // Get errors associated with this device
      const errors = await device.getErrors({
        where: errorWhere,
        order: [
          ["sort_order", "ASC"],
          ["frequency_percentage", "DESC"],
        ],
        include: [
          {
            association: "steps",
            order: [["step_order", "ASC"]],
          },
        ],
      });

      // Group errors by category
      const errorsByCategory = {};
      errors.forEach((error) => {
        const errorData = error.toPublicJSON();
        if (!errorsByCategory[error.category]) {
          errorsByCategory[error.category] = [];
        }
        errorsByCategory[error.category].push(errorData);
      });

      res.json({
        deviceId,
        errors: errorsByCategory,
        total: errors.length,
      });
    } catch (error) {
      console.error("Error fetching device errors:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to fetch device errors",
      });
    }
  },
);

// POST /api/devices - Create new device (Admin only)
router.post(
  "/",
  authenticateAdmin,
  [
    body("deviceId").notEmpty().trim().escape(),
    body("name").notEmpty().trim().escape(),
    body("model").optional().trim().escape(),
    body("manufacturer").optional().trim().escape(),
    body("description").optional().trim(),
    body("imageUrl").optional().isURL(),
    body("icon").optional().trim().escape(),
    body("color").optional().trim().escape(),
    body("features").optional().isArray(),
    body("specifications").optional().isObject(),
    body("priceRange").optional().trim().escape(),
    body("userCount").optional().trim().escape(),
    body("supported").optional().isBoolean(),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const {
        deviceId,
        name,
        model,
        manufacturer,
        description,
        imageUrl,
        icon,
        color,
        features,
        specifications,
        priceRange,
        userCount,
        supported,
      } = req.body;

      // Check if device already exists
      const existingDevice = await Device.findByDeviceId(deviceId);
      if (existingDevice) {
        return res.status(409).json({
          error: "Device Already Exists",
          message: `Device with ID "${deviceId}" already exists`,
        });
      }

      const device = await Device.create({
        device_id: deviceId,
        name,
        model,
        manufacturer,
        description,
        image_url: imageUrl,
        icon_name: icon || "Tv",
        color_scheme: color || "from-blue-500 to-blue-600",
        features: features || [],
        specifications: specifications || {},
        price_range: priceRange,
        user_count: userCount,
        is_supported: supported !== undefined ? supported : true,
      });

      res.status(201).json({
        message: "Device created successfully",
        device: device.toPublicJSON(),
      });
    } catch (error) {
      console.error("Error creating device:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to create device",
      });
    }
  },
);

// PUT /api/devices/:deviceId - Update device (Admin only)
router.put(
  "/:deviceId",
  authenticateAdmin,
  [
    param("deviceId").notEmpty().trim().escape(),
    body("name").optional().notEmpty().trim().escape(),
    body("model").optional().trim().escape(),
    body("manufacturer").optional().trim().escape(),
    body("description").optional().trim(),
    body("imageUrl").optional().isURL(),
    body("icon").optional().trim().escape(),
    body("color").optional().trim().escape(),
    body("features").optional().isArray(),
    body("specifications").optional().isObject(),
    body("priceRange").optional().trim().escape(),
    body("userCount").optional().trim().escape(),
    body("supported").optional().isBoolean(),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { deviceId } = req.params;

      const device = await Device.findByDeviceId(deviceId);
      if (!device) {
        return res.status(404).json({
          error: "Device Not Found",
          message: `Device with ID "${deviceId}" not found`,
        });
      }

      const updateData = {};
      const allowedFields = [
        "name",
        "model",
        "manufacturer",
        "description",
        "image_url",
        "icon_name",
        "color_scheme",
        "features",
        "specifications",
        "price_range",
        "user_count",
        "is_supported",
      ];

      // Map request body to database fields
      Object.keys(req.body).forEach((key) => {
        const dbField = {
          name: "name",
          model: "model",
          manufacturer: "manufacturer",
          description: "description",
          imageUrl: "image_url",
          icon: "icon_name",
          color: "color_scheme",
          features: "features",
          specifications: "specifications",
          priceRange: "price_range",
          userCount: "user_count",
          supported: "is_supported",
        }[key];

        if (dbField && allowedFields.includes(dbField)) {
          updateData[dbField] = req.body[key];
        }
      });

      await device.update(updateData);

      res.json({
        message: "Device updated successfully",
        device: device.toPublicJSON(),
      });
    } catch (error) {
      console.error("Error updating device:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to update device",
      });
    }
  },
);

// DELETE /api/devices/:deviceId - Delete device (Admin only)
router.delete(
  "/:deviceId",
  authenticateAdmin,
  [param("deviceId").notEmpty().trim().escape()],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { deviceId } = req.params;

      const device = await Device.findByDeviceId(deviceId);
      if (!device) {
        return res.status(404).json({
          error: "Device Not Found",
          message: `Device with ID "${deviceId}" not found`,
        });
      }

      await device.destroy();

      res.json({
        message: "Device deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting device:", error);
      res.status(500).json({
        error: "Internal Server Error",
        message: "Failed to delete device",
      });
    }
  },
);

module.exports = router;
