import React, { useState, useEffect } from "react";
import { FaTools } from "react-icons/fa";
import { useTVControl } from "../context/TVControlContext";

const menuItems = [
  { label: "Установки", selected: true },
  { label: "Редактор Каналов" },
  { label: "Настройка Системы" },
  { label: "Приложение" },
  { label: "Условный Доступ" },
];

export default function OpenboxTVInterface() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPoweredOn, setIsPoweredOn] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const { sendCommand } = useTVControl();

  // Добавляем эффект мерцания для создания ощущения живого ТВ
  const [flicker, setFlicker] = useState(false);

  // Плавное включение при загрузке
  useEffect(() => {
    const bootSequence = async () => {
      // Имитация включения приставки
      for (let i = 0; i <= 100; i += 5) {
        setBootProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      setIsPoweredOn(true);
      setTimeout(() => setShowMenu(true), 800);
    };

    bootSequence();
  }, []);

  useEffect(() => {
    if (!isPoweredOn) return;

    const flickerInterval = setInterval(
      () => {
        setFlicker((prev) => !prev);
      },
      3000 + Math.random() * 2000,
    ); // Случайное мерцание каждые 3-5 сек

    return () => clearInterval(flickerInterval);
  }, [isPoweredOn]);

  // Обработка команд с пульта
  useEffect(() => {
    const handleRemoteCommand = (event: CustomEvent) => {
      const { type, key } = event.detail;

      if (!showMenu || !isPoweredOn) return;

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
  }, [selectedIndex, showMenu, isPoweredOn]);

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
        opacity: isPoweredOn ? 1 : bootProgress / 100,
        filter: isPoweredOn ? "none" : `brightness(${bootProgress / 100})`,
        transition: "opacity 0.5s ease, filter 0.5s ease",
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
          rgba(0, 255, 0, 0.008) 2px,
          rgba(0, 255, 0, 0.008) 4px
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
            background: "rgba(0, 20, 40, 0.05)",
            pointerEvents: "none",
            zIndex: 3,
            opacity: 0.2,
            transition: "opacity 0.1s",
          }}
        />
      )}

      {/* Лого загрузки */}
      {!isPoweredOn && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 20,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              marginBottom: "20px",
              textShadow: "0 0 20px rgba(255,255,255,0.5)",
              animation: "logoGlow 2s ease-in-out infinite alternate",
            }}
          >
            OPENBOX
          </div>
          <div
            style={{
              width: "200px",
              height: "4px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${bootProgress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                borderRadius: "2px",
                transition: "width 0.1s ease",
                boxShadow: "0 0 10px rgba(25,118,210,0.5)",
              }}
            />
          </div>
          <div
            style={{
              fontSize: "12px",
              marginTop: "10px",
              opacity: 0.7,
            }}
          >
            Загрузка... {bootProgress}%
          </div>
        </div>
      )}

      {/* Точное меню OpenBox по референсу - левый верхний угол */}
      {showMenu && isPoweredOn && (
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 50,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            animation: "slideInFromLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Желтая иконка с шестеренкой */}
          <div
            style={{
              position: "absolute",
              left: -5,
              top: 85,
              zIndex: 15,
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                background: "#FFD700",
                border: "2px solid #E6C200",
                borderRadius: "8px",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              <FaTools size={16} color="#8B4513" />
            </div>
          </div>

          {/* Голубое меню точно по референсу */}
          <div
            style={{
              background: "linear-gradient(135deg, #5DADE2 0%, #3498DB 100%)",
              border: "2px solid #2980B9",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              width: 180,
              padding: "12px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {menuItems.map((item, idx) => (
                <div
                  key={item.label}
                  style={{
                    background:
                      idx === selectedIndex
                        ? "rgba(255,255,255,0.9)"
                        : "transparent",
                    color: idx === selectedIndex ? "#2C3E50" : "#FFFFFF",
                    fontWeight: idx === selectedIndex ? 600 : 500,
                    fontSize: 13,
                    fontFamily: "Arial, sans-serif",
                    padding: "6px 16px",
                    margin: "1px 8px",
                    borderRadius: idx === selectedIndex ? "4px" : "0",
                    transition: "all 0.2s ease",
                    textAlign: "left",
                    cursor: "pointer",
                    textShadow:
                      idx === selectedIndex
                        ? "none"
                        : "0 1px 2px rgba(0,0,0,0.3)",
                  }}
                  onClick={() => {
                    setSelectedIndex(idx);
                    handleMenuSelect(idx);
                  }}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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

        @keyframes scanlines {
          0% { 
            transform: translateY(-2px);
          }
          100% { 
            transform: translateY(2px);
          }
        }

        @keyframes logoGlow {
          0% { 
            text-shadow: 0 0 20px rgba(255,255,255,0.5);
          }
          100% { 
            text-shadow: 0 0 30px rgba(25,118,210,0.8), 0 0 40px rgba(25,118,210,0.6);
          }
        }
      `}</style>
    </div>
  );
}
