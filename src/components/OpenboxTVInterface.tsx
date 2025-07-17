import React, { useState, useEffect } from "react";
import {
  FaTools,
  FaCog,
  FaList,
  FaDesktop,
  FaGamepad,
  FaKey,
} from "react-icons/fa";
import { useTVControl } from "../context/TVControlContext";

const menuItems = [
  {
    label: "Установки",
    selected: true,
    icon: <FaCog size={16} color="#1976d2" />,
    description: "Основные настройки приставки",
  },
  {
    label: "Редактор Каналов",
    icon: <FaList size={16} color="#1976d2" />,
    description: "Управление списком каналов",
  },
  {
    label: "Настройка Системы",
    icon: <FaDesktop size={16} color="#1976d2" />,
    description: "Системные параметры",
  },
  {
    label: "Приложение",
    icon: <FaGamepad size={16} color="#1976d2" />,
    description: "Дополнительные приложения",
  },
  {
    label: "Условный Доступ",
    icon: <FaKey size={16} color="#1976d2" />,
    description: "Настройки доступа к каналам",
  },
];

export default function OpenboxTVInterface() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const { sendCommand } = useTVControl();

  // Добавляем эффект мерцания для создания ощущения живого ТВ
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const flickerInterval = setInterval(
      () => {
        setFlicker((prev) => !prev);
      },
      3000 + Math.random() * 2000,
    ); // Случайное мерцание каждые 3-5 сек

    return () => clearInterval(flickerInterval);
  }, []);

  // Обработка команд с пульта
  useEffect(() => {
    const handleRemoteCommand = (event: CustomEvent) => {
      const { type, key } = event.detail;

      if (!showMenu) return;

      switch (key) {
        case "up":
          setIsNavigating(true);
          setSelectedIndex((prev) => Math.max(0, prev - 1));
          setTimeout(() => setIsNavigating(false), 200);
          break;
        case "down":
          setIsNavigating(true);
          setSelectedIndex((prev) => Math.min(menuItems.length - 1, prev + 1));
          setTimeout(() => setIsNavigating(false), 200);
          break;
        case "ok":
          // Имитация выбора пункта меню
          handleMenuSelect(selectedIndex);
          break;
        case "exit":
          setShowMenu(false);
          setTimeout(() => setShowMenu(true), 1000);
          break;
        case "menu":
          setShowMenu(!showMenu);
          break;
      }
    };

    // Слушаем события от пульта
    window.addEventListener(
      "remote-command",
      handleRemoteCommand as EventListener,
    );

    return () => {
      window.removeEventListener(
        "remote-command",
        handleRemoteCommand as EventListener,
      );
    };
  }, [selectedIndex, showMenu]);

  // Отправка команд обратно к пульту для создания обратной связи
  useEffect(() => {
    // Создаем событие для синхронизации с пультом
    window.dispatchEvent(
      new CustomEvent("tv-response", {
        detail: { selectedIndex, isNavigating },
      }),
    );
  }, [selectedIndex, isNavigating]);

  const handleMenuSelect = (index: number) => {
    setIsNavigating(true);
    // Имитация перехода в подменю
    console.log(`Выбран пункт: ${menuItems[index].label}`);

    // Анимация выбора
    setTimeout(() => {
      setIsNavigating(false);
    }, 500);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#000000",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Тонкие линии сканирования для эффекта ТВ */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 255, 0, 0.015) 2px,
          rgba(0, 255, 0, 0.015) 4px
        )`,
          pointerEvents: "none",
          zIndex: 5,
          animation: "scanlines 2s linear infinite",
        }}
      />

      {/* Эффект мерцания */}
      {flicker && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 20, 40, 0.1)",
            pointerEvents: "none",
            zIndex: 3,
            opacity: 0.3,
            transition: "opacity 0.1s",
          }}
        />
      )}

      {/* Статический шум (очень слабый) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Главное меню в левом нижнем углу */}
      {showMenu && (
        <div
          style={{
            position: "absolute",
            left: 40,
            bottom: 80,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            animation: "slideInFromLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isNavigating ? "scale(1.02)" : "scale(1)",
            transition: "transform 0.2s ease",
          }}
        >
          {/* Иконка инструментов над меню */}
          <div
            style={{
              marginBottom: 12,
              marginLeft: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "iconFloat 3s ease-in-out infinite",
            }}
          >
            <div
              style={{
                background: "linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%)",
                border: "3px solid #adb5bd",
                borderRadius: "50%",
                width: 52,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 6px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -2,
                  left: -2,
                  right: -2,
                  bottom: -2,
                  background:
                    "linear-gradient(45deg, transparent, rgba(25,118,210,0.2), transparent)",
                  borderRadius: "50%",
                  animation: "rotate 4s linear infinite",
                }}
              />
              <FaTools size={24} color="#1976d2" />
            </div>
          </div>

          {/* Меню с точным дизайном как на изображении */}
          <div
            style={{
              background: "linear-gradient(145deg, #e8f4fd 0%, #bbdefb 100%)",
              border: "3px solid #81c784",
              borderRadius: 15,
              minWidth: 240,
              maxWidth: 260,
              padding: "15px 0",
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.6)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Внутренняя тень для глубины */}
            <div
              style={{
                position: "absolute",
                top: 3,
                left: 3,
                right: 3,
                bottom: 3,
                borderRadius: 10,
                boxShadow: "inset 0 3px 6px rgba(0,0,0,0.12)",
                pointerEvents: "none",
              }}
            />

            {/* Градиентная подсветка сверху */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "30%",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                pointerEvents: "none",
              }}
            />

            {menuItems.map((item, idx) => (
              <div
                key={item.label}
                style={{
                  background:
                    idx === selectedIndex
                      ? "linear-gradient(145deg, #1565c0 0%, #0d47a1 100%)"
                      : "transparent",
                  color: idx === selectedIndex ? "#ffffff" : "#263238",
                  fontWeight: idx === selectedIndex ? 700 : 600,
                  fontSize: 16,
                  padding: "12px 24px",
                  margin: "2px 15px",
                  borderRadius: 8,
                  border:
                    idx === selectedIndex
                      ? "2px solid #0277bd"
                      : "2px solid transparent",
                  boxShadow:
                    idx === selectedIndex
                      ? "0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25), 0 0 0 2px rgba(25,118,210,0.3)"
                      : "none",
                  textShadow:
                    idx === selectedIndex
                      ? "0 1px 2px rgba(0,0,0,0.4)"
                      : "none",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transform:
                    idx === selectedIndex
                      ? "scale(1.02) translateX(4px)"
                      : "scale(1)",
                  animation:
                    isNavigating && idx === selectedIndex
                      ? "pulse 0.3s ease-in-out"
                      : "none",
                }}
                onMouseEnter={() => !item.selected && setSelectedIndex(idx)}
                onClick={() => handleMenuSelect(idx)}
              >
                <div
                  style={{
                    opacity: idx === selectedIndex ? 1 : 0.7,
                    transform:
                      idx === selectedIndex ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div>{item.label}</div>
                  {idx === selectedIndex && (
                    <div
                      style={{
                        fontSize: "11px",
                        opacity: 0.8,
                        marginTop: "2px",
                        fontWeight: 400,
                      }}
                    >
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Индикатор активности в правом верхнем углу */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(0,0,0,0.6)",
          padding: "8px 16px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            background: "#4caf50",
            borderRadius: "50%",
            animation: "blink 2s infinite",
          }}
        />
        <span style={{ color: "#fff", fontSize: "12px", fontWeight: "500" }}>
          OPENBOX
        </span>
      </div>

      {/* Добавляем CSS анимации */}
      <style>{`
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes iconFloat {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-4px);
          }
        }

        @keyframes rotate {
          0% { 
            transform: rotate(0deg);
          }
          100% { 
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1.02) translateX(4px);
          }
          50% { 
            transform: scale(1.05) translateX(6px);
          }
        }

        @keyframes blink {
          0%, 50% { 
            opacity: 1;
          }
          51%, 100% { 
            opacity: 0.3;
          }
        }

        @keyframes scanlines {
          0% { 
            transform: translateY(-2px);
          }
          100% { 
            transform: translateY(2px);
          }
        }
      `}</style>
    </div>
  );
}
