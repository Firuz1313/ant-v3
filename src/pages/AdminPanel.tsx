import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Shield,
  Users,
  Settings,
  Database,
  AlertTriangle,
  Tv,
  Plus,
  Edit,
  Trash2,
  Eye,
  Lock,
} from "lucide-react";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("devices");

  const handleLogin = () => {
    // Simple password check - in production, use proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      // Show error
      alert("Invalid password");
    }
  };

  const stats = [
    { label: "Total Devices", value: "4", icon: Tv, color: "blue" },
    {
      label: "Active Errors",
      value: "23",
      icon: AlertTriangle,
      color: "orange",
    },
    { label: "User Sessions", value: "1.2k", icon: Users, color: "green" },
    { label: "System Health", value: "98%", icon: Shield, color: "purple" },
  ];

  const devices = [
    { id: "openbox", name: "OpenBox", status: "Active", errors: 8 },
    { id: "openbox-gold", name: "OpenBox Gold", status: "Active", errors: 6 },
    { id: "uclan", name: "Uclan", status: "Active", errors: 5 },
    { id: "hdbox", name: "HDBox", status: "Inactive", errors: 4 },
  ];

  const errors = [
    {
      id: 1,
      title: "No Signal",
      device: "All",
      priority: "High",
      status: "Active",
    },
    {
      id: 2,
      title: "Encrypted Channels",
      device: "OpenBox",
      priority: "Medium",
      status: "Active",
    },
    {
      id: 3,
      title: "Network Error",
      device: "OpenBox Gold",
      priority: "High",
      status: "Active",
    },
    {
      id: 4,
      title: "Card Error",
      device: "Uclan",
      priority: "Low",
      status: "Inactive",
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen tech-bg flex items-center justify-center">
        <motion.div
          className="glass-card rounded-2xl p-8 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-gray-400">Enter password to continue</p>
          </div>

          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/20 border-white/20 text-white placeholder:text-gray-400"
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button
              onClick={handleLogin}
              className="w-full nav-button interactive-element"
            >
              <Shield className="mr-2 h-4 w-4" />
              Access Admin Panel
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="w-full text-gray-400 hover:text-white interactive-element"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-400 text-center">
              <strong>Demo:</strong> Use password "admin123"
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

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
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-xl text-white text-glow">
                    Admin <span className="text-red-400">Panel</span>
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">
                    System Management
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white interactive-element"
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Stats Cards */}
      <motion.div
        className="container mx-auto px-6 py-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
            >
              <Card className="glass-card border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center`}
                    >
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6">
        <div className="flex space-x-1 mb-6">
          {[
            { id: "devices", label: "Devices", icon: Tv },
            { id: "errors", label: "Errors", icon: AlertTriangle },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`interactive-element ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "devices" && (
            <Card className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Device Management
                  </CardTitle>
                  <Button size="sm" className="nav-button interactive-element">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Device
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/10"
                    >
                      <div>
                        <h4 className="text-white font-medium">
                          {device.name}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {device.errors} errors configured
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            device.status === "Active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {device.status}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="interactive-element"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="interactive-element"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "errors" && (
            <Card className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Error Management</CardTitle>
                  <Button size="sm" className="nav-button interactive-element">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Error
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errors.map((error) => (
                    <div
                      key={error.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/10"
                    >
                      <div>
                        <h4 className="text-white font-medium">
                          {error.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Device: {error.device}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            error.priority === "High"
                              ? "bg-red-500/20 text-red-400"
                              : error.priority === "Medium"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {error.priority}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="interactive-element"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="interactive-element"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "settings" && (
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="text-white">System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Appearance</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Customize the interface appearance
                    </p>
                    <Button variant="outline" className="interactive-element">
                      Configure Theme
                    </Button>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">
                      Cursor Effects
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Manage custom cursor settings
                    </p>
                    <Button variant="outline" className="interactive-element">
                      Cursor Settings
                    </Button>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">
                      External Imports
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Configure external project integrations
                    </p>
                    <Button variant="outline" className="interactive-element">
                      Manage Imports
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
