# 🔗 Интеграция внешних проектов ANT-V3

## Обзор

ANT-V3 поддерживает динамическую загрузку внешних TV-интерфейсов из GitHub репозиториев. Это позволяет разработчикам создавать собственные интерфейсы для различных моделей приставок и интегрировать их в основную систему.

## 🎯 Цель интеграции

Система позволяет:

- Динамически загружать TV-интерфейсы из внешних репозиториев
- Поддерживать версионирование интерфейсов
- Обеспечивать безопасную изоляцию внешнего кода
- Управлять зависимостями и обновлениями

## 📁 Структура внешнего проекта

Внешний репозиторий должен иметь следующую структуру:

```
external-tv-project/
├── package.json              # Метаданные проекта
├── dist/                     # Собранные файлы
│   ├── tv-interface.js       # Основной бандл
│   ├── tv-interface.css      # Стили
│   └── manifest.json         # Манифест интеграции
├── src/
│   ├── components/
│   │   ├── TVScreen.tsx      # Компонент экрана ТВ
│   │   ├── RemoteControl.tsx # Компонент пульта
│   │   └── index.ts          # Экспорты
│   └── interfaces.ts         # TypeScript интерфейсы
└── README.md
```

## 🛠️ Требования к внешнему проекту

### 1. Манифест интеграции (dist/manifest.json)

```json
{
  "name": "openbox-gold-interface",
  "version": "1.2.3",
  "description": "OpenBox Gold TV Interface",
  "author": "Your Name",
  "antVersion": "^3.0.0",
  "devices": ["openbox-gold", "openbox-s9"],
  "errors": ["no-signal", "encrypted", "network"],
  "exports": {
    "TVScreen": "./tv-interface.js#TVScreen",
    "RemoteControl": "./tv-interface.js#RemoteControl"
  },
  "dependencies": {
    "react": "^18.0.0",
    "framer-motion": "^12.0.0"
  },
  "permissions": ["device-control", "error-handling"],
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

### 2. Основной экспорт (src/components/index.ts)

```typescript
import { TVScreenProps, RemoteControlProps } from '../interfaces';

// Компонент экрана ТВ
export const TVScreen: React.FC<TVScreenProps> = ({
  deviceId,
  errorKey,
  subErrorKey,
  width,
  height,
  onStateChange
}) => {
  // Реализация интерфейса приставки
  return (
    <div className="tv-screen-container">
      {/* Ваш интерфейс здесь */}
    </div>
  );
};

// Компонент пульта управления
export const RemoteControl: React.FC<RemoteControlProps> = ({
  deviceId,
  onButtonClick,
  disabled
}) => {
  return (
    <div className="remote-control">
      {/* SVG пульт или интерактивные кнопки */}
    </div>
  );
};

// Версия API д��я совместимости
export const API_VERSION = '3.0.0';

// Инициализация компонента
export const initialize = (config: any) => {
  console.log('External TV Interface initialized:', config);
};
```

### 3. TypeScript интерфейсы (src/interfaces.ts)

```typescript
export interface TVScreenProps {
  deviceId: string;
  errorKey?: string;
  subErrorKey?: string;
  width: number;
  height: number;
  panelBtnFromRemote?: number | null;
  onStateChange?: (state: TVState) => void;
}

export interface RemoteControlProps {
  deviceId: string;
  onButtonClick: (key: string) => void;
  disabled?: boolean;
  layout?: "compact" | "full";
}

export interface TVState {
  currentChannel: number;
  volume: number;
  isOn: boolean;
  currentMenu?: string;
  errorState?: string;
}

export interface ErrorContext {
  errorKey: string;
  subErrorKey?: string;
  deviceId: string;
  steps: ErrorStep[];
}

export interface ErrorStep {
  id: string;
  title: string;
  description: string;
  action: "check" | "configure" | "restart" | "replace";
  completed: boolean;
}
```

## 🔧 Настройка в ANT-V3

### 1. Конфигурация в AdminPanel

```typescript
// Добавление внешнего репозитория
const externalProject = {
  name: "openbox-gold-enhanced",
  url: "https://github.com/username/openbox-gold-interface",
  branch: "main",
  version: "latest", // или конкретная версия
  devices: ["openbox-gold"],
  enabled: true,
};
```

### 2. Использование в DeviceRemotePage

```typescript
import { ExternalTVInterface } from '@/components/ExternalTVInterface';

// В компоненте DeviceRemotePage
const shouldUseExternal = selectedDevice.id === 'openbox-gold' &&
                         externalProject.enabled;

