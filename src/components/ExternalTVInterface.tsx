import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Download,
  AlertTriangle,
  CheckCircle,
  Loader2,
  RefreshCw,
  Info,
  Github,
} from "lucide-react";

interface ExternalTVInterfaceProps {
  deviceId: string;
  errorKey?: string;
  subErrorKey?: string;
  repositoryUrl?: string;
}

interface ExternalProject {
  name: string;
  url: string;
  branch: string;
  status: "loading" | "ready" | "error" | "not-found";
  version?: string;
  lastUpdated?: string;
  description?: string;
}

// Dynamic import placeholder - in production this would dynamically load from GitHub
const DynamicTVInterface = ({ deviceId, errorKey, subErrorKey }: any) => {
  // Simulate external component loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate random success/failure for demo
      const success = Math.random() > 0.3;
      if (success) {
        setIsLoading(false);
      } else {
        setError("Не удалось загрузить внешний интерфейс");
        setIsLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [deviceId, errorKey]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Загрузка внешнего интерфейса...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Повторить попытку
          </Button>
        </div>
      </div>
    );
  }

  // Mock external TV interface
  return (
    <div className="bg-black rounded-lg p-6">
      <div className="mb-4">
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          Внешний интерфейс загружен
        </Badge>
      </div>
      <div className="text-center text-white">
        <h3 className="text-lg font-bold mb-2">
          Интерфейс {deviceId.toUpperCase()}
        </h3>
        <p className="text-gray-400 mb-4">
          Внешний интерфейс для диагностики ошибки: {errorKey}
          {subErrorKey && ` / ${subErrorKey}`}
        </p>
        <div className="bg-gray-800 rounded p-4 text-left">
          <p className="text-sm text-gray-300">
            // Здесь будет загружен реальный интерфейс
            <br />
            // из репозитория github.com/Firuz1313/ant-v3
            <br />
            <br />
            console.log("Device:", "{deviceId}");
            <br />
            console.log("Error:", "{errorKey}");
            <br />
            {subErrorKey && (
              <>
                console.log("SubError:", "{subErrorKey}");
                <br />
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ExternalTVInterface({
  deviceId,
  errorKey,
  subErrorKey,
  repositoryUrl = "https://github.com/Firuz1313/ant-v3",
}: ExternalTVInterfaceProps) {
  const [project, setProject] = useState<ExternalProject>({
    name: "ant-v3",
    url: repositoryUrl,
    branch: "main",
    status: "loading",
  });

  const [showExternal, setShowExternal] = useState(false);

  useEffect(() => {
    // Simulate fetching project info
    const timer = setTimeout(() => {
      setProject({
        name: "ant-v3",
        url: repositoryUrl,
        branch: "main",
        status: "ready",
        version: "v1.2.3",
        lastUpdated: "2 дня назад",
        description: "Интерфейсы OpenBox TV приставок",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [repositoryUrl]);

  const handleLoadExternal = () => {
    setShowExternal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "loading":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4" />;
      case "loading":
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* External Project Info */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Github className="h-6 w-6 text-white" />
            <div>
              <h3 className="text-lg font-bold text-white">
                Внешний проект: {project.name}
              </h3>
              <p className="text-gray-400 text-sm">
                Интеграция с репозиторием GitHub
              </p>
            </div>
          </div>
          <Badge className={getStatusColor(project.status)}>
            {getStatusIcon(project.status)}
            <span className="ml-2">
              {project.status === "ready"
                ? "Готов"
                : project.status === "loading"
                  ? "Загрузка"
                  : project.status === "error"
                    ? "Ошибка"
                    : "Неизвестно"}
            </span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Репозиторий</div>
            <div className="text-white font-medium">{project.name}</div>
          </div>
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Версия</div>
            <div className="text-white font-medium">
              {project.version || "—"}
            </div>
          </div>
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-xs text-gray-400 mb-1">Обновлено</div>
            <div className="text-white font-medium">
              {project.lastUpdated || "—"}
            </div>
          </div>
        </div>

        {project.description && (
          <p className="text-gray-400 mb-6">{project.description}</p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleLoadExternal}
            disabled={project.status !== "ready" || showExternal}
            className="nav-button interactive-element"
          >
            {showExternal ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Интерфейс загружен
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Загрузить интерфейс
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(project.url, "_blank")}
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white interactive-element"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Открыть репозиторий
          </Button>
        </div>
      </div>

      {/* External Interface */}
      {showExternal && (
        <motion.div
          className="glass-card rounded-2xl p-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4">
            <h4 className="text-lg font-bold text-white mb-2">
              Интегрированный интерфейс
            </h4>
            <p className="text-gray-400">
              Загружен внешний интерфейс для устройства {deviceId}
            </p>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
              </div>
            }
          >
            <DynamicTVInterface
              deviceId={deviceId}
              errorKey={errorKey}
              subErrorKey={subErrorKey}
            />
          </Suspense>
        </motion.div>
      )}

      {/* Integration Instructions */}
      <div className="glass-card rounded-2xl p-6">
        <h4 className="text-lg font-bold text-white mb-4">
          Настройка интеграции
        </h4>
        <div className="space-y-4">
          <div className="bg-black/20 rounded-lg p-4">
            <h5 className="text-white font-medium mb-2">
              1. Настройка репозитория
            </h5>
            <p className="text-gray-400 text-sm">
              Убедитесь, что внешний репозиторий содержит экспортируемые
              компоненты TVScreen и RemoteControl.
            </p>
          </div>
          <div className="bg-black/20 rounded-lg p-4">
            <h5 className="text-white font-medium mb-2">2. CORS настройки</h5>
            <p className="text-gray-400 text-sm">
              Настройте CORS политики для загрузки компонентов с внешнего домена
              GitHub Pages или CDN.
            </p>
          </div>
          <div className="bg-black/20 rounded-lg p-4">
            <h5 className="text-white font-medium mb-2">3. Версионирование</h5>
            <p className="text-gray-400 text-sm">
              Используйте тэги Git для управления версиями интегрируемых
              интерфейсов.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
