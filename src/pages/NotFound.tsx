import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Home,
  ArrowLeft,
  Search,
  AlertTriangle,
  Tv,
  Settings,
} from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const popularPages = [
    {
      name: "Выбор устройства",
      path: "/select-device",
      icon: Tv,
      description: "Найти поддерживаемое устройство",
    },
    {
      name: "Админ панель",
      path: "/admin",
      icon: Settings,
      description: "Управление системой",
    },
  ];

  return (
    <div className="min-h-screen tech-bg flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          className="glass-card rounded-3xl p-8 md:p-12 max-w-2xl mx-auto border border-white/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error Icon */}
          <motion.div
            className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 mx-auto glow-ring"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <AlertTriangle className="h-10 w-10 md:h-12 md:w-12 text-white" />
          </motion.div>

          {/* 404 Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-4 text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
              Страница не найдена
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
              Запрашиваемая страница не существует или была перемещена.
              Проверьте правильность введённого адреса.
            </p>
            <p className="text-sm text-gray-500 mt-2 font-mono">
              {location.pathname}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium interactive-element ripple-effect glow-ring group"
            >
              <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              На главную
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-medium interactive-element ripple-effect"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Назад
            </Button>
          </motion.div>

          {/* Popular Pages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Популярные страницы
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularPages.map((page, index) => (
                <motion.div
                  key={page.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => navigate(page.path)}
                    className="w-full p-4 h-auto text-left hover:bg-white/10 border border-white/10 rounded-xl interactive-element ripple-effect group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <page.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-white">
                          {page.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {page.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Additional search suggestion */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-gray-400 text-sm">
            Не можете найти то, что искали?{" "}
            <button
              onClick={() => navigate("/select-device")}
              className="text-blue-400 hover:text-blue-300 underline interactive-element"
            >
              Попробуйте поиск устройств
            </button>
          </p>
        </motion.div>

        {/* Floating decoration elements */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-red-400 rounded-full animate-ping opacity-40" />
        <div className="absolute bottom-32 left-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-50" />
      </div>
    </div>
  );
};

export default NotFound;
