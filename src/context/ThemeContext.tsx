import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      let initialTheme: Theme = "light";

      // Check localStorage
      try {
        const saved = localStorage.getItem("ant-theme") as Theme;
        if (saved && (saved === "light" || saved === "dark")) {
          initialTheme = saved;
        } else if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          initialTheme = "dark";
        }
      } catch (error) {
        console.warn("Failed to read theme from localStorage:", error);
      }

      setThemeState(initialTheme);
    };

    initializeTheme();
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme);

    // For compatibility with existing dark class
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Save to localStorage
    try {
      localStorage.setItem("ant-theme", theme);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }

    // Update CSS custom properties for cursor
    document.documentElement.style.setProperty(
      "--cursor-color",
      theme === "light" ? "#3b82f6" : "#60a5fa",
    );
    document.documentElement.style.setProperty(
      "--cursor-hover-color",
      theme === "light" ? "#2563eb" : "#3b82f6",
    );
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
