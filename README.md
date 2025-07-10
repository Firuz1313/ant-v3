# 🎬 ANT Support - Платформа Технической Поддержки

> 🚀 Современная комплексная платформа для поддержки цифровых ТВ-приставок с интерактивными 3D моделями, виртуальным пультом управления и симуляцией телевизионного интерфейса.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

## ✨ Особенности

### 🎮 Интерактивные Компоненты
- **3D Модели Устройств** - Реалистичные 3D модели приставок с Three.js
- **Виртуальный Пульт** - Полнофункциональная симуляция пульта управления
- **ТВ Интерфейс** - Реалистичная симуляция интерфейса приставки
- **Анимированный UI** - Плавные переходы с Framer Motion

### 📱 Поддерживаемые Устройства
- **OpenBox** (2.3M+ пользователей)
- **OpenBox Gold** (1.8M+ пользователей) 
- **Uclan** (1.2M+ пользователей)
- **HDBox** (950K+ пользователей)

### 🛠 Функциональность
- ✅ Пошаговые инструкции по настройке
- ✅ Диагностика ошибок с детальными решениями
- ✅ Управление каналами и настройки
- ✅ Поиск каналов с прогресс-барами
- ✅ Симуляция работы с Conax картами
- ✅ Настройка антенны и спутникового сигнала

## 🚀 Быстрый старт

### Требования
- Node.js 18+ 
- npm или yarn

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/your-username/ant-support.git
cd ant-support

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```

### Доступные команды

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка проекта
npm run test         # Запуск тестов
npm run format.fix   # Форматирование кода
npm run typecheck    # Проверка типов TypeScript
npm run analyze      # Анализ размера бандла
npm run unused       # Поиск неиспользуемых экспортов
```

## 🏗 Архитектура

### Структура проекта
```
src/
├── components/          # React компоненты
│   ├── ui/             # UI компоненты (shadcn/ui)
│   ├── TVScreen.tsx    # Основной компонент ТВ экрана
│   ├── RemoteControl.tsx # Виртуальный пульт
│   └── ...
├── pages/              # Страницы приложения
│   ├── ANTSupport.tsx  # Главная страница
│   ├── SelectDevicePage.tsx # Выбор устройства
│   └── ...
├── context/            # React Context для состояния
├── hooks/              # Пользовательские хуки
├── data/               # Статические данные
└── lib/                # Утилиты и конфигурация
```

### Технологический стек

**Frontend Framework:**
- React 18 с TypeScript
- Vite для сборки и разработки

**UI и Стилизация:**
- Tailwind CSS для стилизации
- Radix UI для доступных компонентов
- Framer Motion для анимаций
- Lucide React для иконок

**3D Графика:**
- Three.js для 3D рендеринга
- @react-three/fiber для React интеграции
- @react-three/drei для 3D утилит

**Состояние и Роутинг:**
- React Router для навигации
- TanStack Query для управления состоянием
- React Context для глобального состояния

**Developer Experience:**
- TypeScript для типизации
- ESLint и Prettier для качества кода
- Vitest для тестирования

## 🎯 Ключевые компоненты

### TVScreen Component
Основной компонент симуляции ТВ экрана с поддержкой:
- Навигация по меню и каналам
- Интерактивные настройки
- Анимированные модальные окна
- Поиск каналов с прогресс-индикаторами

### RemoteControl Component  
Виртуальный пульт управления с:
- Реалистичным дизайном кнопок
- Поддержкой всех функций пульта
- Тактильной обратной связью
- Интеграцией с ТВ экраном

### 3D Device Models
Интерактивные 3D модели с:
- Фотореалистичным рендерингом
- Поддержкой орбитального управления
- Анимированными переходами
- Оптимизированной производительностью

## 🎨 UI/UX Дизайн

### Цветовая схема
- **Primary:** Градиенты синего (#2563eb - #3386ff)
- **Background:** Темные градиенты (#0f172a - #334155) 
- **Accent:** Зеленый для успеха (#00e676)
- **Text:** Белый с тенями для читаемости

### Анимации
- Плавные переходы 300ms
- Hover эффекты с трансформациями
- Градиентные анимации для фонов
- Пульсирующие элементы для внимания

## 🔧 Настройка и конфигурация

### Environment Variables
```env
# Добавьте необходимые переменные окружения в .env
VITE_API_URL=your_api_url
VITE_APP_VERSION=3.0.0
```

### Tailwind Configuration
Кастомизированная конфигурация в `tailwind.config.ts` с:
- Расширенной цветовой палитрой
- Кастомными градиентами
- Анимациями и переходами
- Responsive breakpoints

## 🚀 Деплой

### Netlify (рекомендуется)
```bash
# Сборка проекта
npm run build

# Деплой через Netlify CLI
netlify deploy --prod --dir=dist
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📋 Роадмап

### v3.1 (Ближайшее обновление)
- [ ] Поддержка дополнительных моделей приставок
- [ ] Улучшенные 3D анимации 
- [ ] Система уведомлений
- [ ] Мобильная оптимизация

### v3.2
- [ ] Интеграция с реальными API
- [ ] Многоязычная поддержка
- [ ] Темы оформления
- [ ] Продвинутая аналитика

### v4.0
- [ ] AR функциональность
- [ ] WebRTC для удаленной поддержки
- [ ] AI помощник
- [ ] Микросервисная архитектура

## 🤝 Вклад в разработку

Мы приветствуем вклад в развитие проекта! 

### Процесс разработки
1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

### Code Style
- Используйте TypeScript для всех новых файлов
- Следуйте конфигурации ESLint и Prettier
- Добавляйте JSDoc комментарии для функций
- Пишите тесты для новой функциональности

## 📝 Лицензия

Этот проект лицензирован под MIT License - см. [LICENSE](LICENSE) файл для деталей.

## 👥 Команда

- **Lead Developer** - [@your-username](https://github.com/your-username)
- **UI/UX Designer** - [@designer](https://github.com/designer)
- **3D Artist** - [@artist](https://github.com/artist)

## 📞 Поддержка

- 📧 Email: support@ant-tv.com
- 💬 Telegram: [@ant_support](https://t.me/ant_support)
- 🌐 Website: [https://ant-support.com](https://ant-support.com)

---

<div align="center">
  <strong>Сделано с ❤️ для сообщества цифрового ТВ</strong>
</div>