import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Tv,
  Settings,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Users,
  Monitor,
  Radio,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/select-device");
  };

  const stats = [
    { label: "Поддерживаемых устройств", value: "15+", icon: Tv },
    { label: "Диагностических сценариев", value: "200+", icon: Zap },
    { label: "Активных пользователей", value: "50K+", icon: Users },
    { label: "Решённых проблем", value: "95%", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Анимированный фон с частицами */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Минималистичный хедер */}
      <motion.header
        className="relative z-10 backdrop-blur-sm bg-background/80 border-b border-border"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl glow-ring">
                <Tv className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-2xl text-white text-glow">
                  ANT{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Support
                  </span>
                </h1>
                <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
                  Виртуальная ТВ диагностика
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-accent interactive-element"
                onClick={() => navigate("/admin")}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Главный контент */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="container mx-auto px-6 text-center">
          {/* Главный заголовок */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl md:text-7xl xl:text-8xl font-bold text-white mb-8 text-glow leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, type: "spring" }}
            >
              <span className="block mb-2">Добро пожаловать в</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 animate-gradient-shift">
                ANT Support
              </span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl xl:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Передовая платформа для диагностики и поддержки цифровых
              ТВ-приставок.
              <br className="hidden md:block" />
              <span className="text-blue-400">
                Интерактивный интерфейс
              </span> и{" "}
              <span className="text-purple-400">
                реалистичные пульты управления
              </span>{" "}
              для быстрого решения проблем.
            </motion.p>

            {/* Главная кнопка */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white px-16 py-7 text-xl font-bold rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 interactive-element ripple-effect glow-ring group"
              >
                <span className="relative z-10 flex items-center">
                  <Sparkles className="mr-4 h-7 w-7 animate-pulse" />
                  Начать д��агностику
                  <ArrowRight className="ml-4 h-7 w-7 transition-transform group-hover:translate-x-2" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Статистика */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card rounded-3xl p-8 text-center group hover:scale-105 transition-all duration-300 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2 text-glow">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Дополнительная информация */}
          <motion.div
            className="glass-card rounded-3xl p-10 max-w-3xl mx-auto border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4">
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4">
                <Radio className="h-6 w-6 text-white" />
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
                <Tv className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-glow">
              Поддерживаемые устройства
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              <span className="text-blue-400 font-semibold">OpenBox</span>,{" "}
              <span className="text-purple-400 font-semibold">
                OpenBox Gold
              </span>
              , <span className="text-cyan-400 font-semibold">Uclan</span>,{" "}
              <span className="text-green-400 font-semibold">HDBox</span> и
              другие популярные модели цифровых ТВ-приставок. Каждое устройство
              имеет свой реалистичный интерфейс и виртуальный пульт управления.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Enhanced floating decoration elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-30 shadow-lg" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40 shadow-lg" />
      <div className="absolute top-1/2 right-32 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-50 shadow-lg" />
      <div className="absolute top-1/3 left-32 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-60 shadow-lg" />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-35 shadow-lg" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl animate-pulse" />
    </div>
  );
};

export default Index;
