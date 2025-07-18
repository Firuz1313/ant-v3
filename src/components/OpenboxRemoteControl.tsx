import React, { useState, useEffect } from "react";
import {
  FaPowerOff,
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaSquare,
  FaCircle,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import { useTVControl } from "../context/TVControlContext";

interface RemoteProps {
  onButtonClick?: (key: string) => void;
  highlight?: { key?: string };
  width?: number;
  height?: number;
}

export default function OpenboxRemoteControl({
  onButtonClick,
  highlight,
  width = 320,
  height = 600,
}: RemoteProps) {
  const [pressed, setPressed] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const { sendCommand } = useTVControl();

  const handlePress = (key: string) => {
    setPressed(key);
    if (onButtonClick) onButtonClick(key);

    // Отправляем событие для синхронизации с ТВ интерфейсом
    window.dispatchEvent(
      new CustomEvent("remote-command", {
        detail: { type: "button-press", key },
      }),
    );

    // Управление ТВ с пульта
    switch (key) {
      case "power":
        sendCommand("power");
        break;
      case "ok":
        sendCommand("ok");
        break;
      case "exit":
        sendCommand("exit");
        break;
      case "up":
        sendCommand("up");
        break;
      case "down":
        sendCommand("down");
        break;
      case "left":
        sendCommand("left");
        break;
      case "right":
        sendCommand("right");
        break;
      case "menu":
        sendCommand("menu");
        break;
      default:
        break;
    }

    setTimeout(() => setPressed(null), 150);
  };

  const scale = Math.min(width / 180, height / 480);

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg
        width={180 * scale}
        height={480 * scale}
        viewBox="0 0 180 480"
        style={{
          filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.4))",
        }}
      >
        <defs>
          {/* Градиенты для корпуса */}
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="30%" stopColor="#2d3748" />
            <stop offset="70%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#0a0f15" />
          </linearGradient>

          {/* Улучшенный градиент для кнопок - более объемный */}
          <linearGradient
            id="buttonGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#5a6b7d" />
            <stop offset="20%" stopColor="#4a5568" />
            <stop offset="60%" stopColor="#2d3748" />
            <stop offset="100%" stopColor="#1a202c" />
          </linearGradient>

          {/* Градиент для нажатых кнопок - более глубокий */}
          <linearGradient
            id="pressedGradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="80%" stopColor="#334155" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Градиент для красной кнопки питания */}
          <radialGradient id="powerGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="70%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>

          {/* Цветные градиенты */}
          <radialGradient id="redGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>

          <radialGradient id="greenGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </radialGradient>

          <radialGradient id="yellowGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </radialGradient>

          <radialGradient id="blueGradient" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </radialGradient>

          {/* Фильтр для внутренней тени */}
          <filter id="innerShadow">
            <feOffset dx="0" dy="2" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feFlood floodColor="#000000" floodOpacity="0.3" />
            <feComposite in2="offset-blur" operator="in" />
          </filter>

          {/* Фильтр для объемности кнопок */}
          <filter
            id="buttonShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor="#000000"
              floodOpacity="0.4"
            />
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1"
              floodColor="#ffffff"
              floodOpacity="0.1"
            />
          </filter>

          {/* Фильтр для нажатых кнопок */}
          <filter
            id="pressedShadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1"
              floodColor="#000000"
              floodOpacity="0.6"
            />
          </filter>
        </defs>

        {/* Изогнутый корпус пульта */}
        <path
          d="M 30 20 
             C 30 10, 40 0, 50 0
             L 130 0
             C 140 0, 150 10, 150 20
             L 150 440
             C 150 460, 140 470, 130 470
             L 125 470
             C 115 475, 105 480, 90 480
             C 75 480, 65 475, 55 470
             L 50 470
             C 40 470, 30 460, 30 440
             Z"
          fill="url(#bodyGradient)"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />

        {/* Кнопка питания */}
        <g>
          <circle
            cx="50"
            cy="35"
            r="12"
            fill={
              pressed === "power"
                ? "url(#pressedGradient)"
                : "url(#powerGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1"
            style={{ cursor: "pointer", transformOrigin: "50 35" }}
            onMouseDown={() => handlePress("power")}
            transform={pressed === "power" ? "scale(0.95)" : "scale(1)"}
          />
          <text
            x="50"
            y="40"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
          >
            ⏻
          </text>
        </g>

        {/* TV/RADIO и Звук кнопки */}
        <g>
          <rect
            x="75"
            y="25"
            width="25"
            height="12"
            rx="6"
            fill={
              pressed === "tvradio"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("tvradio")}
          />
          <text
            x="87.5"
            y="33"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            TV/RADIO
          </text>

          <circle
            cx="130"
            cy="35"
            r="12"
            fill={
              pressed === "mute"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer", transformOrigin: "130 35" }}
            onMouseDown={() => handlePress("mute")}
            transform={pressed === "mute" ? "scale(0.95)" : "scale(1)"}
          />
          <text x="130" y="40" textAnchor="middle" fill="white" fontSize="12">
            🔇
          </text>
        </g>

        {/* Цифровые кнопки 1-9 */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => {
          const row = Math.floor(index / 3);
          const col = index % 3;
          const x = 50 + col * 30;
          const y = 70 + row * 25;

          return (
            <g key={num}>
              <ellipse
                cx={x}
                cy={y}
                rx="12"
                ry="10"
                fill={
                  pressed === num.toString()
                    ? "url(#pressedGradient)"
                    : "url(#buttonGradient)"
                }
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                style={{ cursor: "pointer", transformOrigin: `${x} ${y}` }}
                onMouseDown={() => handlePress(num.toString())}
                transform={
                  pressed === num.toString() ? "scale(0.95)" : "scale(1)"
                }
              />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                {num}
              </text>
            </g>
          );
        })}

        {/* LANG, 0, LIST */}
        <g>
          <rect
            x="38"
            y="145"
            width="20"
            height="12"
            rx="6"
            fill={
              pressed === "lang"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("lang")}
          />
          <text
            x="48"
            y="153"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            LANG
          </text>

          <ellipse
            cx="80"
            cy="151"
            rx="12"
            ry="10"
            fill={
              pressed === "0" ? "url(#pressedGradient)" : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer", transformOrigin: "80 151" }}
            onMouseDown={() => handlePress("0")}
            transform={pressed === "0" ? "scale(0.95)" : "scale(1)"}
          />
          <text
            x="80"
            y="155"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
          >
            0
          </text>

          <rect
            x="122"
            y="145"
            width="20"
            height="12"
            rx="6"
            fill={
              pressed === "list"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("list")}
          />
          <text
            x="132"
            y="153"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            LIST
          </text>
        </g>

        {/* BACK, INFO */}
        <g>
          <rect
            x="48"
            y="170"
            width="20"
            height="12"
            rx="6"
            fill={
              pressed === "back"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("back")}
          />
          <text
            x="58"
            y="178"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            BACK
          </text>

          <rect
            x="112"
            y="170"
            width="20"
            height="12"
            rx="6"
            fill={
              pressed === "info"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("info")}
          />
          <text
            x="122"
            y="178"
            textAnchor="middle"
            fill="white"
            fontSize="6"
            fontWeight="bold"
          >
            INFO
          </text>
        </g>

        {/* MENU, EXIT */}
        <g>
          <circle
            cx="48"
            cy="200"
            r="15"
            fill={
              pressed === "menu"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer", transformOrigin: "48 200" }}
            onMouseDown={() => handlePress("menu")}
            transform={pressed === "menu" ? "scale(0.95)" : "scale(1)"}
          />
          <text
            x="48"
            y="205"
            textAnchor="middle"
            fill="white"
            fontSize="7"
            fontWeight="bold"
          >
            MENU
          </text>

          <circle
            cx="132"
            cy="200"
            r="15"
            fill={
              pressed === "exit"
                ? "url(#pressedGradient)"
                : "url(#buttonGradient)"
            }
            stroke="rgba(255,255,255,0.1)"
            style={{ cursor: "pointer", transformOrigin: "132 200" }}
            onMouseDown={() => handlePress("exit")}
            transform={pressed === "exit" ? "scale(0.95)" : "scale(1)"}
          />
          <text
            x="132"
            y="205"
            textAnchor="middle"
            fill="white"
            fontSize="7"
            fontWeight="bold"
          >
            EXIT
          </text>
        </g>

        {/* Навигационный круг с OK — новая разметка с изогнутыми кнопками */}
        <g>
          {/* Внешний эллипс навигационного круга */}
          <ellipse
            cx="90"
            cy="245"
            rx="36"
            ry="32"
            fill="url(#buttonGradient)"
            stroke="rgba(255,255,255,0.13)"
            strokeWidth="2"
          />

          {/* Кнопка ВВЕРХ (кривая) */}
          <path
            d="M70,225 Q90,210 110,225 Q100,230 80,230 Q70,225 70,225 Z"
            fill={pressed === "up" ? "url(#pressedGradient)" : "url(#buttonGradient)"}
            stroke="rgba(255,255,255,0.18)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("up")}
          />
          <text x="90" y="222" textAnchor="middle" fill="white" fontSize="10">▲</text>

          {/* Кнопка ВНИЗ (кривая) */}
          <path
            d="M70,265 Q90,280 110,265 Q100,260 80,260 Q70,265 70,265 Z"
            fill={pressed === "down" ? "url(#pressedGradient)" : "url(#buttonGradient)"}
            stroke="rgba(255,255,255,0.18)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("down")}
          />
          <text x="90" y="278" textAnchor="middle" fill="white" fontSize="10">▼</text>

          {/* Кнопка ВЛЕВО (кривая) */}
          <path
            d="M60,235 Q55,245 60,255 Q70,250 70,240 Q60,235 60,235 Z"
            fill={pressed === "left" ? "url(#pressedGradient)" : "url(#buttonGradient)"}
            stroke="rgba(255,255,255,0.18)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("left")}
          />
          <text x="62" y="247" textAnchor="middle" fill="white" fontSize="10">◀</text>

          {/* Кнопка ВПРАВО (кривая) */}
          <path
            d="M120,235 Q125,245 120,255 Q110,250 110,240 Q120,235 120,235 Z"
            fill={pressed === "right" ? "url(#pressedGradient)" : "url(#buttonGradient)"}
            stroke="rgba(255,255,255,0.18)"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("right")}
          />
          <text x="118" y="247" textAnchor="middle" fill="white" fontSize="10">▶</text>

          {/* Центральная кнопка OK (овальная) */}
          <ellipse
            cx="90"
            cy="245"
            rx="18"
            ry="14"
            fill={pressed === "ok" ? "url(#pressedGradient)" : "url(#buttonGradient)"}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="2"
            style={{ cursor: "pointer" }}
            onMouseDown={() => handlePress("ok")}
          />
          <text
            x="90"
            y="250"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
          >OK</text>
        </g>

        {/* VOL и PAGE кнопки */}
        <g>
          <text x="30" y="295" fill="white" fontSize="6">
            • • VOL • • •
          </text>
          <text x="120" y="295" fill="white" fontSize="6">
            • • • PAGE • •
          </text>
        </g>

        {/* Цветные кнопки */}
        <g>
          {/* Красная */}
          <circle
            cx="50"
            cy="320"
            r="12"
            fill={
              pressed === "aspect"
                ? "url(#pressedGradient)"
                : "url(#redGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer", transformOrigin: "50 320" }}
            onMouseDown={() => handlePress("aspect")}
            transform={pressed === "aspect" ? "scale(0.95)" : "scale(1)"}
          />
          <text x="50" y="338" textAnchor="middle" fill="white" fontSize="6">
            ASPECT
          </text>

          {/* Зеленая */}
          <circle
            cx="75"
            cy="320"
            r="12"
            fill={
              pressed === "epg"
                ? "url(#pressedGradient)"
                : "url(#greenGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer", transformOrigin: "75 320" }}
            onMouseDown={() => handlePress("epg")}
            transform={pressed === "epg" ? "scale(0.95)" : "scale(1)"}
          />
          <text x="75" y="338" textAnchor="middle" fill="white" fontSize="6">
            EPG
          </text>

          {/* Желтая */}
          <circle
            cx="105"
            cy="320"
            r="12"
            fill={
              pressed === "option"
                ? "url(#pressedGradient)"
                : "url(#yellowGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer", transformOrigin: "105 320" }}
            onMouseDown={() => handlePress("option")}
            transform={pressed === "option" ? "scale(0.95)" : "scale(1)"}
          />
          <text x="105" y="338" textAnchor="middle" fill="white" fontSize="6">
            OPTION
          </text>

          {/* Синяя */}
          <circle
            cx="130"
            cy="320"
            r="12"
            fill={
              pressed === "sleep"
                ? "url(#pressedGradient)"
                : "url(#blueGradient)"
            }
            stroke="rgba(255,255,255,0.2)"
            style={{ cursor: "pointer", transformOrigin: "130 320" }}
            onMouseDown={() => handlePress("sleep")}
            transform={pressed === "sleep" ? "scale(0.95)" : "scale(1)"}
          />
          <text x="130" y="338" textAnchor="middle" fill="white" fontSize="6">
            SLEEP
          </text>
        </g>

        {/* Медиа кнопки - первая строка */}
        <g>
          {[
            { key: "rewind", x: 45, icon: "⏪" },
            { key: "pause", x: 70, icon: "⏸" },
            { key: "play", x: 95, icon: "▶" },
            { key: "forward", x: 120, icon: "⏩" },
          ].map(({ key, x, icon }) => (
            <g key={key}>
              <rect
                x={x - 8}
                y="355"
                width="16"
                height="12"
                rx="6"
                fill={
                  pressed === key
                    ? "url(#pressedGradient)"
                    : "url(#buttonGradient)"
                }
                stroke="rgba(255,255,255,0.1)"
                style={{ cursor: "pointer", transformOrigin: `${x} 361` }}
                onMouseDown={() => handlePress(key)}
                transform={pressed === key ? "scale(0.95)" : "scale(1)"}
              />
              <text x={x} y="363" textAnchor="middle" fill="white" fontSize="8">
                {icon}
              </text>
            </g>
          ))}
        </g>

        {/* Медиа кнопки - вторая строка */}
        <g>
          {[
            { key: "prev", x: 45, icon: "⏮" },
            { key: "rec", x: 70, icon: "⏺" },
            { key: "stop", x: 95, icon: "⏹" },
            { key: "next", x: 120, icon: "⏭" },
          ].map(({ key, x, icon }) => (
            <g key={key}>
              <rect
                x={x - 8}
                y="375"
                width="16"
                height="12"
                rx="6"
                fill={
                  pressed === key
                    ? "url(#pressedGradient)"
                    : "url(#buttonGradient)"
                }
                stroke="rgba(255,255,255,0.1)"
                style={{ cursor: "pointer", transformOrigin: `${x} 381` }}
                onMouseDown={() => handlePress(key)}
                transform={pressed === key ? "scale(0.95)" : "scale(1)"}
              />
              <text x={x} y="383" textAnchor="middle" fill="white" fontSize="8">
                {icon}
              </text>
            </g>
          ))}
        </g>

        {/* Логотип AHT-MINI */}
        <text
          x="90"
          y="410"
          textAnchor="middle"
          fill="#888888"
          fontSize="8"
          fontWeight="bold"
        >
          AHT-MINI
        </text>

        {/* Логотип OPENBOX */}
        <text
          x="90"
          y="425"
          textAnchor="middle"
          fill="#888888"
          fontSize="12"
          fontWeight="bold"
        >
          OPENBOX®
        </text>

        {/* SUHROB JON */}
        <text x="90" y="440" textAnchor="middle" fill="#666666" fontSize="6">
          SUHROB JON
        </text>
      </svg>
    </div>
  );
}
