/**
 * @fileoverview Конфигурация и константы для ANT Support
 * @author ANT Support Team
 * @version 3.0.0
 */

// ============================================================================
// APPLICATION CONFIGURATION - Конфигурация приложения
// ============================================================================

export const APP_CONFIG = {
  name: 'ANT Support',
  version: '3.0.0',
  description: 'Платформа технической поддержки цифрового ТВ',
  author: 'ANT Support Team',
  
  // URL конфигурация
  urls: {
    website: 'https://ant-support.com',
    api: 'https://api.ant-support.com',
    support: 'https://support.ant-support.com',
    docs: 'https://docs.ant-support.com',
  },
  
  // Контактная информация
  contacts: {
    email: 'support@ant-tv.com',
    telegram: '@ant_support',
    phone: '+7 (700) 123-45-67',
  },
} as const;

// ============================================================================
// DEVICE CONFIGURATION - Конфигурация устройств
// ============================================================================

export const SUPPORTED_DEVICES = [
  {
    id: 'openbox' as const,
    name: 'OpenBox',
    model: 'A Series',
    manufacturer: 'OpenBox Technology',
    users: '2.3M+',
    status: 'активен' as const,
    image: '/devices/openbox.jpg',
    description: 'Популярная спутниковая приставка с поддержкой HD',
    features: [
      'HD видео качество',
      'Поддержка DVB-S2',
      'USB порты',
      'Ethernet подключение',
      'HDMI выход',
    ],
    supportedFormats: ['MPEG-2', 'MPEG-4', 'H.264'],
    specifications: {
      cpu: 'ARM Cortex A7 Dual Core',
      ram: '512MB DDR3',
      storage: '256MB Flash',
      videoOutput: ['HDMI', 'Composite'],
      audioOutput: ['HDMI', 'RCA', 'SPDIF'],
      connectivity: ['Ethernet', 'USB 2.0 x2'],
      powerConsumption: '12W',
      dimensions: '220 x 135 x 35 мм',
      weight: '0.8 кг',
    },
  },
  {
    id: 'openbox-gold' as const,
    name: 'OpenBox Gold',
    model: 'Premium Series',
    manufacturer: 'OpenBox Technology',
    users: '1.8M+',
    status: 'активен' as const,
    image: '/devices/openbox-gold.jpg',
    description: 'Премиум приставка с расширенными возможностями',
    features: [
      '4K Ultra HD',
      'Android TV',
      'WiFi модуль',
      'Поддержка IPTV',
      'Голосовое управление',
    ],
    supportedFormats: ['MPEG-2', 'MPEG-4', 'H.264', 'H.265'],
    specifications: {
      cpu: 'ARM Cortex A53 Quad Core',
      ram: '2GB DDR4',
      storage: '8GB eMMC',
      videoOutput: ['HDMI 2.0', 'USB-C'],
      audioOutput: ['HDMI', 'Bluetooth', 'SPDIF'],
      connectivity: ['WiFi 802.11ac', 'Ethernet', 'USB 3.0 x2'],
      powerConsumption: '15W',
      dimensions: '240 x 150 x 40 мм',
      weight: '1.2 кг',
    },
  },
  {
    id: 'uclan' as const,
    name: 'Uclan',
    model: 'Universal Series',
    manufacturer: 'Uclan Technology',
    users: '1.2M+',
    status: 'активен' as const,
    image: '/devices/uclan.jpg',
    description: 'Универсальная приставка для всех типов вещания',
    features: [
      'Мультиформатность',
      'Встроенный медиаплеер',
      'Таймер записи',
      'Парадитал управление',
      'Обновления по воздуху',
    ],
    supportedFormats: ['MPEG-2', 'MPEG-4', 'H.264'],
    specifications: {
      cpu: 'MIPS 750MHz',
      ram: '256MB DDR2',
      storage: '128MB Flash',
      videoOutput: ['HDMI', 'Component', 'Composite'],
      audioOutput: ['HDMI', 'RCA', 'Coaxial'],
      connectivity: ['Ethernet', 'USB 2.0'],
      powerConsumption: '10W',
      dimensions: '200 x 130 x 30 мм',
      weight: '0.6 кг',
    },
  },
  {
    id: 'hdbox' as const,
    name: 'HDBox',
    model: 'Compact Series',
    manufacturer: 'HDBox Corporation',
    users: '950K+',
    status: 'активен' as const,
    image: '/devices/hdbox.jpg',
    description: 'Компактная и надежная HD приставка',
    features: [
      'Компактный размер',
      'Надежность',
      'Простота настройки',
      'Низкое энергопотребление',
      'Тихая работа',
    ],
    supportedFormats: ['MPEG-2', 'MPEG-4'],
    specifications: {
      cpu: 'ARM9 400MHz',
      ram: '128MB DDR',
      storage: '64MB Flash',
      videoOutput: ['HDMI', 'Composite'],
      audioOutput: ['HDMI', 'RCA'],
      connectivity: ['USB 2.0'],
      powerConsumption: '8W',
      dimensions: '180 x 120 x 25 мм',
      weight: '0.4 кг',
    },
  },
] as const;

