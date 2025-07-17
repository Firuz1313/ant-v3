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
  Headphones,
  History,
  Video,
} from "lucide-react";
import RemoteControl from "@/components/RemoteControl";
import OpenboxRemoteControl from "@/components/OpenboxRemoteControl";
import TVScreen from "@/components/TVScreen";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb } from "@/components/Breadcrumb";
import NotFound from "@/pages/NotFound";
import { SmartRender } from "@/hooks/useSmartRender";
import { useThrottle } from "@/hooks/useSmartRender";

const devices = [
  {
    id: "openbox",
    name: "OpenBox",
    model: "S9 HD PVR",
    description: "Классическая модель с базовым функционалом",
    status: "Подключено",
    signalStrength: 85,
    uptime: "2д 14ч",
    color: "from-blue-500 to-blue-600",
    firmware: "v2.1.45",
    channels: 182,
  },
  {
    id: "openbox-gold",
    name: "OpenBox Gold",
    model: "A5 Plus 4K",
    description: "Премиум модель с расширенными возможностями",
    status: "Подключено",
    signalStrength: 92,
    uptime: "5д 8ч",
    color: "from-amber-500 to-orange-600",
    firmware: "v3.2.18",
    channels: 182,
  },
  {
    id: "uclan",
    name: "Uclan",
    model: "Denys H.265",
    description: "Профессиональная приставка для IPTV",
    status: "Подключено",
    signalStrength: 78,
    uptime: "1д 3ч",
    color: "from-purple-500 to-purple-600",
    firmware: "v4.1.7",
    channels: 182,
  },
  {
    id: "hdbox",
    name: "HDBox",
    model: "FS-9200 PVR",
    description: "Надёжная приставка с функцией записи",
    status: "Подключено",
    signalStrength: 72,
    uptime: "3д 12ч",
    color: "from-green-500 to-green-600",
    firmware: "v1.8.22",
    channels: 182,
  },
];

const quickActions = [
  { id: "channels", label: "Каналы", icon: Tv },
  { id: "settings", label: "Настройки", icon: Settings },
  { id: "search", label: "Поиск", icon: Search },
  { id: "info", label: "Ин��ормация", icon: Info },
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

  // Perfect reference proportions - massive TV, tiny remote
  let tvWidth = 1700;
  let tvHeight = 950;
  let remoteWidth = 50;
  let remoteHeight = 220;

  if (typeof window !== "undefined") {
    if (isMobile) {
      tvWidth = Math.min(window.innerWidth * 0.9, 350);
      tvHeight = tvWidth * (9 / 16);
      remoteWidth = 45;
      remoteHeight = Math.min(window.innerHeight * 0.5, 120);
    } else {
      // TV dominates entire screen like in reference
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      tvWidth = Math.min(1700, screenWidth * 0.96);
      tvHeight = Math.min(950, screenHeight * 0.7);
      remoteWidth = Math.max(50, screenWidth * 0.03); // Tiny but visible
      remoteHeight = Math.min(220, screenHeight * 0.25);
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

  if (!selectedDevice) return <NotFound />;

  return (
    <div className="min-h-screen tech-bg">
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pt-4">
        <Breadcrumb />
      </div>

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
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
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

          {/* TV Screen and Controls Layout - Horizontal alignment with equal heights */}
          <div
            className={`flex gap-6 ${
              isMobile ? "flex-col" : "flex-row items-start"
            }`}
          >
            {/* TV Screen - Covers nearly entire screen like reference */}
            <motion.div
              className={`${isMobile ? "order-1 w-full" : "flex-1 w-[98%] order-1"} perf-critical`}
              whileHover={{ scale: 1.001 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <div className="glass rounded-2xl p-6 mb-4 contain-content">
                <div className="tv-screen layer-promote">
                  <SmartRender>
                    <TVScreen
                      panelBtnFromRemote={localPanelBtn}
                      width={tvWidth}
                      height={tvHeight}
                      deviceId={selectedDevice.id}
                    />
                  </SmartRender>
                </div>
              </div>

              {/* Quick Actions removed - control integrated into TV interface */}
            </motion.div>

            {/* Remote Control Panel - Tiny sliver like reference */}
            {!isMobile && (
              <motion.div
                className="w-[2%] min-w-[60px] order-2 flex-shrink-0 perf-isolate"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div
                  className="bg-transparent p-1 sticky top-6 flex justify-center"
                  style={{ height: `${remoteHeight}px` }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-white mb-2">
                      Виртуальный пульт
                    </h3>
                    <p className="text-sm text-gray-400">
                      Управление {selectedDevice.name}
                    </p>
                  </div>

                  <div className="flex justify-center h-full">
                    <div className="w-full h-full flex justify-center items-center">
                      {selectedDevice.id === "openbox" ? (
                        <OpenboxRemoteControl
                          onButtonClick={handleRemoteButton}
                          width={remoteWidth}
                          height={remoteHeight}
                        />
                      ) : (
                        <RemoteControl
                          onButtonClick={handleRemoteButton}
                          width={remoteWidth}
                          height={remoteHeight}
                        />
                      )}
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
                  {selectedDevice.id === "openbox" ? (
                    <OpenboxRemoteControl onButtonClick={handleRemoteButton} />
                  ) : (
                    <RemoteControl onButtonClick={handleRemoteButton} />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Quick Navigation Panel (Desktop only) */}
        {!isMobile && (
          <motion.div
            className="fixed right-6 bottom-6 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="bg-background/95 backdrop-blur-md border border-border rounded-xl p-3 w-14 flex flex-col items-center space-y-3 shadow-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-primary/10"
                onClick={() => navigate("/")}
              >
                <Home className="h-5 w-5 text-primary" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-primary/10"
                onClick={() => navigate(`/${deviceId}/error-select`)}
              >
                <Headphones className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-primary/10"
                onClick={() => navigate("/select-device")}
              >
                <History className="h-5 w-5 text-muted-foreground" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 hover:bg-primary/10"
                onClick={() => window.location.reload()}
              >
                <Video className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