return (
  <div>
    {shouldUseExternal ? (
      <ExternalTVInterface
        deviceId={selectedDevice.id}
        errorKey={currentError}
        subErrorKey={currentSubError}
        repositoryUrl="https://github.com/Firuz1313/ant-v3"
      />
    ) : (
      <TVScreen
        deviceId={selectedDevice.id}
        // ... остальные пропсы
      />
    )}
  </div>
);
```

## 📡 API загрузки

### 1. Динамическая загрузка

```typescript
class ExternalInterfaceLoader {
  private cache = new Map<string, any>();

  async loadInterface(url: string, version?: string): Promise<any> {
    const cacheKey = `${url}@${version || "latest"}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Загрузка манифеста
      const manifestUrl = `${url}/dist/manifest.json`;
      const manifest = await fetch(manifestUrl).then((r) => r.json());

      // Проверка совместимости
      if (!this.isCompatible(manifest)) {
        throw new Error("Incompatible interface version");
      }

      // Загрузка основного бандла
      const bundleUrl = `${url}/dist/tv-interface.js`;
      const module = await import(bundleUrl);

      // Кэширование
      this.cache.set(cacheKey, { manifest, module });

      return { manifest, module };
    } catch (error) {
      console.error("Failed to load external interface:", error);
      throw error;
    }
  }

  private isCompatible(manifest: any): boolean {
    // Проверка версии ANT API
    return (
      manifest.antVersion && semver.satisfies("3.0.0", manifest.antVersion)
    );
  }
}
```

### 2. Безопасность и изоляция

```typescript
// Песочница для внешнего кода
class InterfaceSandbox {
  private iframe: HTMLIFrameElement;

  constructor(private config: any) {
    this.iframe = this.createSandbox();
  }

  private createSandbox(): HTMLIFrameElement {
    const iframe = document.createElement("iframe");
    iframe.sandbox = "allow-scripts allow-same-origin";
    iframe.src = "about:blank";

    // CSP для ограничения возможностей
    iframe.setAttribute(
      "csp",
      "default-src 'self'; script-src 'unsafe-inline'",
    );

    return iframe;
  }

  async loadInterface(code: string): Promise<void> {
    const doc = this.iframe.contentDocument;
    if (!doc) throw new Error("Sandbox not ready");

    // Инжектируем код в изолированную среду
    const script = doc.createElement("script");
    script.textContent = this.wrapCode(code);
    doc.head.appendChild(script);
  }

  private wrapCode(code: string): string {
    return `
      (function() {
        'use strict';
        
        // Ограниченный API для внешнего кода
        const ANT_API = {
          version: '3.0.0',
          notify: parent.postMessage.bind(parent),
          getDeviceInfo: () => (${JSON.stringify(this.config)})
        };
        
        ${code}
      })();
    `;
  }
}
```

## 🔒 Безопасность

### Ограничения безопасности:

- **CSP (Content Security Policy)**: Ограничивает источники загрузки
- **Sandbox**: Изоляция внешнего кода в iframe
- **API ограничения**: Доступ только к разрешенным функциям
- **Валидация**: Проверка подписей и целостности кода

### Разрешения:

- `device-control`: Управление устройством
- `error-handling`: Обработка ошибок
- `network-access`: Сетевые запросы
- `storage-access`: Локальное хранилище

## 📊 Мониторинг и отладка

### Логирование внешних интерфейсов:

```typescript
class ExternalInterfaceMonitor {
  private logs: any[] = [];

  logEvent(event: string, data: any): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      data,
      source: "external-interface",
    };

    this.logs.push(logEntry);

    // Отправка в систему мониторинга
    this.sendToMonitoring(logEntry);
  }

  getPerformanceMetrics(): any {
    return {
      loadTime: this.calculateLoadTime(),
      errorRate: this.calculateErrorRate(),
      memoryUsage: this.getMemoryUsage(),
    };
  }
}
```

## 🚀 Развертывание

### GitHub Pages конфигурация:

```yaml
# .github/workflows/deploy.yml
name: Deploy TV Interface

on:
  push:
    branches: [main]
    tags: ["v*"]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Generate manifest
        run: npm run generate-manifest

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          cname: tv-interface.yourdomain.com
```

## 📝 Пример интеграции

Полный пример интеграции доступен в репозитории:
**https://github.com/Firuz1313/ant-v3**

Этот репозиторий содержит готовые интерфейсы для OpenBox и OpenBox Gold, которые можно использовать как образец для создания собственных интеграций.

## 🆘 Поддержка

Для получения помощи по интеграции:

- Изучите документацию API в `/docs/api`
- Проверьте примеры в `/examples`
- Создайте issue в основном репозитории ANT-V3
- Свяжитесь с командой разработки через админ-панель

---

**ANT-V3** - Будущее виртуальных TV интерфейсов 🚀
