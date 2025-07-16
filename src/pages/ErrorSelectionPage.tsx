import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  Filter,
  AlertTriangle,
  Tv,
  Wifi,
  Signal,
  Settings,
  Zap,
  Shield,
  Radio,
  MonitorSpeaker,
  ChevronDown,
  ChevronRight,
  Clock,
  TrendingUp,
  Users,
  Star,
  HelpCircle,
} from "lucide-react";

// Enhanced error data with more detailed categorization
const errorCategories = [
  {
    key: "signal",
    title: "Проблемы с сигналом",
    description: "Отсутствие сигнала, слабый сигнал или помехи",
    icon: Signal,
    color: "from-red-500 to-red-600",
    priority: "high",
    frequency: 89,
    avgResolveTime: "5-10 мин",
    subErrors: [
      {
        key: "no-signal",
        title: "Нет сигнала",
        description: "Полное отсутствие сигнала на всех каналах",
        icon: AlertTriangle,
        difficulty: "easy",
        steps: 4,
        popularity: 95,
      },
      {
        key: "weak-signal",
        title: "Слабый сигнал",
        description: "Плохое качество сигнала, рассыпание изображения",
        icon: Signal,
        difficulty: "medium",
        steps: 6,
        popularity: 78,
      },
      {
        key: "intermittent",
        title: "Прерывистый сигнал",
        description: "Сигнал периодически пропадает",
        icon: Zap,
        difficulty: "medium",
        steps: 5,
        popularity: 62,
      },
      {
        key: "noise",
        title: "Помехи на экране",
        description: "Шумы, полосы или артефакты на изображен��и",
        icon: MonitorSpeaker,
        difficulty: "hard",
        steps: 8,
        popularity: 45,
      },
    ],
  },
  {
    key: "channels",
    title: "Проблемы с каналами",
    description: "Кодированные каналы, отсутствующие каналы или настройка",
    icon: Tv,
    color: "from-orange-500 to-orange-600",
    priority: "medium",
    frequency: 76,
    avgResolveTime: "10-15 мин",
    subErrors: [
      {
        key: "encrypted",
        title: "Кодированные каналы",
        description: "Каналы показывают зашифрованный контент",
        icon: Shield,
        difficulty: "medium",
        steps: 5,
        popularity: 88,
      },
      {
        key: "missing",
        title: "Отсутствующие каналы",
        description: "Ожидаемые каналы не найдены",
        icon: Tv,
        difficulty: "easy",
        steps: 3,
        popularity: 72,
      },
      {
        key: "poor-quality",
        title: "Плохое качество видео",
        description: "Каналы отображаются с низким качеством",
        icon: MonitorSpeaker,
        difficulty: "medium",
        steps: 6,
        popularity: 56,
      },
      {
        key: "audio-issues",
        title: "Проблемы со звуком",
        description: "Отсутствует звук или искажения аудио",
        icon: Radio,
        difficulty: "easy",
        steps: 4,
        popularity: 41,
      },
    ],
  },
  {
    key: "network",
    title: "Сеть и подключение",
    description: "Интернет-соединение, настройка сети и потоковое вещание",
    icon: Wifi,
    color: "from-blue-500 to-blue-600",
    priority: "high",
    frequency: 65,
    avgResolveTime: "15-20 мин",
    subErrors: [
      {
        key: "no-internet",
        title: "Нет интернет-соединения",
        description: "Устройство не может подключиться к интернету",
        icon: Wifi,
        difficulty: "medium",
        steps: 7,
        popularity: 84,
      },
      {
        key: "slow-connection",
        title: "Медленное соединение",
        description: "Скорость интернета недостаточна для потока",
        icon: Signal,
        difficulty: "hard",
        steps: 9,
        popularity: 67,
      },
      {
        key: "wifi-issues",
        title: "Проблемы с WiFi",
        description: "Неполадки с беспроводным подключением",
        icon: Radio,
        difficulty: "medium",
        steps: 6,
        popularity: 59,
      },
      {
        key: "iptv-streaming",
        title: "IPTV потоки",
        description: "Проблемы с потоковым вещанием IPTV",
        icon: MonitorSpeaker,
        difficulty: "hard",
        steps: 10,
        popularity: 38,
      },
    ],
  },
  {
    key: "hardware",
    title: "Аппаратные проблемы",
    description: "Неисправности устройства, пульта и физических компонентов",
    icon: Settings,
    color: "from-purple-500 to-purple-600",
    priority: "medium",
    frequency: 42,
    avgResolveTime: "20-30 мин",
    subErrors: [
      {
        key: "remote-not-working",
        title: "Пульт не работает",
        description: "Пульт дистанционного управления не отвечает",
        icon: Settings,
        difficulty: "easy",
        steps: 3,
        popularity: 75,
      },
      {
        key: "overheating",
        title: "Перегрев устройства",
        description: "Устройство сильно нагревается при работе",
        icon: AlertTriangle,
        difficulty: "medium",
        steps: 5,
        popularity: 43,
      },
      {
        key: "power-issues",
        title: "Проблемы с питанием",
        description: "Устройство не включается или выключается",
        icon: Zap,
        difficulty: "medium",
        steps: 6,
        popularity: 52,
      },
      {
        key: "ports-not-working",
        title: "Неисправность портов",
        description: "USB или другие порты не функционируют",
        icon: Radio,
        difficulty: "hard",
        steps: 8,
        popularity: 29,
      },
    ],
  },
];

