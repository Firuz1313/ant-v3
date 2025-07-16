import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Settings,
  Tv,
  Wifi,
  Signal,
  Power,
  AlertTriangle,
} from "lucide-react";
import RemoteControl from "../components/RemoteControl";
import TVScreen from "../components/TVScreen";
import { useIsMobile } from "../hooks/use-mobile";
import NotFound from "./NotFound";

const devices = [
  {
    id: "openbox",
    name: "OpenBox",
    description: "Professional-grade receiver with advanced features",
    status: "Connected",
    signalStrength: 85,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "openbox-gold",
    name: "OpenBox Gold",
    description: "Premium model with enhanced performance",
    status: "Connected",
    signalStrength: 92,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "uclan",
    name: "Uclan",
    description: "Reliable and efficient digital receiver",
    status: "Connected",
    signalStrength: 78,
    color: "from-purple-500 to-purple-600",
  },
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
  const isMobile = useIsMobile();

  // Responsive TV dimensions
  let tvWidth = 850;
  let tvHeight = 430;
  if (typeof window !== "undefined") {
    if (isMobile) {
      tvWidth = Math.min(window.innerWidth * 0.95, 400);
      tvHeight = tvWidth * (430 / 850);
    } else {
      tvWidth = Math.min(800, window.innerWidth * 0.6);
      tvHeight = tvWidth * (430 / 850);
    }
  }

  useEffect(() => {
    if (panelBtnFromRemote) setLocalPanelBtn(panelBtnFromRemote);
  }, [panelBtnFromRemote]);

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

  if (!selectedDevice) return <NotFound />;

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
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <Tv className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-xl text-white text-glow">
                    ANT <span className="text-blue-400">V3</span>
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">
                    Device Control
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white interactive-element"
                onClick={handleErrorDiagnostics}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Diagnostics
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 interactive-element"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Device Status Card */}
      <motion.div
        className="container mx-auto px-6 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 text-glow">
                {selectedDevice.name}
              </h2>
              <p className="text-gray-400 mb-3">{selectedDevice.description}</p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">
                  {selectedDevice.status}
                </span>
              </div>
            </div>

            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <Wifi className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Network</div>
                <div className="text-white font-bold">Connected</div>
              </div>
              <div className="text-center">
                <Signal className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Signal</div>
                <div className="text-white font-bold">
                  {selectedDevice.signalStrength}%
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${selectedDevice.color} text-white font-medium shadow-lg`}
              >
                {selectedDevice.name} Active
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Control Interface */}
      <motion.div
        className="container mx-auto px-6 pb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div
          className={`grid gap-8 max-w-7xl mx-auto ${
            isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
          } items-start`}
        >
          {/* TV Screen */}
          <motion.div
            className="glass-card rounded-2xl p-4 order-1"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="tv-screen">
              <TVScreen
                panelBtnFromRemote={localPanelBtn}
                width={tvWidth}
                height={tvHeight}
                deviceId={selectedDevice.id}
              />
            </div>
          </motion.div>

          {/* Remote Control */}
          {!isMobile && (
            <motion.div
              className="glass-card rounded-2xl p-6 order-2 lg:order-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">
                  Virtual Remote
                </h3>
                <p className="text-gray-400">
                  Use the virtual remote to control your device
                </p>
              </div>
              <div className="flex justify-center">
                <RemoteControl onButtonClick={handleRemoteButton} />
              </div>
            </motion.div>
          )}
        </div>

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
              className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 shadow-2xl interactive-element"
              onClick={() => {
                // Open mobile remote modal or navigate to remote page
              }}
            >
              <Power className="h-8 w-8" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
