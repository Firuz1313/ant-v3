import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";

// Mock error data - in production, this would come from API
const errorCategories = [
  {
    key: "signal",
    title: "Signal Issues",
    description: "No signal, weak signal, or signal quality problems",
    icon: Signal,
    color: "from-red-500 to-red-600",
    count: 8,
    subErrors: [
      {
        key: "no-signal",
        title: "No Signal",
        description: "Complete signal loss on all channels",
        icon: AlertTriangle,
      },
      {
        key: "weak-signal",
        title: "Weak Signal",
        description: "Poor signal quality causing pixelation",
        icon: Signal,
      },
      {
        key: "intermittent",
        title: "Intermittent Signal",
        description: "Signal drops periodically",
        icon: Zap,
      },
    ],
  },
  {
    key: "channels",
    title: "Channel Problems",
    description: "Encrypted channels, missing channels, or tuning issues",
    icon: Tv,
    color: "from-orange-500 to-orange-600",
    count: 6,
    subErrors: [
      {
        key: "encrypted",
        title: "Encrypted Channels",
        description: "Channels showing scrambled content",
        icon: Shield,
      },
      {
        key: "missing",
        title: "Missing Channels",
        description: "Expected channels not found",
        icon: Tv,
      },
      {
        key: "poor-quality",
        title: "Poor Video Quality",
        description: "Channels displaying with poor quality",
        icon: MonitorSpeaker,
      },
    ],
  },
  {
    key: "network",
    title: "Network & Connection",
    description: "Internet connection, network setup, and streaming issues",
    icon: Wifi,
    color: "from-blue-500 to-blue-600",
    count: 5,
    subErrors: [
      {
        key: "no-internet",
        title: "No Internet Connection",
        description: "Device cannot connect to the internet",
        icon: Wifi,
      },
      {
        key: "slow-connection",
        title: "Slow Connection",
        description: "Internet connection is too slow for streaming",
        icon: Signal,
      },
      {
        key: "wifi-issues",
        title: "WiFi Problems",
        description: "Issues with wireless network connection",
        icon: Radio,
      },
    ],
  },
  {
    key: "hardware",
    title: "Hardware Issues",
    description: "Device hardware, remote control, and physical problems",
    icon: Settings,
    color: "from-purple-500 to-purple-600",
    count: 4,
    subErrors: [
      {
        key: "remote-not-working",
        title: "Remote Not Working",
        description: "Remote control is unresponsive",
        icon: Settings,
      },
      {
        key: "overheating",
        title: "Device Overheating",
        description: "Device gets too hot during operation",
        icon: AlertTriangle,
      },
      {
        key: "power-issues",
        title: "Power Problems",
        description: "Device won't turn on or randomly shuts off",
        icon: Zap,
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

  const filteredErrors = errorCategories.filter((error) =>
    error.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-xl text-white text-glow">
                    Error <span className="text-orange-400">Diagnostics</span>
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">
                    Select issue to troubleshoot
                  </div>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              Device: <span className="text-white font-medium">{deviceId}</span>
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search errors and issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/20 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-black/20 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="critical">Critical Issues</option>
                <option value="network">Network Related</option>
                <option value="hardware">Hardware Issues</option>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredErrors.map((error, index) => (
            <motion.div
              key={error.key}
              className="glass-card rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className={`p-6 bg-gradient-to-r ${error.color} relative overflow-hidden`}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <error.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {error.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {error.count} known issues
                      </p>
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
                <p className="text-white/70 mt-2 relative z-10">
                  {error.description}
                </p>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <error.icon className="w-full h-full" />
                </div>
              </div>

              <AnimatePresence>
                {openSection === error.key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 space-y-3">
                      {error.subErrors?.map((subError) => (
                        <motion.button
                          key={subError.key}
                          className="w-full p-4 rounded-lg bg-black/20 border border-white/10 text-left transition-all duration-300 hover:bg-black/30 hover:border-white/20 interactive-element group"
                          onClick={() =>
                            handleErrorSelect(error.key, subError.key)
                          }
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                              <subError.icon className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">
                                {subError.title}
                              </h4>
                              <p className="text-gray-400 text-sm">
                                {subError.description}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 ml-auto group-hover:text-white transition-colors" />
                          </div>
                        </motion.button>
                      ))}

                      <motion.button
                        className="w-full p-4 rounded-lg border-2 border-dashed border-white/20 text-white hover:border-white/40 transition-colors interactive-element"
                        onClick={() => handleErrorSelect(error.key)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-center">
                          <AlertTriangle className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-400">
                            Other {error.title.toLowerCase()} issues
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

        {/* Quick Actions */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-6 inline-block">
            <p className="text-gray-400 mb-4">Can't find your issue?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white interactive-element"
                onClick={() => navigate("/admin")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              <Button
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white interactive-element"
                onClick={() => navigate(`/device/${deviceId}`)}
              >
                <Tv className="mr-2 h-4 w-4" />
                Back to Device
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
