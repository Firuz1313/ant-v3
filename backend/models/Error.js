const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Error = sequelize.define(
    "Error",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      error_key: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 100],
        },
      },
      parent_error_key: {
        type: DataTypes.STRING(100),
        allowNull: true,
        references: {
          model: "errors",
          key: "error_key",
        },
      },
      category: {
        type: DataTypes.ENUM("signal", "channels", "network", "hardware"),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [2, 200],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      icon_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "AlertTriangle",
      },
      color_scheme: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "from-red-500 to-red-600",
      },
      priority: {
        type: DataTypes.ENUM("low", "medium", "high", "critical"),
        defaultValue: "medium",
      },
      difficulty: {
        type: DataTypes.ENUM("easy", "medium", "hard"),
        defaultValue: "medium",
      },
      frequency_percentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 50,
        validate: {
          min: 0,
          max: 100,
        },
      },
      avg_resolve_time: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "10-15 мин",
      },
      popularity_score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 50,
        validate: {
          min: 0,
          max: 100,
        },
      },
      symptoms: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      causes: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      prerequisites: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      tools_required: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      warning_message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      success_criteria: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      related_errors: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {},
      },
    },
    {
      tableName: "errors",
      indexes: [
        {
          fields: ["error_key"],
          unique: true,
        },
        {
          fields: ["category", "priority"],
        },
        {
          fields: ["parent_error_key"],
        },
        {
          fields: ["is_active"],
        },
        {
          fields: ["frequency_percentage"],
        },
        {
          fields: ["sort_order"],
        },
      ],
    },
  );

  // Instance methods
  Error.prototype.toPublicJSON = function () {
    return {
      key: this.error_key,
      parentKey: this.parent_error_key,
      category: this.category,
      title: this.title,
      description: this.description,
      icon: this.icon_name,
      color: this.color_scheme,
      priority: this.priority,
      difficulty: this.difficulty,
      frequency: this.frequency_percentage,
      avgResolveTime: this.avg_resolve_time,
      popularity: this.popularity_score,
      symptoms: this.symptoms || [],
      causes: this.causes || [],
      prerequisites: this.prerequisites || [],
      toolsRequired: this.tools_required || [],
      warningMessage: this.warning_message,
      successCriteria: this.success_criteria,
      relatedErrors: this.related_errors || [],
      isActive: this.is_active,
      metadata: this.metadata || {},
    };
  };

  // Class methods
  Error.findByErrorKey = function (errorKey) {
    return this.findOne({
      where: { error_key: errorKey },
      include: [
        {
          association: "steps",
          order: [["step_order", "ASC"]],
        },
      ],
    });
  };

  Error.findByCategory = function (category) {
    return this.findAll({
      where: {
        category,
        is_active: true,
      },
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
  };

  Error.findParentErrors = function () {
    return this.findAll({
      where: {
        parent_error_key: null,
        is_active: true,
      },
      order: [
        ["sort_order", "ASC"],
        ["frequency_percentage", "DESC"],
      ],
    });
  };

  Error.findSubErrors = function (parentKey) {
    return this.findAll({
      where: {
        parent_error_key: parentKey,
        is_active: true,
      },
      order: [
        ["sort_order", "ASC"],
        ["popularity_score", "DESC"],
      ],
      include: [
        {
          association: "steps",
          order: [["step_order", "ASC"]],
        },
      ],
    });
  };

  Error.findPopular = function (limit = 10) {
    return this.findAll({
      where: {
        is_active: true,
      },
      order: [["frequency_percentage", "DESC"]],
      limit,
    });
  };

  return Error;
};
