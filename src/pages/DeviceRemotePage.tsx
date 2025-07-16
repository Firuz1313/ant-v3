import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Settings,
  Tv,
  Wifi,
  Signal,
  Power,
  AlertTriangle,
  Monitor,
  Volume2,
  Home,
  Search,
  Menu,
  Info,
  PlayCircle,
  MoreHorizontal,
} from "lucide-react";
import RemoteControl from "../components/RemoteControl";
import TVScreen from "../components/TVScreen";
import { useIsMobile } from "../hooks/use-mobile";
import NotFound from "./NotFound";

const devices = [
  {
    id: "openbox",
    name: "OpenBox",
    model: "S9 HD PVR",
    description: "Классическая модель с базовым функционалом",
    status: "Подключено",
    signalStrength: 85,
    temperature: 42,
    uptime: "2д 14ч",
    color: "from-blue-500 to-blue-600",
    firmware: "v2.1.45",
    channels: 147,
  },
  {
    id: "openbox-gold",
    name: "OpenBox Gold",
    model: "A5 Plus 4K",
    description: "Премиум модель с расширенными возможностями",
    status: "Подключено",
    signalStrength: 92,
    temperature: 38,
    uptime: "5д 8ч",
    color: "from-amber-500 to-orange-600",
    firmware: "v3.2.18",
    channels: 203,
  },
  {
    id: "uclan",
    name: "Uclan",
    model: "Denys H.265",
    description: "Профессиональная приставка для IPTV",
    status: "Подключено",
    signalStrength: 78,
    temperature: 44,
    uptime: "1д 3ч",
    color: "from-purple-500 to-purple-600",
    firmware: "v4.1.7",
    channels: 312,
  },
];

const quickActions = [
  { id: "channels", label: "Каналы", icon: Tv },
  { id: "settings", label: "Настройки", icon: Settings },
  { id: "search", label: "Поиск", icon: Search },
  { id: "info", label: "Информация", icon: Info },
];

interface DeviceRemotePageProps {
  panelBtnFromRemote?: number | null;
  onRemoteButton?: (key: string) => void;
}

