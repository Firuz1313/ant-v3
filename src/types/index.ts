/**
 * @fileoverview Централизованные TypeScript типы для ANT Support приложения
 * @author ANT Support Team
 * @version 3.0.0
 */

// ============================================================================
// DEVICE TYPES - Типы устройств
// ============================================================================

export type DeviceId = 'openbox' | 'openbox-gold' | 'uclan' | 'hdbox';

export interface Device {
  id: DeviceId;
  name: string;
  model: string;
  manufacturer: string;
  users: string;
  status: 'активен' | 'неактивен' | 'тестирование';
  image?: string;
  description?: string;
  features: string[];
  supportedFormats: string[];
  specifications: DeviceSpecifications;
}

export interface DeviceSpecifications {
  cpu: string;
  ram: string;
  storage: string;
  videoOutput: string[];
  audioOutput: string[];
  connectivity: string[];
  powerConsumption: string;
  dimensions: string;
  weight: string;
}

// ============================================================================
// TV CONTROL TYPES - Типы управления ТВ
// ============================================================================

export type RemoteKey = 
  | 'power' | 'mute' | 'menu' | 'exit' | 'ok' | 'back'
  | 'up' | 'down' | 'left' | 'right'
  | 'home' | 'guide' | 'info' | 'list'
  | 'red' | 'green' | 'yellow' | 'blue'
  | 'volume_up' | 'volume_down'
  | 'channel_up' | 'channel_down'
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

export interface TVCommand {
  type: 'navigation' | 'number' | 'custom' | 'function';
  action?: string;
  key?: RemoteKey;
  value?: string | number;
}

export interface TVState {
  isOn: boolean;
  currentScreen: TVScreen;
  selectedMenuIndex: number;
  selectedChannelIndex: number;
  volume: number;
  isMuted: boolean;
  channelListOpen: boolean;
  currentChannel: Channel;
  activePanelBtn: number | null;
  searchProgress: number;
  tvChannelList: string[];
  radioChannelList: string[];
  channelsToDelete: Set<number>;
  conaxInfoOpen: boolean;
  subscriptionStatusOpen: boolean;
  searchInProgress: boolean;
}

export type TVScreen = 
  | 'home' 
  | 'apps' 
  | 'channelEditor' 
  | 'settings' 
  | 'installation'
  | 'antennaSetup'
  | 'searchSettings'
  | 'languageSettings'
  | 'abSettings'
  | 'accessCard';

// ============================================================================
// CHANNEL TYPES - Типы каналов
// ============================================================================

export interface Channel {
  id: number;
  name: string;
  number: number;
  type: 'tv' | 'radio';
  category: string;
  isEncrypted: boolean;
  isHD: boolean;
  isActive: boolean;
  logo?: string;
  epgId?: string;
  frequency?: number;
  symbolRate?: number;
  polarization?: 'V' | 'H';
}

export interface ChannelGroup {
  id: string;
  name: string;
  channels: Channel[];
  isExpanded: boolean;
}

export interface ChannelSearchProgress {
  progress: number;
  tvChannels: Channel[];
  radioChannels: Channel[];
  currentFrequency?: number;
  currentTransponder?: string;
}

// ============================================================================
// MENU TYPES - Типы меню
// ============================================================================

export interface MenuItem {
  id: string;
  label: string;
  icon?: any;
  iconColor?: string;
  action?: string;
  submenu?: MenuItem[];
  isActive?: boolean;
  disabled?: boolean;
}

export interface MenuContext {
  currentMenu: MenuItem[];
  selectedIndex: number;
  breadcrumb: string[];
  isModalOpen: boolean;
}

// ============================================================================
// ERROR HANDLING TYPES - Типы обработки ошибок
// ============================================================================

export interface ErrorInfo {
  key: string;
  title: string;
  description: string;
  category: ErrorCategory;
  severity: ErrorSeverity;
  solutions: ErrorSolution[];
  relatedErrors?: string[];
  videoGuide?: string;
  estimatedTime?: string;
}

export type ErrorCategory = 
  | 'connection' 
  | 'signal' 
  | 'software' 
  | 'hardware' 
  | 'configuration' 
  | 'channels';

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorSolution {
  id: string;
  title: string;
  steps: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  requiredTools?: string[];
  videoUrl?: string;
  images?: string[];
}

// ============================================================================
// UI COMPONENT TYPES - Типы UI компонентов
// ============================================================================

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: any;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: any;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  onClick?: () => void;
  children: any;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  striped?: boolean;
}

// ============================================================================
// 3D TYPES - Типы для 3D графики
// ============================================================================

export interface DeviceModel3D {
  modelPath: string;
  texturePath?: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  animations?: Animation3D[];
}

export interface Animation3D {
  name: string;
  duration: number;
  loop: boolean;
  autoPlay: boolean;
}

export interface Camera3DSettings {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  near: number;
  far: number;
  enableControls: boolean;
  autoRotate: boolean;
  autoRotateSpeed: number;
}

// ============================================================================
// API TYPES - Типы для API
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: string;
  version: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  stack?: string;
}

export interface PaginatedResponse<T = any> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// ============================================================================
// SETTINGS TYPES - Типы настроек
// ============================================================================

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'ru' | 'en' | 'uz' | 'kz';
  autoSave: boolean;
  notifications: NotificationSettings;
  performance: PerformanceSettings;
  accessibility: AccessibilitySettings;
}

export interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  email: boolean;
  types: ('info' | 'warning' | 'error' | 'success')[];
}

export interface PerformanceSettings {
  enableAnimations: boolean;
  enableShadows: boolean;
  enableAntialiasing: boolean;
  renderQuality: 'low' | 'medium' | 'high' | 'ultra';
  maxFPS: number;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
}

// ============================================================================
// UTILITY TYPES - Вспомогательные типы
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// ============================================================================
// EVENT TYPES - Типы событий
// ============================================================================

export interface CustomEvent<T = any> extends Event {
  detail: T;
}

export interface RemoteControlEvent extends CustomEvent<{
  key: RemoteKey;
  deviceId?: DeviceId;
  timestamp: number;
}> {}

export interface ChannelChangeEvent extends CustomEvent<{
  from: Channel;
  to: Channel;
  source: 'remote' | 'gui' | 'api';
}> {}

export interface ErrorOccurredEvent extends CustomEvent<{
  error: ErrorInfo;
  context: string;
  timestamp: number;
}> {}

// ============================================================================
// CONSTANTS - Константы типов
// ============================================================================

export const DEVICE_IDS = ['openbox', 'openbox-gold', 'uclan', 'hdbox'] as const;
export const REMOTE_KEYS = [
  'power', 'mute', 'menu', 'exit', 'ok', 'back',
  'up', 'down', 'left', 'right',
  'home', 'guide', 'info', 'list',
  'red', 'green', 'yellow', 'blue',
  'volume_up', 'volume_down',
  'channel_up', 'channel_down',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
] as const;

export const TV_SCREENS = [
  'home', 'apps', 'channelEditor', 'settings', 
  'installation', 'antennaSetup', 'searchSettings',
  'languageSettings', 'abSettings', 'accessCard'
] as const;

export const ERROR_CATEGORIES = [
  'connection', 'signal', 'software', 
  'hardware', 'configuration', 'channels'
] as const;

export const ERROR_SEVERITIES = ['low', 'medium', 'high', 'critical'] as const;