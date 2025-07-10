# 🚀 Руководство по Развертыванию ANT Support

## 📋 Предварительные требования

- **Node.js** 18 или выше
- **npm** или **yarn**
- **Git** для клонирования репозитория

## ⚡ Быстрое развертывание

### 1. Клонирование и установка

```bash
# Клонирование репозитория
git clone https://github.com/your-username/ant-support.git
cd ant-support

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

### 2. Сборка для продакшена

```bash
# Создание оптимизированной сборки
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 🌐 Развертывание на Netlify

### Автоматическое развертывание

1. Подключите репозиторий к Netlify
2. Установите команды сборки:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Настройте переменные окружения (если необходимо)

### Ручное развертывание

```bash
# Сборка проекта
npm run build

# Развертывание через Netlify CLI
netlify deploy --prod --dir=dist
```

## 🐳 Docker развертывание

### Создание образа

```bash
# Сборка Docker образа
docker build -t ant-support .

# Запуск контейнера
docker run -p 3000:3000 ant-support
```

### Docker Compose

```yaml
version: '3.8'
services:
  ant-support:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

## ☁️ Развертывание на Vercel

```bash
# Установка Vercel CLI
npm i -g vercel

# Развертывание
vercel --prod
```

## 🔧 Переменные окружения

Создайте файл `.env.local` для локальной разработки:

```env
# Основные настройки
VITE_APP_VERSION=3.0.0
VITE_API_URL=https://api.ant-support.com

# Настройки производительности
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true

# Настройки разработки
VITE_DEBUG_MODE=false
```

## 🚦 Проверка производительности

### Анализ размера бандла

```bash
# Анализ размера файлов
npm run analyze

# Проверка неиспользуемых экспортов
npm run unused
```

### Тестирование

```bash
# Запуск тестов
npm run test

# Проверка типов TypeScript
npm run typecheck

# Форматирование кода
npm run format.fix
```

## 📊 Мониторинг после развертывания

### 1. Проверьте основные метрики

- ✅ Время загрузки страницы < 3 секунд
- ✅ First Contentful Paint < 1.5 секунд
- ✅ Largest Contentful Paint < 2.5 секунд
- ✅ Cumulative Layout Shift < 0.1

### 2. Проверьте функциональность

- ✅ 3D модели загружаются корректно
- ✅ Виртуальный пульт работает
- ✅ Навигация по меню плавная
- ✅ Поиск каналов функционирует
- ✅ Мобильная версия отзывчива

## 🔐 Безопасность

### CSP заголовки

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' api.ant-support.com
```

### Дополнительные заголовки

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 🚨 Устранение неполадок

### Частые проблемы

#### 1. Ошибки памяти при сборке

```bash
# Увеличение лимита памяти для Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

#### 2. Проблемы с 3D моделями

```bash
# Проверка поддержки WebGL
# В браузере: webglreport.com
```

#### 3. Медленная загрузка

```bash
# Включение сжатия на сервере
# Настройка Service Worker для кеширования
# Оптимизация изображений
```

## 📱 Мобильная оптимизация

### PWA настройки

```json
{
  "name": "ANT Support",
  "short_name": "ANTSupport",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#2563eb",
  "background_color": "#0f172a"
}
```

### Оптимизация касаний

```css
/* Отключение масштабирования */
meta[name="viewport"] content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"

/* Улучшение отзывчивости кнопок */
button {
  touch-action: manipulation;
}
```

## 📈 Аналитика и мониторинг

### Google Analytics

```javascript
// Добавьте в index.html
gtag('config', 'GA_MEASUREMENT_ID');
```

### Мониторинг ошибок

```javascript
// Интеграция с Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: netlify/actions/deploy@main
        with:
          publish-dir: './dist'
          production-branch: main
```

## 📞 Поддержка

При возникновении проблем с развертыванием:

- 📧 **Email**: dev-support@ant-tv.com
- 💬 **Telegram**: [@ant_dev_support](https://t.me/ant_dev_support)
- 📖 **Документация**: [docs.ant-support.com](https://docs.ant-support.com)

---

✅ **Успешного развертывания!** 🚀