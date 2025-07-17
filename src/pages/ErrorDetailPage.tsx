import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { errorList } from "../data/errors";
import TVScreen from "../components/TVScreen";
import RemoteControl from "../components/RemoteControl";
import { useTVControl } from "../context/TVControlContext";

export default function ErrorDetailPage() {
  const { errorKey, subKey, deviceId } = useParams();
  const navigate = useNavigate();
  const error = errorList.find((e) => e.key === errorKey);
  const subError = error?.subErrors?.find((s) => s.key === subKey);
  const { tvState } = useTVControl();
  const [scale, setScale] = useState(1);

  // Получаем выбранную приставку из localStorage
  // const deviceId = typeof window !== 'undefined' ? localStorage.getItem('selectedDeviceId') : undefined;

  // Адаптивное масштабирование для больших экранов
  useEffect(() => {
    const updateScale = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Базовые размеры компонентов
      const tvWidth = 900;
      const remoteWidth = 200;
      const totalWidth = tvWidth + remoteWidth + 100; // 100px для отступов

      // Вычисляем масштаб для больших экранов
      if (screenWidth > 1400) {
        const scaleX = (screenWidth * 0.8) / totalWidth;
        const scaleY = (screenHeight * 0.7) / 600; // 600px примерная высота
        const newScale = Math.min(scaleX, scaleY, 1.4); // Максимальный масштаб 1.4
        setScale(Math.max(newScale, 0.8)); // Минимальный масштаб 0.8
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  if (!error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#23272e] to-[#181c20] text-white">
        <h2 className="text-2xl font-bold mb-4">Ошибка не найдена</h2>
        <button
          className="mt-2 px-6 py-2 rounded bg-[#23272e] hover:bg-[#2b3a67] text-white"
          onClick={() => navigate("/error-select")}
        >
          Назад к списку ошибок
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-2 px-4 md:py-6"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Неоновый, мягкий, технологичный фон */}
      <div
        style={{
          position: "fixed",
          zIndex: 0,
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(120deg, #1e293b 0%, #23272e 60%, #2563eb 100%)",
          opacity: 0.98,
          pointerEvents: "none",
          transition: "background 1.2s",
        }}
      />
      {/* Геометрические и неоновые элементы */}
      <svg
        width="100vw"
        height="100vh"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.22,
        }}
      >
        <defs>
          <radialGradient id="neon1" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#00eaff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="neon2" cx="80%" cy="20%" r="60%">
            <stop offset="0%" stopColor="#3386ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="30%" cy="20%" r="320" fill="url(#neon1)" />
        <ellipse cx="80%" cy="80%" rx="260" ry="120" fill="url(#neon2)" />
        <rect
          x="60%"
          y="10%"
          width="180"
          height="180"
          rx="60"
          fill="#2563eb"
          opacity="0.12"
        />
      </svg>
      {/* Анимация неонового свечения */}
      <style>{`
        @keyframes neon-fade {
          0% { filter: blur(32px) brightness(1.1); opacity: 0.7; }
          50% { filter: blur(48px) brightness(1.3); opacity: 1; }
          100% { filter: blur(32px) brightness(1.1); opacity: 0.7; }
        }
        .neon-anim {
          animation: neon-fade 4.5s ease-in-out infinite alternate;
        }
                .tv-remote-container {
          transform: scale(${scale});
          transform-origin: center center;
          transition: transform 0.3s ease-in-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .tv-remote-container {
            flex-direction: row;
            gap: 40px;
          }
        }
        @media (min-width: 1024px) {
          .tv-remote-container {
            gap: 60px;
          }
                  }
      `}</style>
      <div
        className="relative w-full max-w-3xl mx-auto flex flex-col items-center"
        style={{ marginTop: 24 }}
      >
        <button
          className="px-5 py-2 rounded bg-[#23272e] hover:bg-[#2b3a67] text-white font-medium whitespace-nowrap self-start absolute left-0 top-0 md:left-[-24px] mobile:static mobile:mb-4 interactive-element ripple-effect"
          onClick={() => navigate(`/${deviceId}/error-select`)}
        >
          ← К списку ошибок
        </button>
        <h1 className="text-2xl font-bold text-white text-center w-full">
          {subError ? subError.title : error.title}
        </h1>
        <style>{`
          @media (max-width: 768px) {
            .error-back-btn { position: static !important; margin-bottom: 10px; }
          }
        `}</style>
      </div>

      {/* Адаптивный контейнер для ТВ и пульта */}
      <div className="w-full flex justify-center items-center">
        <div className="tv-remote-container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TVScreen deviceId={deviceId} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <RemoteControl />
          </div>
        </div>
      </div>
    </div>
  );
}