export default function DeviceRemotePage({
  panelBtnFromRemote,
  onRemoteButton,
}: DeviceRemotePageProps) {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const selectedDevice = devices.find((d) => d.id === deviceId);
  const [localPanelBtn, setLocalPanelBtn] = useState<number | null>(null);
  const [isRemoteVisible, setIsRemoteVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();

  // Responsive TV dimensions
  let tvWidth = 900;
  let tvHeight = 500;
  if (typeof window !== "undefined") {
    if (isMobile) {
      tvWidth = Math.min(window.innerWidth * 0.95, 400);
      tvHeight = tvWidth * (9 / 16);
    } else {
      tvWidth = Math.min(900, window.innerWidth * 0.55);
      tvHeight = tvWidth * (9 / 16);
    }
  }

  useEffect(() => {
    if (panelBtnFromRemote) setLocalPanelBtn(panelBtnFromRemote);
  }, [panelBtnFromRemote]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Listen for virtual remote OK events
  useEffect(() => {
    function onOk() {
      // Handle OK button from virtual remote
    }
    window.addEventListener("virtual-remote-ok", onOk);
    return () => window.removeEventListener("virtual-remote-ok", onOk);
  }, []);

  function handleRemoteButton(key: string) {
    if (onRemoteButton) onRemoteButton(key);
  }

  function handleErrorDiagnostics() {
    navigate(`/${deviceId}/error-select`);
  }

  const getSignalColor = (strength: number) => {
    if (strength >= 80) return "text-green-400";
    if (strength >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 40) return "text-green-400";
    if (temp <= 50) return "text-yellow-400";
    return "text-red-400";
  };

  if (!selectedDevice) return <NotFound />;

  return (
    <div className="min-h-screen tech-bg">
      {/* Minimalist Header */}
      <motion.header
        className="relative z-20 backdrop-blur-sm bg-black/40 border-b border-white/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 interactive-element"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${selectedDevice.color} rounded-lg flex items-center justify-center`}
                >
                  <Tv className="h-4 w-4 text-white" />
                </div>
                <div>
                  <span className="font-medium text-white">
                    {selectedDevice.name}
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">
                    {selectedDevice.model}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Time */}
              <div className="text-sm text-gray-400">
                {currentTime.toLocaleTimeString("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              {/* Quick Status */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Signal
                    className={`h-4 w-4 ${getSignalColor(
                      selectedDevice.signalStrength,
                    )}`}
                  />
                  <span
                    className={`text-xs ${getSignalColor(
                      selectedDevice.signalStrength,
                    )}`}
                  >
                    {selectedDevice.signalStrength}%
                  </span>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-orange-400 hover:bg-orange-400/10 interactive-element"
                  onClick={handleErrorDiagnostics}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Диагностика
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 interactive-element"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Interface */}
      <div className="relative">
        {/* TV Screen Section */}
        <motion.div
          className="container mx-auto px-6 py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Device Status Bar */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            <div className="flex-1">
              <div className="glass rounded-xl p-4">
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Каналы</div>
                    <div className="text-lg font-bold text-white">
                      {selectedDevice.channels}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Сигнал</div>
                    <div
                      className={`text-lg font-bold ${getSignalColor(
                        selectedDevice.signalStrength,
                      )}`}
                    >
                      {selectedDevice.signalStrength}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">
                      Температура
                    </div>
                    <div
                      className={`text-lg font-bold ${getTemperatureColor(
                        selectedDevice.temperature,
                      )}`}
                    >
                      {selectedDevice.temperature}°C
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">
                      Время работы
                    </div>
                    <div className="text-lg font-bold text-blue-400">
                      {selectedDevice.uptime}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Прошивка</div>
                    <div className="text-lg font-bold text-white">
                      {selectedDevice.firmware}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Статус</div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Активно
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TV Screen and Controls Layout */}
          <div
            className={`grid gap-8 ${
              isMobile ? "grid-cols-1" : "grid-cols-1 xl:grid-cols-12"
            } items-start`}
          >
            {/* TV Screen */}
            <motion.div
              className={`${isMobile ? "order-1" : "xl:col-span-8 order-1"}`}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="glass rounded-2xl p-6 mb-4">
                <div className="tv-screen">
                  <TVScreen
                    panelBtnFromRemote={localPanelBtn}
                    width={tvWidth}
                    height={tvHeight}
                    deviceId={selectedDevice.id}
                  />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className="h-16 flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white hover:bg-white/10 interactive-element"
                  >
                    <action.icon className="h-5 w-5" />
                    <span className="text-xs">{action.label}</span>
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Remote Control Panel */}
            {!isMobile && (
              <motion.div
                className="xl:col-span-4 order-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="glass rounded-2xl p-6 sticky top-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-white mb-2">
                      Виртуальный пульт
                    </h3>
                    <p className="text-sm text-gray-400">
                      Управление {selectedDevice.name}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="scale-90 origin-center">
                      <RemoteControl onButtonClick={handleRemoteButton} />
                    </div>
                  </div>

                  {/* Remote Status */}
                  <div className="mt-6 p-4 rounded-lg bg-black/20 border border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Состояние пульта:</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-400">Подключен</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Mobile Remote Control Button */}
        {isMobile && (
          <motion.div
            className="fixed bottom-6 right-6 z-20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <Button
              size="lg"
              className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl interactive-element"
              onClick={() => setIsRemoteVisible(!isRemoteVisible)}
            >
              <Power className="h-8 w-8" />
            </Button>
          </motion.div>
        )}

        {/* Mobile Remote Modal */}
        {isMobile && isRemoteVisible && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsRemoteVisible(false)}
          >
            <motion.div
              className="glass-card rounded-2xl p-6 max-w-sm w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  Виртуальный пульт
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRemoteVisible(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Закрыть
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="scale-75 origin-center">
                  <RemoteControl onButtonClick={handleRemoteButton} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Side Status Panel (Desktop only) */}
        {!isMobile && (
          <motion.div
            className="fixed left-6 top-1/2 transform -translate-y-1/2 z-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="glass rounded-xl p-4 w-16 flex flex-col items-center space-y-4">
              <div className="text-center">
                <Home className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                <div className="text-xs text-gray-400">Главная</div>
              </div>
              <div className="text-center">
                <Volume2 className="h-6 w-6 text-white mx-auto mb-1" />
                <div className="text-xs text-gray-400">Звук</div>
              </div>
              <div className="text-center">
                <PlayCircle className="h-6 w-6 text-green-400 mx-auto mb-1" />
                <div className="text-xs text-gray-400">Запись</div>
              </div>
              <div className="text-center">
                <Monitor className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                <div className="text-xs text-gray-400">Экран</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
