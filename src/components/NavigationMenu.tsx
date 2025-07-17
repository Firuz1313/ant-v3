import { useState, memo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Home,
  Tv,
  Settings,
  HelpCircle,
  ChevronUp,
  Menu,
  X,
  MonitorSpeaker,
  Headphones,
  Monitor,
} from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<any>;
  description?: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Главная",
    path: "/",
    icon: Home,
    description: "Главная страница",
  },
  {
    id: "devices",
    label: "Устройства",
    path: "/select-device",
    icon: Tv,
    description: "Выбор устройства",
  },
  {
    id: "screen",
    label: "Экран",
    path: "/device/openbox",
    icon: Monitor,
    description: "Управление экраном",
  },
  {
    id: "audio",
    label: "Звук",
    path: "/openbox/error-select",
    icon: Headphones,
    description: "Настройки звука",
  },
  {
    id: "support",
    label: "Поддержка",
    path: "/select-device",
    icon: HelpCircle,
    description: "Техническая поддержка",
  },
  {
    id: "admin",
    label: "Админка",
    path: "/admin",
    icon: Settings,
    description: "Панель администратора",
  },
];

function NavigationMenuComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      setIsOpen(false);
    },
    [navigate],
  );

  const isCurrentPath = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname],
  );

  return (
    <>
      {/* Menu Toggle Button */}
      <motion.div
        className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={toggleMenu}
          size="lg"
          className={`w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Navigation Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed bottom-24 left-6 z-40 bg-background/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-2xl min-w-[280px]"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Menu Header */}
              <div className="mb-4 pb-3 border-b border-border">
                <h3 className="font-semibold text-foreground text-lg">
                  Навигация
                </h3>
                <p className="text-sm text-muted-foreground">
                  Быстрый переход по разделам
                </p>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      onClick={() => handleNavigate(item.path)}
                      variant={isCurrentPath(item.path) ? "default" : "ghost"}
                      className={`w-full justify-start h-auto p-3 ${
                        isCurrentPath(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isCurrentPath(item.path)
                              ? "bg-primary-foreground/20"
                              : "bg-primary/10"
                          }`}
                        >
                          <item.icon
                            className={`h-5 w-5 ${
                              isCurrentPath(item.path)
                                ? "text-primary-foreground"
                                : "text-primary"
                            }`}
                          />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{item.label}</div>
                          {item.description && (
                            <div
                              className={`text-xs ${
                                isCurrentPath(item.path)
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Menu Footer */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground text-center">
                  ANT Support v3.0
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export const NavigationMenu = memo(NavigationMenuComponent);
