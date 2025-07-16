const { Sequelize } = require("sequelize");
require("dotenv").config();

// Database connection
const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "ant_v3_db",
  username: process.env.DB_USER || "ant_v3_user",
  password: process.env.DB_PASSWORD || "password",
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
});

// Import models
const Device = require("./Device")(sequelize);
const Error = require("./Error")(sequelize);
const ErrorStep = require("./ErrorStep")(sequelize);
const Admin = require("./Admin")(sequelize);
const DeviceError = require("./DeviceError")(sequelize);
const ActivityLog = require("./ActivityLog")(sequelize);

// Define associations
Device.belongsToMany(Error, {
  through: DeviceError,
  foreignKey: "device_id",
  otherKey: "error_id",
});

Error.belongsToMany(Device, {
  through: DeviceError,
  foreignKey: "error_id",
  otherKey: "device_id",
});

Error.hasMany(ErrorStep, {
  foreignKey: "error_id",
  as: "steps",
});

ErrorStep.belongsTo(Error, {
  foreignKey: "error_id",
});

Admin.hasMany(ActivityLog, {
  foreignKey: "admin_id",
  as: "activities",
});

ActivityLog.belongsTo(Admin, {
  foreignKey: "admin_id",
});

module.exports = {
  sequelize,
  Device,
  Error,
  ErrorStep,
  Admin,
  DeviceError,
  ActivityLog,
};
