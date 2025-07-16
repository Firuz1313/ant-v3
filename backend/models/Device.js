const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Device = sequelize.define(
    "Device",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      device_id: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 50],
        },
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      model: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      manufacturer: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      icon_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "Tv",
      },
      color_scheme: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "from-blue-500 to-blue-600",
      },
      features: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      specifications: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {},
      },
      firmware_version: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      supported_channels: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      price_range: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      popularity_score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100,
        },
      },
      user_count: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "discontinued"),
        defaultValue: "active",
      },
      is_supported: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      release_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      support_level: {
        type: DataTypes.ENUM("basic", "standard", "premium"),
        defaultValue: "standard",
      },
      documentation_url: {
        type: DataTypes.STRING(500),
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "devices",
      indexes: [
        {
          fields: ["device_id"],
          unique: true,
        },
        {
          fields: ["status", "is_supported"],
        },
        {
          fields: ["popularity_score"],
        },
        {
          fields: ["sort_order"],
        },
      ],
    },
  );

  // Instance methods
  Device.prototype.toPublicJSON = function () {
    return {
      id: this.device_id,
      name: this.name,
      model: this.model,
      manufacturer: this.manufacturer,
      description: this.description,
      imageUrl: this.image_url,
      icon: this.icon_name,
      color: this.color_scheme,
      features: this.features || [],
      specifications: this.specifications || {},
      firmwareVersion: this.firmware_version,
      channels: this.supported_channels,
      priceRange: this.price_range,
      rating: this.popularity_score / 20, // Convert to 0-5 scale
      users: this.user_count,
      status: this.status,
      supported: this.is_supported,
      releaseDate: this.release_date,
      supportLevel: this.support_level,
      documentationUrl: this.documentation_url,
    };
  };

  // Class methods
  Device.findByDeviceId = function (deviceId) {
    return this.findOne({
      where: { device_id: deviceId },
    });
  };

  Device.findSupported = function () {
    return this.findAll({
      where: {
        is_supported: true,
        status: "active",
      },
      order: [
        ["sort_order", "ASC"],
        ["popularity_score", "DESC"],
      ],
    });
  };

  Device.findPopular = function (limit = 10) {
    return this.findAll({
      where: {
        is_supported: true,
        status: "active",
      },
      order: [["popularity_score", "DESC"]],
      limit,
    });
  };

  return Device;
};
