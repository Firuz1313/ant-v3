import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Tv,
  Settings,
  Monitor,
  Zap,
  ArrowRight,
  Play,
  Shield,
  Sparkles,
  Radio,
  Layers,
} from "lucide-react";

const devices = [
  {
    id: "openbox",
    name: "OpenBox",
    description: "Classic digital receiver",
    status: "Stable",
    users: "2.3M+",
    color: "from-blue-500 to-blue-600",
    icon: Tv,
    features: ["HD Support", "USB Recording", "Network Access"],
  },
  {
    id: "openbox-gold",
    name: "OpenBox Gold",
    description: "Premium receiver with advanced features",
    status: "Enhanced",
    users: "1.8M+",
    color: "from-amber-500 to-orange-600",
    icon: Monitor,
    features: ["4K Support", "Smart Apps", "WiFi Built-in"],
  },
  {
    id: "uclan",
    name: "Uclan",
    description: "Professional grade receiver",
    status: "Pro",
    users: "1.2M+",
    color: "from-purple-500 to-purple-600",
    icon: Radio,
    features: ["Multi-Tuner", "IPTV", "Web Interface"],
  },
];

const features = [
  {
    icon: Layers,
    title: "Virtual Interface",
    description: "Realistic TV interface simulation",
    accent: "blue",
  },
  {
    icon: Shield,
    title: "Error Diagnostics",
    description: "Step-by-step troubleshooting",
    accent: "purple",
  },
  {
    icon: Sparkles,
    title: "Admin Panel",
    description: "Full control and customization",
    accent: "emerald",
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handleDeviceSelect = (deviceId: string) => {
    navigate(`/device/${deviceId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen tech-bg relative overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-10 backdrop-blur-md bg-black/20 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Tv className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-2xl text-white text-glow">
                  ANT <span className="text-blue-400">V3</span>
                </span>
                <div className="text-xs text-gray-400 -mt-1 font-medium">
                  Virtual OpenBox Experience
                </div>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 interactive-element"
                onClick={() => navigate("/admin")}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 pt-8">
        {/* Hero Section */}
        <motion.section
          className="container mx-auto px-6 py-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-8 text-glow"
            variants={itemVariants}
          >
            Choose Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 animate-gradient-shift">
              Device
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Experience the most realistic virtual TV interface simulation.
            Select your device and dive into an immersive troubleshooting
            environment.
          </motion.p>

          {/* Device Selection Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
            variants={containerVariants}
          >
            {devices.map((device, index) => (
              <motion.div
                key={device.id}
                className="device-card group interactive-element"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { type: "spring", stiffness: 300 },
                }}
                onClick={() => handleDeviceSelect(device.id)}
              >
                <div className="relative z-10">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${device.color} flex items-center justify-center mb-6 mx-auto shadow-2xl group-hover:scale-110 transition-all duration-500`}
                  >
                    <device.icon className="h-10 w-10 text-white" />
                  </div>

                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2 text-glow">
                      {device.name}
                    </h3>
                    <p className="text-gray-400 text-lg mb-3">
                      {device.description}
                    </p>
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${device.color} text-white`}
                      >
                        {device.status}
                      </span>
                      <span className="text-blue-400 font-bold">
                        {device.users}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {device.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center justify-center text-gray-300"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full nav-button interactive-element"
                    size="lg"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Launch Interface
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-card rounded-xl p-6 text-center group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br from-${feature.accent}-500 to-${feature.accent}-600 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-all duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Bottom CTA */}
        <motion.section
          className="container mx-auto px-6 pb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="glass-card rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-tech-pulse" />
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Admin Access?
            </h3>
            <p className="text-gray-400 mb-6">
              Manage devices, configure errors, and customize the experience
            </p>
            <Button
              variant="outline"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white interactive-element"
              onClick={() => navigate("/admin")}
            >
              <Shield className="mr-2 h-4 w-4" />
              Admin Panel
            </Button>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
