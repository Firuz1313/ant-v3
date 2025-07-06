import { useParams, Routes, Route } from "react-router-dom";
import RemoteControl from "../components/RemoteControl";
import TVScreen from "../components/TVScreen";
import NotFound from "./NotFound";
import React, { useState } from 'react';
import ErrorSelectionPage from './ErrorSelectionPage';
import ErrorDetailPage from './ErrorDetailPage';
import { useIsMobile } from '../hooks/use-mobile';

const devices = [
  {
    id: "openbox",
    name: "OpenBox",
    description: "Professional-grade receiver with advanced features",
  },
  {
    id: "openbox-gold",
    name: "OpenBox Gold",
    description: "Premium model with enhanced performance",
  },
  {
    id: "uclan",
    name: "Uclan",
    description: "Reliable and efficient digital receiver",
  },
  {
    id: "hdbox",
    name: "HDBox",
    description: "Feature-rich PVR with recording capabilities",
  },
];

export default function DeviceRemotePage({ panelBtnFromRemote, onRemoteButton }: { panelBtnFromRemote?: number | null, onRemoteButton?: (key: string) => void }) {
  const { deviceId } = useParams();
  const selectedDevice = devices.find((d) => d.id === deviceId);
  const [localPanelBtn, setLocalPanelBtn] = useState<number | null>(null);
  const [selectedForDelete, setSelectedForDelete] = useState<Set<number>>(new Set());
  const isMobile = useIsMobile();
  // Адаптивные размеры ТВ
  let tvWidth = 850;
  let tvHeight = 430;
  if (typeof window !== 'undefined') {
    if (isMobile) {
      tvWidth = Math.min(window.innerWidth * 0.98, 370);
      tvHeight = tvWidth * (430 / 850);
    } else {
      tvWidth = Math.min(750, window.innerWidth * 0.7);
      tvHeight = tvWidth * (330 / 750);
    }
  }

  React.useEffect(() => {
    if (panelBtnFromRemote) setLocalPanelBtn(panelBtnFromRemote);
  }, [panelBtnFromRemote]);

  // Слушаем кастомное событие OK с виртуального пульта
  React.useEffect(() => {
    function onOk() {
      // Здесь можно пробросить событие дальше, если нужно
      // Например, window.dispatchEvent(new CustomEvent('device-remote-ok'));
    }
    window.addEventListener('virtual-remote-ok', onOk);
    return () => window.removeEventListener('virtual-remote-ok', onOk);
  }, []);

  function handleRemoteButton(key: string) {
    if (onRemoteButton) onRemoteButton(key);
  }

  if (!selectedDevice) return <NotFound />;

  return (
    <div style={{ background: "#2563eb", minHeight: "100vh", padding: 0, position: 'relative', overflow: 'hidden' }}>
      {/* Градиентный анимированный фон */}
      <div style={{
        position: 'fixed',
        zIndex: 0,
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(120deg, #1e293b 0%, #2563eb 60%, #3386ff 100%)',
        animation: 'gradient-move 12s ease-in-out infinite alternate',
        backgroundSize: '200% 200%',
        pointerEvents: 'none',
      }} />
      {/* Верхнее меню */}
      <div style={{ background: "rgba(10,26,79,0.98)", padding: isMobile ? "12px 0 6px 0" : "16px 0 8px 0", borderBottom: "2px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10, boxShadow: '0 2px 12px #0004' }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: isMobile ? 12 : 32 }}>
          <img src="/favicon.ico" alt="АНТ" style={{ width: 36, height: 36, borderRadius: 8, marginRight: 12, boxShadow: '0 2px 8px #0006' }} />
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 22, letterSpacing: 1, textShadow: '0 2px 8px #0008' }}>АНТ</span>
          {!isMobile && (
            <nav style={{ display: "flex", gap: 18, marginLeft: 32 }}>
              <a className="nav-button" href="/" style={{ fontSize: 16, padding: '7px 18px' }}>Главная</a>
              <a className="nav-button" href="/devices" style={{ fontSize: 16, padding: '7px 18px' }}>Приставки</a>
              <a className="nav-button" href="/support" style={{ fontSize: 16, padding: '7px 18px' }}>Поддержка</a>
            </nav>
          )}
        </div>
        <div style={{ display: "flex", gap: 10, marginRight: isMobile ? 10 : 32 }}>
          {devices.map((d) => (
            <button key={d.id} className="nav-button" style={{ fontSize: 15, padding: isMobile ? '6px 10px' : '6px 18px', borderRadius: 16, marginLeft: 4, background: selectedDevice?.id === d.id ? 'linear-gradient(90deg,#3386ff,#2563eb)' : undefined, opacity: selectedDevice?.id === d.id ? 1 : 0.85 }}>{d.name}</button>
          ))}
        </div>
      </div>
      {/* Карточка приставки */}
      <div className="device-card animate-gradient-move" style={{ background: 'rgba(30,58,138,0.98)', border: "2px solid #fff3", borderRadius: 20, padding: isMobile ? 18 : 28, minWidth: 220, color: "#fff", boxShadow: "0 8px 32px #0003", margin: '8px auto 0', maxWidth: 420, position: 'relative', zIndex: 2, transition: 'box-shadow 0.3s, transform 0.3s' }}>
        <div style={{ fontWeight: 700, fontSize: isMobile ? 18 : 22, marginBottom: 8, letterSpacing: 0.2 }}>{selectedDevice?.name}</div>
        <div style={{ fontSize: isMobile ? 14 : 15, opacity: 0.85, marginBottom: 12 }}>{selectedDevice?.description}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 10, height: 10, background: "#22c55e", borderRadius: 5, display: "inline-block", boxShadow: '0 0 8px #22c55e88' }} />
          <span style={{ fontSize: 14, color: "#a7f3d0" }}>Подключено</span>
        </div>
      </div>
      {/* Один комплект ТВ и пульта в основном контенте */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: isMobile ? 24 : 56,
        marginTop: 8,
        paddingBottom: isMobile ? 18 : 48,
        width: '100%',
        position: 'relative',
        zIndex: 2,
        animation: 'fade-in 0.7s cubic-bezier(.4,0,.2,1)',
      }}>
        <div style={{ boxShadow: '0 8px 32px #0004', borderRadius: 24, background: 'rgba(30,58,138,0.92)', padding: isMobile ? 8 : 18, transition: 'box-shadow 0.3s, background 0.3s', marginBottom: isMobile ? 18 : 0 }}>
          <TVScreen panelBtnFromRemote={localPanelBtn} width={tvWidth} height={tvHeight} />
        </div>
        {!isMobile && (
          <div style={{ boxShadow: '0 8px 32px #0004', borderRadius: 24, background: 'rgba(30,58,138,0.92)', padding: 12, transition: 'box-shadow 0.3s, background 0.3s' }}>
            <RemoteControl onButtonClick={handleRemoteButton} />
          </div>
        )}
      </div>
      <Routes>
        <Route path="/error-select" element={<ErrorSelectionPage />} />
        <Route path="/error/:errorKey/:subKey?" element={<ErrorDetailPage />} />
      </Routes>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
} 