import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    // Main page
    "main.title": "Ваш онлайн-помощник от ANT",
    "main.description":
      "Быстрое решение проблем с цифровыми ТВ-приставками через интерактивный интерфейс и виртуальные пульты управления",
    "main.button": "Выбрать приставку",

    // Navigation
    "nav.home": "Главная",
    "nav.devices": "Устройства",
    "nav.audio": "Аудио",
    "nav.history": "История",
    "nav.video": "Видео",
    "nav.support": "Поддержка",
    "nav.admin": "Админка",

    // Device page
    "device.title": "Выбор устройства",
    "device.subtitle": "Поддерживаемые ТВ-приставки",
    "device.search": "Поиск по названию модели...",
    "device.all": "Все устройства",
    "device.supported": "Поддерживаемые",
    "device.popular": "Популярные",
    "device.new": "Новинки",

    // Common
    "common.loading": "Загрузка...",
    "common.error": "Ошибка",
    "common.back": "Назад",
    "common.next": "Далее",
    "common.cancel": "Отмена",
    "common.save": "Сохранить",

    // Stats
    "stats.devices": "Поддерживаемых устройств",
    "stats.scenarios": "Диагностических сценариев",
    "stats.users": "Активных пользователей",
    "stats.solved": "Решённых проблем",

    // Footer
    "footer.version": "ANT Support v3.0",
    "footer.description": "Виртуальная ТВ диагностика",
  },

  en: {
    // Main page
    "main.title": "Your online assistant from ANT",
    "main.description":
      "Quick solution for digital TV set-top box problems through interactive interface and virtual remote controls",
    "main.button": "Select Device",

    // Navigation
    "nav.home": "Home",
    "nav.devices": "Devices",
    "nav.audio": "Audio",
    "nav.history": "History",
    "nav.video": "Video",
    "nav.support": "Support",
    "nav.admin": "Admin",

    // Device page
    "device.title": "Device Selection",
    "device.subtitle": "Supported TV Set-top Boxes",
    "device.search": "Search by model name...",
    "device.all": "All Devices",
    "device.supported": "Supported",
    "device.popular": "Popular",
    "device.new": "New",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.back": "Back",
    "common.next": "Next",
    "common.cancel": "Cancel",
    "common.save": "Save",

    // Stats
    "stats.devices": "Supported Devices",
    "stats.scenarios": "Diagnostic Scenarios",
    "stats.users": "Active Users",
    "stats.solved": "Problems Solved",

    // Footer
    "footer.version": "ANT Support v3.0",
    "footer.description": "Virtual TV Diagnostics",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first, then browser language, fallback to Russian
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ant-language") as Language;
      if (saved && (saved === "ru" || saved === "en")) {
        return saved;
      }

      // Check browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("en")) {
        return "en";
      }
    }
    return "ru";
  });

  useEffect(() => {
    // Save to localStorage
    try {
      localStorage.setItem("ant-language", language);
    } catch (error) {
      console.warn("Failed to save language to localStorage:", error);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "ru" ? "en" : "ru"));
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, setLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
