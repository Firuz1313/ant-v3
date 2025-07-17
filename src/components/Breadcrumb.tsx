import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function Breadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const items: BreadcrumbItem[] = [
      {
        label: language === "ru" ? "Главная" : "Home",
        path: "/",
      },
    ];

    if (pathSegments.length === 0) return [];

    // Handle specific routes
    if (pathSegments[0] === "select-device") {
      items.push({
        label: language === "ru" ? "Выбор устройства" : "Device Selection",
        path: "/select-device",
      });
    } else if (pathSegments[0] === "device" && pathSegments[1]) {
      items.push(
        {
          label: language === "ru" ? "Выбор устройства" : "Device Selection",
          path: "/select-device",
        },
        {
          label: language === "ru" ? "Управление" : "Control",
          path: `/device/${pathSegments[1]}`,
        },
      );
    } else if (pathSegments[0] === "admin") {
      items.push({
        label: language === "ru" ? "Администрирование" : "Administration",
        path: "/admin",
      });
    } else if (pathSegments[1] === "error-select") {
      const deviceName = pathSegments[0];
      items.push(
        {
          label: language === "ru" ? "Выбор устройства" : "Device Selection",
          path: "/select-device",
        },
        {
          label: language === "ru" ? "Управление" : "Control",
          path: `/device/${deviceName}`,
        },
        {
          label: language === "ru" ? "Выбор ошибки" : "Error Selection",
          path: `/${deviceName}/error-select`,
        },
      );
    } else if (pathSegments[1] === "error") {
      const deviceName = pathSegments[0];
      items.push(
        {
          label: language === "ru" ? "Выбор устройства" : "Device Selection",
          path: "/select-device",
        },
        {
          label: language === "ru" ? "Управление" : "Control",
          path: `/device/${deviceName}`,
        },
        {
          label: language === "ru" ? "Выбор ошибки" : "Error Selection",
          path: `/${deviceName}/error-select`,
        },
        {
          label: language === "ru" ? "Диагностика" : "Diagnostics",
          path: location.pathname,
        },
      );
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground py-3">
      {breadcrumbItems.map((item, index) => (
        <div key={item.path} className="flex items-center space-x-1">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          <Button
            variant="ghost"
            size="sm"
            className={`h-auto p-1 text-sm ${
              index === breadcrumbItems.length - 1
                ? "text-foreground font-medium cursor-default"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              if (index < breadcrumbItems.length - 1) {
                navigate(item.path);
              }
            }}
            disabled={index === breadcrumbItems.length - 1}
          >
            {index === 0 && <Home className="h-3 w-3 mr-1" />}
            {item.label}
          </Button>
        </div>
      ))}
    </nav>
  );
}
