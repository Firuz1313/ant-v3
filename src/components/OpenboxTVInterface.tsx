import React, { useState, useEffect } from "react";
import { FaTools } from "react-icons/fa";

const menuItems = [
  { label: "Установки", selected: true },
  { label: "Редактор Каналов" },
  { label: "Настройка Системы" },
  { label: "Приложение" },
  { label: "Условный Доступ" },
];

export default function OpenboxTVInterface() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(true);

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
          rgba(0, 255, 0, 0.01) 2px,
          rgba(0, 255, 0, 0.01) 4px
        )`,
          pointerEvents: "none",
          zIndex: 5,
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
            animation: "slideInFromLeft 0.5s ease-out",
          }}
        >
          {/* Иконка инструментов над меню */}
          <div
            style={{
              marginBottom: 8,
              marginLeft: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "linear-gradient(145deg, #f5f5f5 0%, #e0e0e0 100%)",
                border: "2px solid #bdbdbd",
                borderRadius: "50%",
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              <FaTools size={24} color="#1976d2" />
            </div>
          </div>

          {/* Меню с точным дизайном как на изображении */}
          <div
            style={{
              background: "linear-gradient(145deg, #e3f2fd 0%, #bbdefb 100%)",
              border: "3px solid #90caf9",
              borderRadius: 12,
              minWidth: 220,
              maxWidth: 240,
              padding: "12px 0",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
              position: "relative",
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
                borderRadius: 8,
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                pointerEvents: "none",
              }}
            />

            {menuItems.map((item, idx) => (
              <div
                key={item.label}
                style={{
                  background: item.selected
                    ? "linear-gradient(145deg, #1976d2 0%, #1565c0 100%)"
                    : "transparent",
                  color: item.selected ? "#ffffff" : "#263238",
                  fontWeight: item.selected ? 700 : 600,
                  fontSize: 16,
                  padding: "8px 20px",
                  margin: "2px 12px",
                  borderRadius: 6,
                  border: item.selected ? "2px solid #0d47a1" : "none",
                  boxShadow: item.selected
                    ? "0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)"
                    : "none",
                  textShadow: item.selected
                    ? "0 1px 2px rgba(0,0,0,0.3)"
                    : "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 1,
                }}
                onMouseEnter={() => !item.selected && setSelectedIndex(idx)}
              >
                {item.label}
              </div>
            ))}
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

        @keyframes tvFlicker {
          0%, 100% { 
            filter: brightness(1) contrast(1);
          }
          50% { 
            filter: brightness(1.05) contrast(1.1);
          }
        }

        /* Добавляем анимацию мерцания к основному контейнеру */
        .tv-flicker {
          animation: tvFlicker 0.1s ease-in-out;
        }
      `}</style>
    </div>
  );
}