// ============================================================================
// UI CONFIGURATION - Конфигурация интерфейса
// ============================================================================

export const UI_CONFIG = {
  // Цветовая схема
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a',
    },
    ant: {
      blue: '#2563eb',
      blueLight: '#60a5fa',
      blueDark: '#1d4ed8',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
    },
  },
  
  // Анимации
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },
  
  // Размеры
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  
  // Радиусы скругления
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
  },
} as const;

// ============================================================================
// TV INTERFACE CONFIGURATION - Конфигурация ТВ интерфейса
// ============================================================================

export const TV_CONFIG = {
  // Размеры экрана
  screen: {
    width: 900,
    height: 480,
    aspectRatio: '16:9',
  },
  
  // Настройки каналов
  channels: {
    maxChannels: 9999,
    defaultChannelCount: 182,
    radioChannelCount: 12,
    channelsPerPage: 10,
  },
  
  // Настройки пульта
  remote: {
    buttonDelay: 150,
    longPressDelay: 800,
    repeatDelay: 100,
  },
  
  // Поиск каналов
  search: {
    progressStep: 0.5,
    updateInterval: 100,
    maxProgress: 100,
    signalThreshold: 60,
    qualityThreshold: 70,
  },
} as const;

// ============================================================================
// ERROR CONFIGURATION - Конфигурация ошибок
// ============================================================================

export const ERROR_CONFIG = {
  categories: {
    connection: {
      id: 'connection',
      title: 'Проблемы подключения',
      description: 'Ошибки связанные с подключением к сети или спутнику',
      icon: 'wifi-off',
      color: '#ef4444',
    },
    signal: {
      id: 'signal',
      title: 'Проблемы с сигналом',
      description: 'Слабый или отсутствующий сигнал',
      icon: 'signal',
      color: '#f59e0b',
    },
    software: {
      id: 'software',
      title: 'Программные ошибки',
      description: 'Ошибки в программном обеспечении',
      icon: 'code',
      color: '#8b5cf6',
    },
    hardware: {
      id: 'hardware',
      title: 'Аппаратные проблемы',
      description: 'Неисправности оборудования',
      icon: 'cpu',
      color: '#ef4444',
    },
    configuration: {
      id: 'configuration',
      title: 'Настройки',
      description: 'Проблемы с конфигурацией',
      icon: 'settings',
      color: '#6b7280',
    },
    channels: {
      id: 'channels',
      title: 'Каналы',
      description: 'Проблемы с каналами и контентом',
      icon: 'tv',
      color: '#10b981',
    },
  },
  
  severityLevels: {
    low: {
      level: 'low',
      title: 'Низкая',
      color: '#10b981',
      priority: 1,
    },
    medium: {
      level: 'medium',
      title: 'Средняя',
      color: '#f59e0b',
      priority: 2,
    },
    high: {
      level: 'high',
      title: 'Высокая',
      color: '#ef4444',
      priority: 3,
    },
    critical: {
      level: 'critical',
      title: 'Критическая',
      color: '#dc2626',
      priority: 4,
    },
  },
} as const;

// ============================================================================
// FEATURE FLAGS - Флаги функций
// ============================================================================

