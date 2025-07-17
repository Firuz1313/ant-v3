import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Settings,
  Database,
  Shield,
  Bell,
  Palette,
  Monitor,
  Users,
  Globe,
  Lock,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

interface SettingItem {
  id: string;
  title: string;
  description: string;
  type: "toggle" | "input" | "select";
  value: any;
  enabled: boolean;
  dependencies?: string[];
  category: "system" | "security" | "appearance" | "notifications";
}

export function AdminSettings() {
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: "maintenance_mode",
      title: "Режим обслуживания",
      description: "Включить режим обслуживания для всех пользователей",
      type: "toggle",
      value: false,
      enabled: true,
      category: "system",
    },
    {
      id: "auto_backup",
      title: "Автоматическое резервное копирование",
      description: "Создавать резервные копии данных каждые 24 часа",
      type: "toggle",
      value: true,
      enabled: true,
      category: "system",
    },
    {
      id: "backup_retention",
      title: "Время хранения резервных копий (дни)",
      description: "Количество дней для хранения резервных копий",
      type: "input",
      value: "30",
      enabled: true,
      dependencies: ["auto_backup"],
      category: "system",
    },
    {
      id: "two_factor_auth",
      title: "Двухфакторная аутентификация",
      description: "Требовать 2FA для административных учетных записей",
      type: "toggle",
      value: false,
      enabled: true,
      category: "security",
    },
    {
      id: "session_timeout",
      title: "Тайм-аут сеанса (минуты)",
      description: "Время неактивности до автоматического выхода",
      type: "input",
      value: "60",
      enabled: true,
      dependencies: ["two_factor_auth"],
      category: "security",
    },
    {
      id: "failed_login_limit",
      title: "Лимит неудачных попыток входа",
      description: "Максимальное количество неудачных попыток входа",
      type: "input",
      value: "5",
      enabled: true,
      category: "security",
    },
    {
      id: "email_notifications",
      title: "Email уведомления",
      description: "Отправлять уведомления на электронную почту",
      type: "toggle",
      value: true,
      enabled: true,
      category: "notifications",
    },
    {
      id: "notification_frequency",
      title: "Частота уведомлений",
      description: "Как часто отправлять сводные уведомления",
      type: "select",
      value: "daily",
      enabled: true,
      dependencies: ["email_notifications"],
      category: "notifications",
    },
    {
      id: "dark_mode_default",
      title: "Темная тема по умолчанию",
      description: "Устанавливать темную тему для новых пользователей",
      type: "toggle",
      value: false,
      enabled: true,
      category: "appearance",
    },
    {
      id: "compact_interface",
      title: "Компактный интерфейс",
      description: "Использовать более компактный дизайн интерфейса",
      type: "toggle",
      value: false,
      enabled: true,
      category: "appearance",
    },
  ]);

  const updateSetting = (id: string, value: any) => {
    setSettings((prev) =>
      prev.map((setting) => {
        if (setting.id === id) {
          return { ...setting, value };
        }
        return setting;
      }),
    );

    // Update dependent settings
    setSettings((prev) =>
      prev.map((setting) => {
        if (setting.dependencies?.includes(id)) {
          // If dependency is disabled, disable this setting
          const dependency = prev.find((s) => s.id === id);
          if (dependency && !dependency.value) {
            return { ...setting, enabled: false };
          } else {
            return { ...setting, enabled: true };
          }
        }
        return setting;
      }),
    );
  };

  const getSettingsByCategory = (category: string) => {
    return settings.filter((setting) => setting.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "system":
        return Database;
      case "security":
        return Shield;
      case "notifications":
        return Bell;
      case "appearance":
        return Palette;
      default:
        return Settings;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "system":
        return "text-blue-500";
      case "security":
        return "text-red-500";
      case "notifications":
        return "text-green-500";
      case "appearance":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  const categories = [
    { id: "system", name: "Система", icon: Database },
    { id: "security", name: "Безопасность", icon: Shield },
    { id: "notifications", name: "Уведомления", icon: Bell },
    { id: "appearance", name: "Внешний вид", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {categories.map((category) => {
        const categorySettings = getSettingsByCategory(category.id);
        if (categorySettings.length === 0) return null;

        return (
          <Card key={category.id} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-${category.id === "system" ? "blue" : category.id === "security" ? "red" : category.id === "notifications" ? "green" : "purple"}-500/10 flex items-center justify-center`}
                >
                  <category.icon
                    className={`h-5 w-5 ${getCategoryColor(category.id)}`}
                  />
                </div>
                <span className="text-foreground">{category.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {categorySettings.map((setting) => (
                <div
                  key={setting.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                    setting.enabled
                      ? "border-border bg-background"
                      : "border-muted bg-muted/50 opacity-60"
                  }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <Label
                        htmlFor={setting.id}
                        className={`font-medium ${
                          setting.enabled
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {setting.title}
                      </Label>
                      {setting.dependencies && (
                        <Badge variant="outline" className="text-xs">
                          <Info className="h-3 w-3 mr-1" />
                          Зависит от других настроек
                        </Badge>
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        setting.enabled
                          ? "text-muted-foreground"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {setting.description}
                    </p>
                  </div>

                  <div className="ml-4">
                    {setting.type === "toggle" && (
                      <Switch
                        id={setting.id}
                        checked={setting.value}
                        onCheckedChange={(checked) =>
                          updateSetting(setting.id, checked)
                        }
                        disabled={!setting.enabled}
                      />
                    )}

                    {setting.type === "input" && (
                      <Input
                        id={setting.id}
                        value={setting.value}
                        onChange={(e) =>
                          updateSetting(setting.id, e.target.value)
                        }
                        disabled={!setting.enabled}
                        className="w-24 text-center"
                      />
                    )}

                    {setting.type === "select" && (
                      <select
                        id={setting.id}
                        value={setting.value}
                        onChange={(e) =>
                          updateSetting(setting.id, e.target.value)
                        }
                        disabled={!setting.enabled}
                        className="px-3 py-2 border border-border rounded-md bg-background text-foreground disabled:opacity-50"
                      >
                        <option value="realtime">В реальном времени</option>
                        <option value="hourly">Каждый час</option>
                        <option value="daily">Ежедневно</option>
                        <option value="weekly">Еженедельно</option>
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}

      {/* Settings Actions */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                Применить изменения
              </h3>
              <p className="text-sm text-muted-foreground">
                Сохранить все изменения настроек системы
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">Сбросить</Button>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Сохранить изменения
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
