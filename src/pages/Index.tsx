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
import { LanguageToggle } from "@/components/LanguageToggle";
import { LazyComponent } from "@/components/LazyComponent";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGetStarted = () => {
    navigate("/select-device");
  };

  const stats = [
    { label: t("stats.devices"), value: "15+", icon: Tv },
    { label: t("stats.scenarios"), value: "200+", icon: Zap },
    { label: t("stats.users"), value: "50K+", icon: Users },
    { label: t("stats.solved"), value: "95%", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Simplified background - reduced GPU load */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl opacity-50" />
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl opacity-40" />
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
                <h1 className="font-bold text-2xl text-foreground">
                  ANT{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
                    Support
                  </span>
                </h1>
                <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">
                  Виртуальная ТВ диагностика
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center space-x-1 md:space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <LanguageToggle />
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
              className="text-4xl md:text-5xl xl:text-6xl font-bold text-foreground mb-8 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1, type: "spring" }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700">
                {t("main.title")}
              </span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t("main.description")}
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
                className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 group"
              >
                <span className="relative z-10 flex items-center">
                  <Tv className="mr-3 h-5 w-5" />
                  {t("main.button")}
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Статистика */}
          <LazyComponent rootMargin="50px">
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </LazyComponent>

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

      {/* Minimal decoration elements - performance optimized */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400 rounded-full opacity-20" />
      <div className="absolute bottom-32 left-20 w-2 h-2 bg-purple-400 rounded-full opacity-20" />
      <div className="absolute top-1/3 left-32 w-1 h-1 bg-cyan-400 rounded-full opacity-30" />
    </div>
  );
};

export default Index;
