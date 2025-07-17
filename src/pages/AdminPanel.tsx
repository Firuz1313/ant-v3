import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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
  Save,
  X,
  CheckCircle,
  Clock,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

interface Device {
  id: string;
  name: string;
  model?: string;
  description: string;
  supported: boolean;
  users?: string;
  rating?: number;
  status: string;
  channels?: number;
}

interface ErrorItem {
  key: string;
  title: string;
  category: string;
  priority: string;
  frequency: number;
  difficulty: string;
  isActive: boolean;
}

interface SystemStats {
  totalDevices: number;
  activeErrors: number;
  userSessions: string;
  systemHealth: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Data states
  const [devices, setDevices] = useState<Device[]>([]);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [stats, setStats] = useState<SystemStats>({
    totalDevices: 0,
    activeErrors: 0,
    userSessions: "0",
    systemHealth: "0%",
  });

  // Modal states
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);
  const [editingError, setEditingError] = useState<ErrorItem | null>(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Form states
  const [deviceForm, setDeviceForm] = useState({
    name: "",
    model: "",
    description: "",
    supported: true,
  });

  const [errorForm, setErrorForm] = useState({
    title: "",
    category: "signal",
    priority: "medium",
    difficulty: "medium",
    description: "",
  });

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem("ant-admin-token");
    if (token) {
      setIsAuthenticated(true);
      loadDashboardData();
    }
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (password === "admin123") {
        const fakeToken = "fake-jwt-token-" + Date.now();
        localStorage.setItem("ant-admin-token", fakeToken);
        setIsAuthenticated(true);
        loadDashboardData();
        toast({
          title: "Вход выполнен",
          description: "Добро пожаловать в админ-панель ANT-V3",
        });
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный пароль",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при входе",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ant-admin-token");
    setIsAuthenticated(false);
    setPassword("");
    toast({
      title: "Выход выполнен",
      description: "До свидания!",
    });
  };

  const loadDashboardData = async () => {
    try {
      // Simulate loading data
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data
      setStats({
        totalDevices: 4,
        activeErrors: 23,
        userSessions: "1.2k",
        systemHealth: "98%",
      });

      setDevices([
        {
          id: "openbox",
          name: "OpenBox",
          model: "S9 HD PVR",
          description: "Классическая модель с базовым функционалом",
          supported: true,
          users: "2.3M+",
          rating: 4.2,
          status: "Активна",
          channels: 147,
        },
        {
          id: "openbox-gold",
          name: "OpenBox Gold",
          model: "A5 Plus 4K",
          description: "Премиум модель с расширенными возможностями",
          supported: true,
          users: "1.8M+",
          rating: 4.7,
          status: "Активна",
          channels: 203,
        },
        {
          id: "uclan",
          name: "Uclan",
          model: "Denys H.265",
          description: "Профессиональная приставка для IPTV",
          supported: true,
          users: "1.2M+",
          rating: 4.5,
          status: "Активна",
          channels: 312,
        },
      ]);

      setErrors([
        {
          key: "no-signal",
          title: "Нет сигнала",
          category: "signal",
          priority: "critical",
          frequency: 89,
          difficulty: "easy",
          isActive: true,
        },
        {
          key: "encrypted",
          title: "Кодированные каналы",
          category: "channels",
          priority: "medium",
          frequency: 76,
          difficulty: "medium",
          isActive: true,
        },
        {
          key: "no-internet",
          title: "Нет интернета",
          category: "network",
          priority: "high",
          frequency: 65,
          difficulty: "medium",
          isActive: true,
        },
      ]);
    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить данные",
        variant: "destructive",
      });
    }
  };

  const handleSaveDevice = async () => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingDevice) {
        // Update existing device
        setDevices((prev) =>
          prev.map((device) =>
            device.id === editingDevice.id
              ? { ...device, ...deviceForm }
              : device,
          ),
        );
        toast({
          title: "Устройство обновлено",
          description: `${deviceForm.name} успешно обновлено`,
        });
      } else {
        // Create new device
        const newDevice: Device = {
          id: deviceForm.name.toLowerCase().replace(/\s+/g, "-"),
          ...deviceForm,
          status: "Активна",
        };
        setDevices((prev) => [...prev, newDevice]);
        toast({
          title: "Устройство создано",
          description: `${deviceForm.name} успешно добавлено`,
        });
      }

      setShowDeviceModal(false);
      setEditingDevice(null);
      setDeviceForm({ name: "", model: "", description: "", supported: true });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить устройство",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDevice = async (deviceId: string) => {
    try {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      setDevices((prev) => prev.filter((device) => device.id !== deviceId));
      toast({
        title: "Устройство удалено",
        description: "Устройство успешно удалено из системы",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить устройство",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "hard":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

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
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 mx-auto glow-ring ripple-effect">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 text-glow">
              Администрирование
            </h2>
            <p className="text-gray-400">Введите пароль для продолжения</p>
          </div>

          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Пароль администратора"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/20 border-white/20 text-white placeholder:text-gray-400"
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              disabled={isLoading}
            />
            <Button
              onClick={handleLogin}
              className="w-full nav-button interactive-element ripple-effect glow-ring"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Вход...
                </div>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Войти в панель
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="w-full text-gray-400 hover:text-white interactive-element"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться на главную
            </Button>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-400 text-center">
              <strong>Демо:</strong> Используйте пароль "admin123"
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
                    Админ <span className="text-red-400">Панель</span>
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">
                    Управление системой ANT-V3
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Администратор: <span className="text-white">admin</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white interactive-element"
                onClick={handleLogout}
              >
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 pt-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "dashboard", label: "Панель управления", icon: BarChart3 },
            { id: "devices", label: "Устройства", icon: Tv },
            { id: "errors", label: "Ошибки", icon: AlertTriangle },
            { id: "settings", label: "Настройки", icon: Settings },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`interactive-element ripple-effect ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white glow-ring"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pb-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    label: "Всего устройств",
                    value: stats.totalDevices,
                    icon: Tv,
                    color: "blue",
                    change: "+2",
                  },
                  {
                    label: "Активных ошибок",
                    value: stats.activeErrors,
                    icon: AlertTriangle,
                    color: "orange",
                    change: "-5",
                  },
                  {
                    label: "Пользователей онлайн",
                    value: stats.userSessions,
                    icon: Users,
                    color: "green",
                    change: "+12%",
                  },
                  {
                    label: "Состояние системы",
                    value: stats.systemHealth,
                    icon: Activity,
                    color: "purple",
                    change: "+1%",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <Card className="glass-card border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm mb-1">
                              {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-white">
                              {stat.value}
                            </p>
                            <div className="flex items-center mt-2">
                              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                              <span className="text-xs text-green-400">
                                {stat.change}
                              </span>
                            </div>
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

              {/* Recent Activity */}
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Последняя активность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "Создано устройство OpenBox Gold",
                        time: "2 минуты назад",
                        type: "create",
                      },
                      {
                        action: "Обновлена ошибка 'Нет сигнала'",
                        time: "15 минут назад",
                        type: "update",
                      },
                      {
                        action: "Пользователь admin выполнил вход",
                        time: "1 час назад",
                        type: "auth",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/10"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full" />
                          <span className="text-white">{activity.action}</span>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "devices" && (
            <Card className="glass-card border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Управление устройствами
                  </CardTitle>
                  <Button
                    onClick={() => {
                      setEditingDevice(null);
                      setDeviceForm({
                        name: "",
                        model: "",
                        description: "",
                        supported: true,
                      });
                      setShowDeviceModal(true);
                    }}
                    className="nav-button interactive-element"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Добавить устройство
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
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-white font-medium">
                            {device.name}
                          </h4>
                          {device.model && (
                            <span className="text-gray-400 text-sm">
                              {device.model}
                            </span>
                          )}
                          <Badge
                            className={`${
                              device.supported
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }`}
                          >
                            {device.supported
                              ? "Поддерживается"
                              : "Не поддерживается"}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">
                          {device.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          {device.users && (
                            <span>Пользователи: {device.users}</span>
                          )}
                          {device.channels && (
                            <span>Каналы: {device.channels}</span>
                          )}
                          <span>Статус: {device.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="interactive-element text-blue-400 hover:text-white hover:bg-blue-400/20"
                          onClick={() => {
                            setEditingDevice(device);
                            setDeviceForm({
                              name: device.name,
                              model: device.model || "",
                              description: device.description,
                              supported: device.supported,
                            });
                            setShowDeviceModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="interactive-element text-red-400 hover:text-white hover:bg-red-400/20"
                          onClick={() => handleDeleteDevice(device.id)}
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
                  <CardTitle className="text-white">
                    Управление ошибками
                  </CardTitle>
                  <Button className="nav-button interactive-element">
                    <Plus className="mr-2 h-4 w-4" />
                    Добавить ошибку
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {errors.map((error) => (
                    <div
                      key={error.key}
                      className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-white/10"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-white font-medium">
                            {error.title}
                          </h4>
                          <Badge className={getPriorityColor(error.priority)}>
                            {error.priority}
                          </Badge>
                          <Badge
                            className={getDifficultyColor(error.difficulty)}
                          >
                            {error.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>Категория: {error.category}</span>
                          <span>Частота: {error.frequency}%</span>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3" />
                            <span>
                              {error.isActive ? "Активна" : "Неактивна"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="interactive-element text-blue-400 hover:text-white hover:bg-blue-400/20"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="interactive-element text-green-400 hover:text-white hover:bg-green-400/20"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">
                    Системные настройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Внешний вид</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Настройка темы интерфейса
                    </p>
                    <Button
                      variant="outline"
                      className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white interactive-element"
                    >
                      Настроить тему
                    </Button>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">
                      Эффекты курсора
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Управление кастомными эффектами курсора
                    </p>
                    <Button
                      variant="outline"
                      className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white interactive-element"
                    >
                      Настройки курсора
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Интеграции</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">
                      Внешние проекты
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Настройка интеграции с внешними репозиториями
                    </p>
                    <Button
                      variant="outline"
                      className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white interactive-element"
                    >
                      Управление импортами
                    </Button>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2">База данных</h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Операции с базой данных
                    </p>
                    <Button
                      variant="outline"
                      className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white interactive-element"
                    >
                      <Database className="mr-2 h-4 w-4" />
                      Настройки БД
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>

      {/* Device Modal */}
      {showDeviceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div
            className="glass-card rounded-2xl p-6 w-full max-w-md"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingDevice
                  ? "Редактировать устройство"
                  : "Добавить устройство"}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDeviceModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Название
                </label>
                <Input
                  value={deviceForm.name}
                  onChange={(e) =>
                    setDeviceForm({ ...deviceForm, name: e.target.value })
                  }
                  className="bg-black/20 border-white/20 text-white"
                  placeholder="Например: OpenBox Gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Модель
                </label>
                <Input
                  value={deviceForm.model}
                  onChange={(e) =>
                    setDeviceForm({ ...deviceForm, model: e.target.value })
                  }
                  className="bg-black/20 border-white/20 text-white"
                  placeholder="Например: A5 Plus 4K"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Описание
                </label>
                <textarea
                  value={deviceForm.description}
                  onChange={(e) =>
                    setDeviceForm({
                      ...deviceForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-black/20 border border-white/20 rounded-lg text-white placeholder:text-gray-400 resize-none"
                  rows={3}
                  placeholder="Краткое описание устройства"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="supported"
                  checked={deviceForm.supported}
                  onChange={(e) =>
                    setDeviceForm({
                      ...deviceForm,
                      supported: e.target.checked,
                    })
                  }
                  className="rounded border-white/20 bg-black/20"
                />
                <label htmlFor="supported" className="text-white">
                  Поддерживается системой
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                onClick={handleSaveDevice}
                className="flex-1 nav-button interactive-element"
                disabled={isLoading || !deviceForm.name}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Сохранение...
                  </div>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeviceModal(false)}
                className="border-gray-400 text-gray-400 hover:text-white hover:bg-gray-400/20"
              >
                Отмена
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