export const FEATURE_FLAGS = {
  // 3D функции
  enable3DModels: true,
  enableAdvanced3D: false,
  
  // UI функции
  enableAnimations: true,
  enableSoundEffects: false,
  enableHapticFeedback: false,
  
  // Функции разработки
  enableDebugMode: typeof window !== 'undefined' && window.location.hostname === 'localhost',
  enablePerformanceMonitoring: true,
  enableErrorReporting: true,
  
  // Экспериментальные функции
  enableAIAssistant: false,
  enableVoiceControl: false,
  enableARMode: false,
} as const;

// ============================================================================
// API CONFIGURATION - Конфигурация API
// ============================================================================

export const API_CONFIG = {
  baseURL: 'https://api.ant-support.com',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  
  endpoints: {
    devices: '/api/devices',
    errors: '/api/errors',
    solutions: '/api/solutions',
    feedback: '/api/feedback',
    analytics: '/api/analytics',
    updates: '/api/updates',
  },
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Version': 'v3',
  },
} as const;

// ============================================================================
// STORAGE KEYS - Ключи для хранения
// ============================================================================

export const STORAGE_KEYS = {
  // Пользовательские настройки
  userSettings: 'ant_support_user_settings',
  selectedDevice: 'ant_support_selected_device',
  theme: 'ant_support_theme',
  language: 'ant_support_language',
  
  // Состояние приложения
  tvState: 'ant_support_tv_state',
  channelList: 'ant_support_channel_list',
  errorHistory: 'ant_support_error_history',
  
  // Кеш
  deviceModels: 'ant_support_device_models_cache',
  errorDatabase: 'ant_support_error_db_cache',
  
  // Аналитика
  sessionData: 'ant_support_session_data',
  usageStats: 'ant_support_usage_stats',
} as const;

// ============================================================================
// VALIDATION RULES - Правила валидации
// ============================================================================

export const VALIDATION_RULES = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Введите корректный email адрес',
  },
  
  phone: {
    required: false,
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Введите корректный номер телефона',
  },
  
  deviceId: {
    required: true,
    enum: ['openbox', 'openbox-gold', 'uclan', 'hdbox'],
    message: 'Выберите поддерживаемое устройство',
  },
  
  feedback: {
    minLength: 10,
    maxLength: 1000,
    message: 'Отзыв должен содержать от 10 до 1000 символов',
  },
} as const;

// ============================================================================
// PERFORMANCE SETTINGS - Настройки производительности
// ============================================================================

export const PERFORMANCE_CONFIG = {
  // Рендеринг
  maxFPS: 60,
  enableVSync: true,
  antialiasing: true,
  shadows: true,
  
  // Загрузка
  imageQuality: 'high' as 'low' | 'medium' | 'high',
  preloadImages: true,
  lazyLoadThreshold: 0.1,
  
  // Кеширование
  cacheTimeout: 5 * 60 * 1000, // 5 минут
  maxCacheSize: 50 * 1024 * 1024, // 50 MB
  
  // Дебаунсинг
  searchDebounce: 300,
  resizeDebounce: 150,
  scrollDebounce: 100,
} as const;

// ============================================================================
// LOCALIZATION - Локализация
// ============================================================================

export const LOCALIZATION_CONFIG = {
  defaultLocale: 'ru',
  supportedLocales: ['ru', 'en', 'uz', 'kz'],
  
  locales: {
    ru: {
      code: 'ru',
      name: 'Русский',
      flag: '🇷🇺',
      rtl: false,
    },
    en: {
      code: 'en',
      name: 'English',
      flag: '🇺🇸',
      rtl: false,
    },
    uz: {
      code: 'uz',
      name: 'O\'zbekcha',
      flag: '🇺🇿',
      rtl: false,
    },
    kz: {
      code: 'kz',
      name: 'Қазақша',
      flag: '🇰🇿',
      rtl: false,
    },
  },
} as const;

// ============================================================================
// EXPORTED TYPES - Экспортируемые типы
// ============================================================================

export type DeviceId = typeof SUPPORTED_DEVICES[number]['id'];
export type ErrorCategory = keyof typeof ERROR_CONFIG.categories;
export type ErrorSeverity = keyof typeof ERROR_CONFIG.severityLevels;
export type SupportedLocale = keyof typeof LOCALIZATION_CONFIG.locales;