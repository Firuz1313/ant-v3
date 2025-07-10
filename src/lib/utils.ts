/**
 * @fileoverview Утилиты и вспомогательные функции для ANT Support
 * @author ANT Support Team
 * @version 3.0.0
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ============================================================================
// STYLING UTILITIES - Утилиты стилизации
// ============================================================================

/**
 * Объединяет классы Tailwind CSS с поддержкой условной логики
 * @param inputs - Классы для объединения
 * @returns Объединенная строка классов
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Генерирует градиентные классы для различных цветов
 * @param color - Основной цвет
 * @param direction - Направление градиента
 * @returns Строка CSS классов
 */
export function generateGradient(
  color: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'indigo',
  direction: 'to-r' | 'to-br' | 'to-b' | 'to-bl' = 'to-r'
): string {
  const colorMap = {
    blue: `bg-gradient-${direction} from-blue-500 to-blue-600`,
    purple: `bg-gradient-${direction} from-purple-500 to-purple-600`,
    green: `bg-gradient-${direction} from-green-500 to-green-600`,
    orange: `bg-gradient-${direction} from-orange-500 to-orange-600`,
    red: `bg-gradient-${direction} from-red-500 to-red-600`,
    indigo: `bg-gradient-${direction} from-indigo-500 to-indigo-600`,
  };
  
  return colorMap[color];
}

// ============================================================================
// FORMATTING UTILITIES - Утилиты форматирования
// ============================================================================

/**
 * Форматирует дату в читаемый формат
 * @param date - Дата для форматирования
 * @param locale - Локаль для форматирования
 * @returns Отформатированная строка даты
 */
export function formatDate(date: Date | string, locale: string = 'ru-RU'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj);
}

/**
 * Форматирует время в читаемый формат
 * @param date - Дата/время для форматирования
 * @param locale - Локаль для форматирования
 * @returns Отформатированная строка времени
 */
export function formatTime(date: Date | string, locale: string = 'ru-RU'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

/**
 * Форматирует число пользователей с сокращениями (1.2M, 950K)
 * @param count - Количество для форматирования
 * @returns Отформатированная строка
 */
export function formatUserCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M+`;
  } else if (count >= 1000) {
    return `${Math.floor(count / 1000)}K+`;
  }
  return count.toString();
}

/**
 * Форматирует процентное значение
 * @param value - Значение от 0 до 100
 * @param decimals - Количество знаков после запятой
 * @returns Отформатированная строка
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

// ============================================================================
// VALIDATION UTILITIES - Утилиты валидации
// ============================================================================

/**
 * Проверяет валидность email адреса
 * @param email - Email для проверки
 * @returns true если email валиден
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Проверяет валидность номера телефона
 * @param phone - Номер телефона для проверки
 * @returns true если номер валиден
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Проверяет валидность URL
 * @param url - URL для проверки
 * @returns true если URL валиден
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// DEVICE UTILITIES - Утилиты устройств
// ============================================================================

/**
 * Определяет тип устройства по user agent
 * @returns Тип устройства
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = window.navigator.userAgent;
  
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    if (/iPad/i.test(userAgent) || (window.innerWidth >= 768 && window.innerWidth <= 1024)) {
      return 'tablet';
    }
    return 'mobile';
  }
  
  return 'desktop';
}

/**
 * Проверяет поддержку touch событий
 * @returns true если touch поддерживается
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Получает размеры экрана
 * @returns Объект с размерами экрана
 */
export function getScreenDimensions(): { width: number; height: number } {
  if (typeof window === 'undefined') return { width: 1920, height: 1080 };
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

// ============================================================================
// ARRAY UTILITIES - Утилиты массивов
// ============================================================================

/**
 * Перемешивает массив (алгоритм Fisher-Yates)
 * @param array - Массив для перемешивания
 * @returns Перемешанный массив
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Группирует элементы массива по заданному ключу
 * @param array - Массив для группировки
 * @param keyFn - Функция для получения ключа группировки
 * @returns Объект с группами
 */
export function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const key = keyFn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

/**
 * Убирает дубликаты из массива
 * @param array - Массив для обработки
 * @param keyFn - Функция для получения уникального ключа
 * @returns Массив без дубликатов
 */
export function uniqueBy<T>(array: T[], keyFn: (item: T) => any): T[] {
  const seen = new Set();
  return array.filter(item => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

// ============================================================================
// STRING UTILITIES - Утилиты строк
// ============================================================================

/**
 * Обрезает строку до заданной длины с добавлением многоточия
 * @param text - Текст для обрезки
 * @param maxLength - Максимальная длина
 * @returns Обрезанная строка
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Преобразует строку в kebab-case
 * @param text - Текст для преобразования
 * @returns Строка в kebab-case
 */
export function toKebabCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Преобразует строку в camelCase
 * @param text - Текст для преобразования
 * @returns Строка в camelCase
 */
export function toCamelCase(text: string): string {
  return text
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^[A-Z]/, c => c.toLowerCase());
}

/**
 * Извлекает инициалы из имени
 * @param name - Полное имя
 * @returns Инициалы
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
}

// ============================================================================
// STORAGE UTILITIES - Утилиты хранения
// ============================================================================

/**
 * Безопасное сохранение в localStorage
 * @param key - Ключ для сохранения
 * @param value - Значение для сохранения
 */
export function setStorageItem(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

/**
 * Безопасное получение из localStorage
 * @param key - Ключ для получения
 * @param defaultValue - Значение по умолчанию
 * @returns Значение из storage или значение по умолчанию
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return defaultValue;
  }
}

/**
 * Удаление элемента из localStorage
 * @param key - Ключ для удаления
 */
export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
}

// ============================================================================
// ANIMATION UTILITIES - Утилиты анимации
// ============================================================================

/**
 * Создает задержку с помощью Promise
 * @param ms - Миллисекунды для задержки
 * @returns Promise, который разрешается через указанное время
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Функция easing для плавных анимаций
 * @param t - Время (от 0 до 1)
 * @returns Значение easing (от 0 до 1)
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

/**
 * Анимация значения с заданной продолжительностью
 * @param from - Начальное значение
 * @param to - Конечное значение
 * @param duration - Продолжительность в мс
 * @param onUpdate - Callback для обновления значения
 * @param onComplete - Callback по завершении
 */
export function animateValue(
  from: number,
  to: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void
): void {
  const startTime = Date.now();
  const diff = to - from;

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    const currentValue = from + diff * easedProgress;

    onUpdate(currentValue);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else if (onComplete) {
      onComplete();
    }
  }

  requestAnimationFrame(update);
}

// ============================================================================
// ERROR HANDLING UTILITIES - Утилиты обработки ошибок
// ============================================================================

/**
 * Безопасное выполнение функции с обработкой ошибок
 * @param fn - Функция для выполнения
 * @param fallback - Значение по умолчанию при ошибке
 * @returns Результат функции или значение по умолчанию
 */
export function safeExecute<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch (error) {
    console.warn('Safe execution failed:', error);
    return fallback;
  }
}

/**
 * Создает debounced версию функции
 * @param fn - Функция для debounce
 * @param delay - Задержка в мс
 * @returns Debounced функция
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Создает throttled версию функции
 * @param fn - Функция для throttle
 * @param delay - Задержка в мс
 * @returns Throttled функция
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

// ============================================================================
// CONSTANTS - Константы
// ============================================================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
} as const;

export const Z_INDICES = {
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const;