export default function ErrorSelectionPage() {
  const navigate = useNavigate();
  const { deviceId } = useParams();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("frequency");

  const handleSectionToggle = (key: string) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const handleErrorSelect = (errorKey: string, subKey?: string) => {
    if (subKey) {
      navigate(`/${deviceId}/error/${errorKey}/${subKey}`);
    } else {
      navigate(`/${deviceId}/error/${errorKey}`);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "hard":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const filteredErrors = errorCategories.filter((error) => {
    const matchesSearch = error.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "high" && error.priority === "high") ||
      (selectedFilter === "popular" && error.frequency > 70);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen tech-bg">
      {/* Header */}
      <motion.header
        className="relative z-10 backdrop-blur-md bg-black/30 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 interactive-element"
                onClick={() => navigate(`/device/${deviceId}`)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-xl text-white text-glow">
                    Диагностика <span className="text-orange-400">Проблем</span>
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">
                    Выберите тип проблемы для решения
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Устройство:{" "}
                <span className="text-white font-medium">{deviceId}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white interactive-element"
                onClick={() => navigate("/admin")}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Помощь
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search and Filters */}
      <motion.div
        className="container mx-auto px-6 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Поиск проблем и ошибок..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-black/20 border-white/20 text-white placeholder:text-gray-400 h-12"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Все категории</option>
                <option value="high">Критические</option>
                <option value="popular">Частые проблемы</option>
                <option value="recent">Недавние</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="frequency">По частоте</option>
                <option value="priority">По приоритету</option>
                <option value="resolve-time">По времени решения</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Error Categories Grid */}
      <motion.div
        className="container mx-auto px-6 pb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredErrors.map((error, index) => (
            <motion.div
              key={error.key}
              className="glass-card rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Category Header */}
              <div
                className={`p-6 bg-gradient-to-r ${error.color} relative overflow-hidden`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                      <error.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {error.title}
                      </h3>
                      <div className="flex items-center space-x-3 text-white/80 text-sm">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4" />
                          <span>{error.frequency}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{error.avgResolveTime}</span>
                        </div>
                        <div
                          className={`flex items-center space-x-1 ${getPriorityColor(
                            error.priority,
                          )}`}
                        >
                          <AlertTriangle className="h-4 w-4" />
                          <span className="capitalize">{error.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 interactive-element"
                    onClick={() => handleSectionToggle(error.key)}
                  >
                    {openSection === error.key ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <p className="text-white/80 mt-3 relative z-10">
                  {error.description}
                </p>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <error.icon className="w-full h-full" />
                </div>
              </div>

              {/* Sub-errors */}
              <AnimatePresence>
                {openSection === error.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-4">
                      {error.subErrors?.map((subError) => (
                        <motion.button
                          key={subError.key}
                          className="w-full p-4 rounded-xl bg-black/20 border border-white/10 text-left transition-all duration-300 hover:bg-black/30 hover:border-white/20 interactive-element group"
                          onClick={() =>
                            handleErrorSelect(error.key, subError.key)
                          }
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mt-1">
                                <subError.icon className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-medium mb-1">
                                  {subError.title}
                                </h4>
                                <p className="text-gray-400 text-sm mb-3">
                                  {subError.description}
                                </p>
                                <div className="flex items-center space-x-3">
                                  <Badge
                                    className={`text-xs px-2 py-1 border ${getDifficultyColor(
                                      subError.difficulty,
                                    )}`}
                                  >
                                    {subError.difficulty === "easy"
                                      ? "Легко"
                                      : subError.difficulty === "medium"
                                        ? "Средне"
                                        : "Сложно"}
                                  </Badge>
                                  <span className="text-gray-400 text-xs">
                                    {subError.steps} шагов
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <Users className="h-3 w-3 text-gray-400" />
                                    <span className="text-gray-400 text-xs">
                                      {subError.popularity}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors flex-shrink-0 mt-2" />
                          </div>
                        </motion.button>
                      ))}

                      {/* General category option */}
                      <motion.button
                        className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 text-white hover:border-white/40 transition-colors interactive-element"
                        onClick={() => handleErrorSelect(error.key)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="text-center">
                          <HelpCircle className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">
                            Другие проблемы категории "{error.title}"
                          </p>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredErrors.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Проблемы не найдены
              </h3>
              <p className="text-gray-400 mb-6">
                Попробуйте изменить параметры поиска или выберите другую
                категорию
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedFilter("all");
                }}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white interactive-element"
              >
                Сбросить фильтры
              </Button>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-8 inline-block">
            <h4 className="text-lg font-bold text-white mb-4">
              Не можете найти свою проблему?
            </h4>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white interactive-element"
                onClick={() => navigate("/admin")}
              >
                <Users className="mr-2 h-4 w-4" />
                Связаться с поддержкой
              </Button>
              <Button
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white interactive-element"
                onClick={() => navigate(`/device/${deviceId}`)}
              >
                <Tv className="mr-2 h-4 w-4" />
                Вернуться к устройству
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
