import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Filter,
  Tv,
  Monitor,
  Radio,
  Smartphone,
  Star,
  Users,
  Zap,
  Shield,
  Settings,
  CheckCircle,
} from "lucide-react";

const devices = [
  {
    id: "openbox",
    name: "OpenBox",
    model: "S9 HD PVR",
    description: "Классическая модель с базовым функционалом",
    icon: Tv,
    image: "/images/openbox.jpg", // placeholder
    color: "from-blue-500 to-blue-600",
    features: ["HD поддержка", "USB запись", "Ethernet"],
    users: "2.3M+",
    rating: 4.2,
    status: "Стабильная",
    supported: true,
  },
  {
    id: "openbox-gold",
    name: "OpenBox Gold",
    model: "A5 Plus 4K",
    description: "Премиум модель с расширенными возможностями",
    icon: Monitor,
    image: "/images/openbox-gold.jpg", // placeholder
    color: "from-amber-500 to-orange-600",
    features: ["4K поддержка", "Smart приложения", "WiFi встроенный"],
    users: "1.8M+",
    rating: 4.7,
    status: "Расширенная",
    price: "от 7,200 ₽",
    supported: true,
  },
  {
    id: "uclan",
    name: "Uclan",
    model: "Denys H.265",
    description: "Профессиональная приставка для IPTV",
    icon: Radio,
    image: "/images/uclan.jpg", // placeholder
    color: "from-purple-500 to-purple-600",
    features: ["Multi-тюнер", "IPTV", "Web интерфейс"],
    users: "1.2M+",
    rating: 4.5,
    status: "Профессиональная",
    price: "от 5,800 ₽",
    supported: true,
  },
  {
    id: "hdbox",
    name: "HDBox",
    model: "FS-9200 PVR",
    description: "Надёжная приставка с функцией записи",
    icon: Smartphone,
    image: "/images/hdbox.jpg", // placeholder
    color: "from-green-500 to-green-600",
    features: ["Twin тюнер", "USB 3.0", "CI+ слот"],
    users: "950K+",
    rating: 4.1,
    status: "Классическая",
    price: "от 4,100 ₽",
    supported: true,
  },
];

const categories = [
  { id: "all", name: "Все устройства", count: devices.length },
  {
    id: "supported",
    name: "Поддерживаемые",
    count: devices.filter((d) => d.supported).length,
  },
  { id: "popular", name: "Популярные", count: 3 },
  { id: "new", name: "Нови��ки", count: 1 },
];

export default function SelectDevicePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  const handleDeviceSelect = (deviceId: string) => {
    navigate(`/device/${deviceId}`);
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = device.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "supported" && device.supported) ||
      (selectedCategory === "popular" && device.rating >= 4.3) ||
      (selectedCategory === "new" && device.id === "openbox-gold");

    return matchesSearch && matchesCategory;
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
                className="text-white hover:bg-white/10 interactive-element ripple-effect"
                onClick={handleBackHome}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center glow-ring">
                  <Tv className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-xl text-white text-glow">
                    Выбор <span className="text-blue-400">Устройства</span>
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">
                    Поддерживаемые ТВ-приставки
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              {filteredDevices.length} из {devices.length} устройств
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search and Filters */}
      <motion.div
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="glass-card rounded-2xl p-6 mb-8 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Поиск по названию модели..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-black/20 border-white/20 text-white placeholder:text-gray-400 h-12 focus:border-blue-400 transition-colors"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">По популярности</option>
                <option value="rating">По рейтингу</option>
                <option value="name">По названию</option>
                <option value="price">По цене</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                className={`interactive-element ripple-effect ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white glow-ring"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Device Grid */}
      <motion.div
        className="container mx-auto px-6 pb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {filteredDevices.map((device, index) => (
            <motion.div
              key={device.id}
              className="device-card group interactive-element ripple-effect cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -8 }}
              onClick={() => handleDeviceSelect(device.id)}
            >
              {/* Device Image Placeholder */}
              <div
                className={`w-full h-48 rounded-xl bg-gradient-to-br ${device.color} relative overflow-hidden mb-6`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <device.icon className="h-20 w-20 text-white/80" />
                </div>
                <div className="absolute top-4 right-4">
                  {device.supported && (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">
                        {device.rating}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{device.users}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Info */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {device.name}
                    </h3>
                    <p className="text-sm text-gray-400">{device.model}</p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${device.color} text-white`}
                  >
                    {device.status}
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {device.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 gap-2 mb-6">
                  {device.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-white">
                      {device.price}
                    </p>
                    <p className="text-xs text-gray-400">Средняя цена</p>
                  </div>
                  <Button
                    className={`nav-button interactive-element ${
                      !device.supported ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!device.supported}
                  >
                    {device.supported ? (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Выбрать
                      </>
                    ) : (
                      <>
                        <Settings className="mr-2 h-4 w-4" />
                        Скоро
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDevices.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Устройства не найдены
              </h3>
              <p className="text-gray-400 mb-6">
                Попробуйте изменить параметры поиска или выберите другую
                категорию
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white interactive-element"
              >
                Сбросить фильтры
              </Button>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Не нашли своё устройство?
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Мы постоянно добавляем поддержку новых моделей. Свяжитесь с нашей
              службой поддержки, и мы поможем вам настроить диагностику для
              вашего устройства.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white interactive-element"
                onClick={() => navigate("/admin")}
              >
                <Users className="mr-2 h-4 w-4" />
                Связаться с поддержкой
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white interactive-element"
                onClick={handleBackHome}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Вернуться на главную
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
