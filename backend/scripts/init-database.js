const bcrypt = require("bcryptjs");
const { sequelize, Device, Error, ErrorStep, Admin } = require("../models");
require("dotenv").config();

async function initializeDatabase() {
  console.log("🔄 Initializing ANT-V3 database...");

  try {
    // Test connection
    await sequelize.authenticate();
    console.log("✅ Database connection established.");

    // Sync models
    await sequelize.sync({ force: true });
    console.log("✅ Database models synchronized.");

    // Create default admin user
    const adminPassword = await bcrypt.hash(
      process.env.ADMIN_DEFAULT_PASSWORD || "admin123",
      12,
    );

    const admin = await Admin.create({
      username: "admin",
      email: "admin@ant-v3.com",
      password_hash: adminPassword,
      role: "super_admin",
      is_active: true,
    });
    console.log("✅ Default admin user created.");

    // Create sample devices
    const devices = [
      {
        device_id: "openbox",
        name: "OpenBox",
        model: "S9 HD PVR",
        manufacturer: "OpenBox",
        description: "Классическая модель с базовым функционалом",
        icon_name: "Tv",
        color_scheme: "from-blue-500 to-blue-600",
        features: ["HD поддержка", "USB запись", "Ethernet"],
        specifications: {
          processor: "BCM7362",
          memory: "512MB",
          storage: "256MB",
          tuner: "DVB-S2",
        },
        firmware_version: "v2.1.45",
        supported_channels: 147,
        price_range: "от 3,500 ₽",
        popularity_score: 84,
        user_count: "2.3M+",
        status: "active",
        is_supported: true,
        support_level: "standard",
        sort_order: 1,
      },
      {
        device_id: "openbox-gold",
        name: "OpenBox Gold",
        model: "A5 Plus 4K",
        manufacturer: "OpenBox",
        description: "Премиум модель с расширенными возможностями",
        icon_name: "Monitor",
        color_scheme: "from-amber-500 to-orange-600",
        features: ["4K ��оддержка", "Smart приложения", "WiFi встроенный"],
        specifications: {
          processor: "BCM7252S",
          memory: "1GB",
          storage: "8GB",
          tuner: "DVB-S2X",
        },
        firmware_version: "v3.2.18",
        supported_channels: 203,
        price_range: "от 7,200 ₽",
        popularity_score: 94,
        user_count: "1.8M+",
        status: "active",
        is_supported: true,
        support_level: "premium",
        sort_order: 2,
      },
      {
        device_id: "uclan",
        name: "Uclan",
        model: "Denys H.265",
        manufacturer: "Uclan",
        description: "Профессиональная приставка для IPTV",
        icon_name: "Radio",
        color_scheme: "from-purple-500 to-purple-600",
        features: ["Multi-тюнер", "IPTV", "Web интерфейс"],
        specifications: {
          processor: "HiSilicon Hi3798MV200",
          memory: "2GB",
          storage: "8GB",
          tuner: "DVB-S2 + DVB-T2",
        },
        firmware_version: "v4.1.7",
        supported_channels: 312,
        price_range: "от 5,800 ₽",
        popularity_score: 78,
        user_count: "1.2M+",
        status: "active",
        is_supported: true,
        support_level: "premium",
        sort_order: 3,
      },
    ];

    for (const deviceData of devices) {
      await Device.create(deviceData);
    }
    console.log("✅ Sample devices created.");

    // Create sample errors
    const errors = [
      {
        error_key: "signal",
        category: "signal",
        title: "Проблемы с сигналом",
        description: "Отсутствие сигнала, слабый сигнал или помехи",
        icon_name: "Signal",
        color_scheme: "from-red-500 to-red-600",
        priority: "high",
        frequency_percentage: 89,
        avg_resolve_time: "5-10 мин",
        sort_order: 1,
      },
      {
        error_key: "no-signal",
        parent_error_key: "signal",
        category: "signal",
        title: "Нет сигнала",
        description: "Полное отсутствие сигнала на всех каналах",
        icon_name: "AlertTriangle",
        color_scheme: "from-red-500 to-red-600",
        priority: "critical",
        difficulty: "easy",
        frequency_percentage: 95,
        avg_resolve_time: "5 мин",
        popularity_score: 95,
        symptoms: [
          "Черный экран ��а всех каналах",
          "Сообщение 'Нет сигнала'",
          "Индикатор сигнала показывает 0%",
        ],
        causes: [
          "Отключен кабель антенны",
          "Неисправность LNB",
          "Поломка кабеля",
          "Неправильная настройка антенны",
        ],
        sort_order: 1,
      },
      {
        error_key: "channels",
        category: "channels",
        title: "Проблемы с каналами",
        description: "Кодированные каналы, отсутствующие каналы или настройка",
        icon_name: "Tv",
        color_scheme: "from-orange-500 to-orange-600",
        priority: "medium",
        frequency_percentage: 76,
        avg_resolve_time: "10-15 мин",
        sort_order: 2,
      },
      {
        error_key: "encrypted",
        parent_error_key: "channels",
        category: "channels",
        title: "Кодированные каналы",
        description: "Каналы показывают зашифрованный контент",
        icon_name: "Shield",
        color_scheme: "from-orange-500 to-orange-600",
        priority: "medium",
        difficulty: "medium",
        frequency_percentage: 88,
        avg_resolve_time: "10 мин",
        popularity_score: 88,
        symptoms: [
          "Черный экран с замком",
          "Сообщение о кодировке",
          "Звук есть, изображения нет",
        ],
        causes: [
          "Отсутствует CAM модуль",
          "Неправильная карта доступа",
          "Истек срок подписки",
          "Неисправность смарт-карты",
        ],
        sort_order: 1,
      },
    ];

    for (const errorData of errors) {
      await Error.create(errorData);
    }
    console.log("✅ Sample errors created.");

    // Create sample error steps
    const errorSteps = [
      {
        error_id: (await Error.findOne({ where: { error_key: "no-signal" } }))
          .id,
        step_order: 1,
        title: "Проверка подключения кабеля",
        description:
          "Убедитесь, что коаксиальный кабель надежно подключен к приставке и антенне",
        action_type: "check",
        expected_result: "Кабель плотно подключен без повреждений",
        troubleshooting_tips: [
          "Проверьте F-разъемы на коррозию",
          "Убедитесь в отсутствии перегибов кабеля",
        ],
        is_critical: true,
      },
      {
        error_id: (await Error.findOne({ where: { error_key: "no-signal" } }))
          .id,
        step_order: 2,
        title: "Проверка настроек антенны",
        description: "Перейдите в меню настроек и запустите поиск каналов",
        action_type: "configure",
        expected_result: "Приставка найдет доступные каналы",
        troubleshooting_tips: [
          "Используйте автоматический поиск",
          "Проверьте настройки спутника",
        ],
        is_critical: true,
      },
    ];

    for (const stepData of errorSteps) {
      await ErrorStep.create(stepData);
    }
    console.log("✅ Sample error steps created.");

    console.log("🎉 Database initialization completed successfully!");
    console.log("📧 Admin credentials:");
    console.log("   Username: admin");
    console.log(
      "   Password:",
      process.env.ADMIN_DEFAULT_PASSWORD || "admin123",
    );
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Run initialization if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
