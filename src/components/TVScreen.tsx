import React, { useState, useEffect } from "react";
import { FaYoutube, FaCog, FaWifi, FaCloud, FaTv, FaAppStore, FaInfoCircle, FaMagic, FaSatelliteDish, FaCogs } from "react-icons/fa";
import { MdSettings, MdApps, MdUpdate, MdInfo, MdNetworkWifi } from "react-icons/md";
import { useTVControl, CHANNEL_EDITOR_ITEMS_LIST, SETTINGS_MENU_ITEMS, INSTALL_MENU_ITEMS, LANGUAGE_SETTINGS_ITEMS, AB_SETTINGS_ITEMS, ACCESS_CARD_ITEMS } from '../context/TVControlContext';
import { DEFAULT_CHANNEL_LIST } from '../context/TVControlContext';
import RealisticTVFrame from './RealisticTVFrame';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import ChannelListModal from './ChannelListModal';
import { ANTENNA_SETUP_ITEMS } from '../data/antennaSetup';
import { SEARCH_SETTINGS_ITEMS } from '../data/searchSettings';

const IOSSettingsIcon = (
  <span style={{
    display: "inline-block",
    background: "linear-gradient(135deg, #e0e0e0 60%, #b0b0b0 100%)",
    borderRadius: "50%",
    boxShadow: "0 2px 8px #0002",
    padding: 2,
  }}>
    <FaCog color="#666" size={24} style={{ filter: "drop-shadow(0 1px 1px #fff8)" }} />
  </span>
);

const apps = [
  { name: "Редактор каналов", icon: <div style={{display: "flex", alignItems: "center", gap: "6px", height: 70}}><FaTv color="#2196f3" size={70} /><FaMagic color="#9c27b0" size={54} /></div> },
  { name: "Настройки", icon: <span style={{display: "flex", background: "linear-gradient(135deg, #e0e0e0 60%, #b0b0b0 100%)", borderRadius: "50%", boxShadow: "0 2px 8px #0002", width: 70, height: 70, alignItems: 'center', justifyContent: 'center'}}><FaCog color="#666" size={54} style={{ filter: "drop-shadow(0 1px 1px #fff8)" }} /></span> },
  { name: "Установка", icon: <FaSatelliteDish color="#4caf50" size={70} /> },
  { name: "Media Center", icon: <FaAppStore color="#00bcd4" size={70} /> },
  { name: "YouTube", icon: <FaYoutube color="#e53935" size={70} /> },
  { name: "IPTV", icon: <FaTv color="#2196f3" size={70} /> },
  { name: "Обновление HTTP", icon: <MdUpdate color="#ff9800" size={70} /> },
  { name: "APP", icon: <MdApps color="#9c27b0" size={70} /> },
  { name: "Поиск", icon: <FaInfoCircle color="#fff" size={70} /> },
  { name: "Сеть Wi-Fi", icon: <MdNetworkWifi color="#2196f3" size={70} /> },
  { name: "Оператор", icon: <FaWifi color="#00e676" size={70} /> },
  { name: "Информация", icon: <MdInfo color="#fff" size={70} /> },
];

const RADIO_CHANNELS = [
  'Радио 1', 'Радио 2', 'Радио 3', 'Радио 4', 'Радио 5', 'Радио 6',
  'Радио 7', 'Радио 8', 'Радио 9', 'Радио 10', 'Радио 11', 'Радио 12',
];

function AIGlobe3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ width: '100%', height: '100%', background: 'transparent', borderRadius: 7 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <mesh>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshStandardMaterial color="#00eaff" wireframe opacity={0.7} transparent />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshStandardMaterial color="#fff" wireframe opacity={0.15} transparent />
      </mesh>
      <Stars radius={2.5} depth={30} count={1200} factor={0.08} saturation={0.8} fade speed={2} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  );
}

const ConaxInfoModal = ({ onClose }: { onClose: () => void }) => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '/');
  const timeStr = now.toTimeString().slice(0, 5);
  return (
    <div style={{
      position: 'absolute',
      left: 32,
      top: 32,
      right: 32,
      bottom: 64,
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'auto',
    }}>
      <div style={{
        background: '#0a1a2a',
        borderRadius: 16,
        border: '2px solid #fff',
        boxShadow: '0 4px 24px #000a',
        width: 820,
        minHeight: 380,
        padding: '18px 0',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Верхняя панель — как у ChannelListModal */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#174080', borderTopLeftRadius: 14, borderTopRightRadius: 14, padding: '5px 14px', justifyContent: 'space-between', minHeight: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FaCog size={34} color="#fff" style={{marginRight: 14}} />
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 0.5, textShadow: '0 2px 12px #3386ff88' }}>Conax Information</span>
          </div>
          <span style={{ color: '#fff', fontSize: 13 }}>{dateStr} {timeStr}</span>
        </div>
        {/* Таблица */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, background: '#102040' }}>
          <div style={{ width: 700, margin: '0 auto', marginTop: 36, marginBottom: 36, border: 'none' }}>
            {[
              ['Interface Version', '0x40'],
              ['Card Number', '021 0001 0241-4'],
              ['Number of Sessions', '2'],
              ['Настройки языка', '44'],
              ['CA_SYS_ID', '0x0b00'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', fontSize: 20, color: '#fff', minHeight: 44, height: 44, borderBottom: '1px solid #335', fontWeight: 500 }}>
                <span style={{ flex: 1, textAlign: 'left', paddingLeft: 32 }}>{label}</span>
                <span style={{ flex: 1, textAlign: 'right', paddingRight: 32 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubscriptionStatusModal = ({ onClose }: { onClose: () => void }) => {
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '/');
  const timeStr = now.toTimeString().slice(0, 5);
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);
  return (
    <div
      style={{
        position: 'absolute',
        left: 32,
        top: 32,
        right: 32,
        bottom: 64,
        zIndex: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscription-status-title"
      tabIndex={0}
    >
      <div style={{
        background: '#0a1a2a',
        borderRadius: 16,
        border: '2px solid #fff',
        boxShadow: '0 4px 24px #000a',
        width: 820,
        minHeight: 380,
        padding: '18px 0',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Верхняя панель — как у ChannelListModal */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#174080', borderTopLeftRadius: 14, borderTopRightRadius: 14, padding: '5px 14px', justifyContent: 'space-between', minHeight: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <FaCog size={34} color="#fff" style={{marginRight: 14}} />
            <span id="subscription-status-title" style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 0.5, textShadow: '0 2px 12px #3386ff88' }}>Subscription Status</span>
          </div>
          <span style={{ color: '#fff', fontSize: 13 }}>{dateStr} {timeStr}</span>
        </div>
        {/* Таблица */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, background: '#102040' }}>
          <div style={{ width: 700, margin: '0 auto', marginTop: 36, marginBottom: 36, border: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', fontSize: 18, color: '#fff', minHeight: 44, height: 44, borderBottom: '1px solid #335', fontWeight: 700 }}>
              <span style={{ flex: 1, textAlign: 'left', paddingLeft: 32 }}>Название</span>
              <span style={{ flex: 1, textAlign: 'center' }}>Время пуска</span>
              <span style={{ flex: 1, textAlign: 'center' }}>End Time</span>
              <span style={{ flex: 1, textAlign: 'right', paddingRight: 32 }}>Entitlement</span>
            </div>
            {[
              ['АНТ', '2025.05.20', '2027.01.31', ''],
              ['АНТ', '2025.05.20', '2027.01.31', ''],
            ].map(([name, start, end, ent], i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', fontSize: 18, color: '#ffe600', minHeight: 44, height: 44, borderBottom: '1px solid #335', fontWeight: 700 }}>
                <span style={{ flex: 1, textAlign: 'left', paddingLeft: 32 }}>{name}</span>
                <span style={{ flex: 1, textAlign: 'center' }}>{start}</span>
                <span style={{ flex: 1, textAlign: 'center' }}>{end}</span>
                <span style={{ flex: 1, textAlign: 'right', paddingRight: 32 }}>{ent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function ChannelSearchProgressModal({ progress, tvList, radioList, onClose }: { progress: number, tvList: string[], radioList: string[], onClose: () => void }) {
  // Имитация поиска: увеличиваем прогресс и добавляем каналы
  const tvListContainerRef = React.useRef<HTMLDivElement>(null);
  const radioListContainerRef = React.useRef<HTMLDivElement>(null);
  const [showCompletionModal, setShowCompletionModal] = React.useState(false);
  const { sendCommand } = useTVControl();
  
  React.useEffect(() => {
    if (progress >= 100) {
      // Когда прогресс достигает 100%, показываем модальное окно завершения
      setShowCompletionModal(true);
      return;
    }
    
    const timer = setTimeout(() => {
      const nextProgress = Math.min(progress + 0.5, 100); // Ускорил до 0.5% за тик для быстрой демонстрации
      
      // Берем все каналы от 0 до 182 (или до конца списка, если он короче)
      const maxChannels = Math.min(182, DEFAULT_CHANNEL_LIST.length);
      const tvCount = Math.floor((nextProgress / 100) * maxChannels);
      const radioCount = Math.floor((nextProgress / 100) * RADIO_CHANNELS.length);
      
      const nextTV = DEFAULT_CHANNEL_LIST.slice(0, tvCount).map(ch => ch.name);
      const nextRadio = RADIO_CHANNELS.slice(0, radioCount);
      
      window.dispatchEvent(new CustomEvent('channel-search-progress', { detail: { progress: nextProgress, tv: nextTV, radio: nextRadio } }));
    }, 100); // 100мс на тик
    return () => clearTimeout(timer);
  }, [progress]);
  
  // Автоматическая прокрутка списков к последнему элементу
  React.useEffect(() => {
    if (tvListContainerRef.current && tvList.length > 0) {
      tvListContainerRef.current.scrollTop = tvListContainerRef.current.scrollHeight;
    }
    if (radioListContainerRef.current && radioList.length > 0) {
      radioListContainerRef.current.scrollTop = radioListContainerRef.current.scrollHeight;
    }
  }, [tvList.length, radioList.length]);

  // Обработчик кнопки "Хорошо" в модальном окне завершения
  const handleCompletionOk = () => {
    setShowCompletionModal(false);
    onClose();
    
    // Перенаправление на экран установки антенны
    // Сначала закрываем текущие модальные окна и открываем экран установки
    sendCommand({ type: 'custom', action: 'openInstall' });
    
    // Затем открываем подменю установки антенны с небольшой задержкой
    setTimeout(() => {
      sendCommand({ type: 'custom', action: 'openAntennaSetup' });
    }, 100);
  };

  function SolidBar({ percent, color, height = 16, border = '#fff', bg = '#1a2a4a', style = {} }: { percent: number, color: string, height?: number, border?: string, bg?: string, style?: React.CSSProperties }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', height, background: bg, borderRadius: 7, border: `1.5px solid ${border}`, overflow: 'hidden', minWidth: 0, flex: 1, ...style }}>
        <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: 7, transition: 'width 0.2s' }} />
      </div>
    );
  }
  function SegmentedBar({ percent, color, segments = 24, height = 22, bg = '#1a2a4a', border = '#00e676', activeColor }: { percent: number, color: string, segments?: number, height?: number, bg?: string, border?: string, activeColor?: string }) {
    const active = Math.round((percent / 100) * segments);
    return (
      <div style={{ display: 'flex', alignItems: 'center', height, background: bg, borderRadius: 7, border: `1.5px solid ${border}`, overflow: 'hidden', minWidth: 0, flex: 1, margin: '0 10px', boxShadow: '0 0 8px #00e67688' }}>
        {Array.from({ length: segments }).map((_, i) => (
          <div key={i} style={{
            flex: 1,
            height: '100%',
            background: i < active ? (activeColor || color) : 'transparent',
            borderRight: i < segments - 1 ? '1px solid #222' : 'none',
            transition: 'background 0.2s',
          }} />
        ))}
      </div>
    );
  }
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 200,
      width: 820, height: 410, maxHeight: 410, background: '#0a1a2a', borderRadius: 16, border: '2.5px solid #fff', boxShadow: '0 8px 32px #000a',
      display: 'flex', flexDirection: 'column', alignItems: 'stretch',
      overflow: 'hidden', // Предотвращает выход содержимого за границы
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', background: '#174080', borderTopLeftRadius: 14, borderTopRightRadius: 14, padding: '8px 24px', minHeight: 38 }}>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginRight: 18 }}>🛰️</span>
        <span style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: 0.5, textShadow: '0 2px 12px #3386ff88' }}>Поиск каналов</span>
      </div>
      {/* Info row по центру */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#102040', color: '#fff', fontSize: 15, fontWeight: 700, padding: '6px 24px', borderBottom: '1.5px solid #335' }}>
        <span style={{ textAlign: 'center', width: '100%' }}>(1 / 1) Express 80</span>
      </div>
      {/* Списки каналов */}
      <div style={{ display: 'flex', flex: 1, background: '#102040', color: '#fff', fontSize: 15, fontWeight: 500, padding: '0 24px', gap: 18, height: 200, overflow: 'hidden' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ fontWeight: 700, margin: '8px 0 4px 0', color: '#ffd600', fontSize: 15, position: 'sticky', top: 0, background: '#102040', zIndex: 1 }}>Спутник ТВ</div>
          <div 
            ref={tvListContainerRef}
            style={{ 
              overflowY: 'auto', 
              maxHeight: 180, 
              scrollBehavior: 'smooth',
              flex: 1
            }}
          >
            {tvList.map((ch, i) => (
              <div key={ch + i} style={{ display: 'flex', alignItems: 'center', minHeight: 22, borderBottom: '1px solid #223', fontSize: 15 }}>
                <span style={{ width: 38, textAlign: 'right', marginRight: 8 }}>{i + 1}</span>
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ch}</span>
                <span style={{ color: '#ffd600', marginLeft: 8 }}>$</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ fontWeight: 700, margin: '8px 0 4px 0', color: '#ffd600', fontSize: 15, position: 'sticky', top: 0, background: '#102040', zIndex: 1 }}>Радио</div>
          <div 
            ref={radioListContainerRef}
            style={{ 
              overflowY: 'auto', 
              maxHeight: 180, 
              scrollBehavior: 'smooth',
              flex: 1
            }}
          >
            {radioList.map((ch, i) => (
              <div key={ch + i} style={{ display: 'flex', alignItems: 'center', minHeight: 22, borderBottom: '1px solid #223', fontSize: 15 }}>
                <span style={{ width: 22, textAlign: 'right', marginRight: 8 }}>{i + 1}</span>
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ch}</span>
                <span style={{ color: '#ffd600', marginLeft: 8 }}>$</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Бегунки уровень и сигнал под списками, над процессом */}
      <div style={{ background: '#102040', display: 'flex', flexDirection: 'row', gap: 18, padding: '0 24px 0 24px' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', marginTop: 6, marginBottom: 2 }}>
          <span style={{ color: '#fff', fontSize: 14, width: 90 }}>Уровень</span>
          <SolidBar percent={77} color={'#2979ff'} height={16} border={'#3386ff'} style={{ margin: 0 }} />
          <span style={{ color: '#fff', fontSize: 14, width: 38, textAlign: 'right' }}>77%</span>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', marginTop: 6, marginBottom: 2 }}>
          <span style={{ color: '#fff', fontSize: 14, width: 90 }}>Сигнал</span>
          <SolidBar percent={80} color={'#3fcf4a'} height={16} border={'#3fcf4a'} style={{ margin: 0 }} />
          <span style={{ color: '#fff', fontSize: 14, width: 38, textAlign: 'right' }}>80%</span>
        </div>
      </div>
      {/* Бегунок процесс — сеточный */}
      <div style={{ background: '#102040', padding: '8px 24px 16px 24px', borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
          <span style={{ color: '#fff', fontSize: 15, width: 90 }}>Процесс</span>
          <SegmentedBar percent={progress} color={'#00e676'} segments={24} height={22} border={'#00e676'} />
          <span style={{ color: '#00e676', fontSize: 15, width: 38, textAlign: 'right' }}>{progress.toFixed(0)}%</span>
        </div>
      </div>

      {/* Модальное окно завершения поиска */}
      {showCompletionModal && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 300,
          width: 420,
          background: 'linear-gradient(180deg, #f8f8f8 0%, #e0e0e0 100%)',
          border: '2px solid #888',
          borderRadius: 10,
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          overflow: 'hidden',
        }}>
          {/* Заголовок модального окна */}
          <div style={{
            background: 'linear-gradient(180deg, #e0e0e0 0%, #d0d0d0 100%)',
            padding: '8px 16px',
            borderBottom: '1px solid #aaa',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#222',
          }}>
            Информация
          </div>
          
          {/* Содержимое модального окна */}
          <div style={{
            padding: '24px 16px',
            fontSize: 16,
            color: '#222',
            textAlign: 'center',
          }}>
            Найдено 182 каналов и 12 радио ТВ
          </div>
          
          {/* Кнопки модального окна */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '16px',
            borderTop: '1px solid #ddd',
            background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          }}>
            <button
              onClick={handleCompletionOk}
              style={{
                background: 'linear-gradient(180deg, #2979ff 0%, #2563eb 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                padding: '8px 32px',
                fontSize: 16,
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              Хорошо
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TVScreen({ panelBtnFromRemote, highlight, width = 900, height = 480 }: { panelBtnFromRemote?: number | null, highlight?: any, width?: number, height?: number }) {
  const { tvState, sendCommand } = useTVControl();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  React.useEffect(() => {
    if (panelBtnFromRemote && tvState.channelListOpen) {
      // Отправляем команду для активации кнопки панели
      sendCommand(panelBtnFromRemote.toString() as '1' | '2' | '3' | '4' | '5');
    }
  }, [panelBtnFromRemote, tvState.channelListOpen, sendCommand]);

  // Обработчик выбора канала для различных операций
  function handleChannelClick(idx: number) {
    // Устанавливаем выбранный канал и отправляем команду OK
    if (tvState.selectedChannelIndex !== idx) {
      // Сначала переходим к нужному каналу
      const steps = idx - tvState.selectedChannelIndex;
      for (let i = 0; i < Math.abs(steps); i++) {
        sendCommand(steps > 0 ? 'down' : 'up');
      }
    }
    // Затем отправляем OK для выбора канала
    sendCommand('ok');
  }

  function handlePanelBtnClick(idx: number) {
    // Отправляем команду для активации кнопки панели
    sendCommand((idx + 1).toString() as '1' | '2' | '3' | '4' | '5');
  }

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '/');
  const timeStr = now.toTimeString().slice(0, 5);

  // Обработка нажатия Exit с виртуального пульта
  React.useEffect(() => {
    function onVirtualExit() {
      if (showDeleteModal) {
        handleDeleteCancel();
        return;
      }
      if (tvState.activePanelBtn === 1 && tvState.channelsToDelete.size > 0) {
        setShowDeleteModal(true);
      }
    }
    window.addEventListener('virtual-remote-exit', onVirtualExit);
    return () => window.removeEventListener('virtual-remote-exit', onVirtualExit);
  }, [tvState.activePanelBtn, tvState.channelsToDelete, showDeleteModal]);

  function handleDeleteConfirm() {
    // Здесь будет логика удаления каналов
    setShowDeleteModal(false);
    // После удаления — выход на главный экран
    sendCommand('exit'); // Закрыть список каналов
    setTimeout(() => sendCommand('exit'), 100); // Закрыть редактор, если нужно
  }
  function handleDeleteCancel() {
    setShowDeleteModal(false);
    // После отмены — выход на главный экран
    sendCommand('exit'); // Закрыть список каналов
    setTimeout(() => sendCommand('exit'), 100); // Закрыть редактор, если нужно
  }

  // Новая подсказка для редактора каналов
  const showChannelEditorHint = highlight && highlight.step === 0 && highlight.errorKey === 'channel-editor' && highlight.subKey === 'delete';

  // Добавляю обработчик события channel-search-progress для обновления state:
  useEffect(() => {
    function onProgress(e: any) {
      if (!e.detail) return;
      sendCommand({ type: 'search-progress', ...e.detail });
    }
    window.addEventListener('channel-search-progress', onProgress);
    return () => window.removeEventListener('channel-search-progress', onProgress);
  }, [sendCommand]);

  return (
    <RealisticTVFrame width={width} height={height}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Channel List Modal */}
      {tvState.channelListOpen && (
        <>
          {/* Модалка с отступами и отдельным блоком */}
          <div style={{
            position: 'absolute',
            left: 32,
            top: 32,
            right: 32,
            bottom: 64,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}>
            <div style={{
              background: '#0a1a2a',
              borderRadius: 16,
              border: '2px solid #fff',
              boxShadow: '0 4px 24px #000a',
              width: 820,
              minHeight: 380,
              padding: '18px 0',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Верхняя панель */}
              <div style={{ display: 'flex', alignItems: 'center', background: '#174080', borderTopLeftRadius: 14, borderTopRightRadius: 14, padding: '5px 14px', justifyContent: 'space-between', minHeight: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginRight: 12, textShadow: '0 2px 12px #3386ff88' }}>📝</span>
                  <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 0.5, textShadow: '0 2px 12px #3386ff88' }}>Редактировать канал</span>
                </div>
                <span style={{ color: '#fff', fontSize: 13 }}>{dateStr} {timeStr}</span>
              </div>
              {/* Основной flex-контейнер модалки */}
              <div style={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: 120, background: '#102040' }}>
                {/* Левая колонка: панель 1-5 и список */}
                <div style={{ flex: 2, minWidth: 320, width: 320, display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '10px 0 10px 18px', background: 'rgba(0,0,0,0.04)' }}>
                  {/* Панель 1-5 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 10px 0' }}>
                    {[1,2,3,4,5].map((num, idx) => (
                      <div key={num} style={{ background: '#23272e', borderRadius: 8, padding: '2px 8px', border: '1.5px solid #174080', boxShadow: tvState.activePanelBtn === num ? '0 0 0 2px #ffd60088' : undefined, display: 'flex', alignItems: 'center', minWidth: 80, height: 36, marginBottom: 0 }}>
                        <button
                          type="button"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 5,
                            background: 'none',
                            border: 'none',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: 15,
                            padding: 0,
                            borderRadius: 4,
                            cursor: 'pointer',
                            transition: 'background 0.15s, border 0.15s',
                            outline: 'none',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'flex-start',
                          }}
                          onClick={() => handlePanelBtnClick(idx)}
                        >
                          <span style={{ fontSize: 15, fontWeight: 700, marginRight: 3 }}>{num}</span>
                          <span style={{ fontSize: 15, marginRight: 3 }}>{["️","↔️","⏭️","🔒","★"][idx]}</span>
                          <span style={{ fontSize: 11, fontWeight: 500, color: '#fff' }}>{["Del","Move","Skip","Lock","Fav"][idx]}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div style={{ color: '#fff', fontSize: 15, marginBottom: 4, marginLeft:220, fontWeight: 500, marginTop: 2 }}>Все</div>
                  <div style={{
                    
                    borderRadius: 7,
                    padding: 3,
                    minHeight: 120,
                    maxHeight: 220,
                    overflowY: 'auto',
                    width: 450,
                    transition: 'width 0.2s',
                    scrollbarWidth: 'thin',
                    paddingLeft: 40,
                  }}>
                    {tvState.channelList.map((ch, idx) => (
                      <div
                        key={ch.name}
                        style={{
                          background: idx === tvState.selectedChannelIndex ? '#e048b1' : 'transparent',
                          color: idx === tvState.selectedChannelIndex ? '#fff' : '#fff',
                          fontWeight: idx === tvState.selectedChannelIndex ? 700 : 400,
                          fontSize: 12,
                          padding: '3px 8px',
                          borderRadius: 5,
                          margin: '1.5px 0',
                          display: 'flex',
                          alignItems: 'center',
                          letterSpacing: 0.1,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          width: 'calc(100% - 30px)',
                          minWidth: 0,
                          transition: 'background 0.15s',
                          cursor: tvState.activePanelBtn >= 1 && tvState.activePanelBtn <= 5 ? 'pointer' : 'default',
                          position: 'relative',
                        }}
                        onClick={() => handleChannelClick(idx)}
                      >
                        <span style={{ 
                          width: (idx + 1) >= 100 ? 30 : 18, 
                          display: 'inline-block', 
                          textAlign: 'right', 
                          marginRight: 6, 
                          fontSize: 17, 
                          fontWeight: 700, 
                          color: '#fff' 
                        }}>{idx + 1}</span>
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 140, display: 'inline-block', fontSize: 17, fontWeight: 700, color: '#fff' }}>{ch.name}</span>
                        {/* Индикаторы для различных операций */}
                        {tvState.activePanelBtn === 1 && tvState.channelsToDelete.has(idx) && (
                          <span style={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 10,
                            height: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <svg width="10" height="10" viewBox="0 0 10 10">
                              <line x1="2" y1="2" x2="8" y2="8" stroke="#ff1744" strokeWidth="3.5" strokeLinecap="round" />
                              <line x1="8" y1="2" x2="2" y2="8" stroke="#ff1744" strokeWidth="3.5" strokeLinecap="round" />
                            </svg>
                          </span>
                        )}
                        {/* Индикатор для перемещения (кнопка 2) */}
                        {tvState.activePanelBtn === 2 && tvState.channelsToMove.has(idx) && (
                          <span style={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 12,
                            height: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#4caf50',
                            fontSize: 12,
                          }}>
                            ↔️
                          </span>
                        )}
                        {/* Индикатор для пропуска (кнопка 3) */}
                        {tvState.activePanelBtn === 3 && tvState.channelsToSkip.has(idx) && (
                          <span style={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 12,
                            height: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ff9800',
                            fontSize: 12,
                          }}>
                            ⏭️
                          </span>
                        )}
                        {/* Индикатор для блокировки (кнопка 4) */}
                        {tvState.activePanelBtn === 4 && tvState.channelsToLock.has(idx) && (
                          <span style={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 12,
                            height: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#9c27b0',
                            fontSize: 12,
                          }}>
                            🔒
                          </span>
                        )}
                        {/* Индикатор для избранного (кнопка 5) */}
                        {tvState.activePanelBtn === 5 && (
                          <span style={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 12,
                            height: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffd600',
                            fontSize: 12,
                          }}>
                            ★
                          </span>
                        )}
                        {/* Индикатор уже избранных каналов */}
                        {tvState.favoriteChannels.has(idx) && (
                          <span style={{
                            position: 'absolute',
                            right: tvState.activePanelBtn === 5 ? 24 : 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 12,
                            height: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffd600',
                            fontSize: 12,
                            opacity: 0.7,
                          }}>
                            ★
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Правая колонка: мини-экран и инфо */}
                <div style={{ flex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '10px 8px 0 8px', background: 'rgba(0,0,0,0.02)' }}>
                  {/* Мини-экран */}
                  <div style={{ width: 300, height: 180, background: '#222', borderRadius: 7, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid #333', marginLeft: 140 }}>
                    {/* Заглушка: анимированный gif ведущего/кино */}
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #e048b1 0%, #222 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AIGlobe3D />
                    </div>
                  </div>
                  {/* Инфо о канале */}
                  <div style={{ color: '#fff', fontSize: 14, borderRadius: 5, padding: '8px 12px', minHeight: 40, width: 300, whiteSpace: 'pre-line', marginTop: 6, marginLeft: 140 }}>
                    {tvState.channelList[tvState.selectedChannelIndex]?.info || 'Нет информации'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Мини-футер внизу экрана */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 2,
            zIndex: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
            padding: '10px 36px',
            pointerEvents: 'none',
            background: '#0a1a2a',
            borderRadius: 12,
            width: 800,
            margin: '0 auto',
            boxSizing: 'border-box',
            boxShadow: '0 2px 16px #0006',
            marginTop: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tvState.activePanelBtn === 1 ? 0 : 152 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: '#ff3d00', fontSize: 13 }}>●</span>
                <span style={{ color: '#fff', fontSize: 15 }}>
                  {tvState.activePanelBtn === 1 ? 'Все' : 'Сортировка'}
                </span>
              </span>
              {tvState.activePanelBtn === 1 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 32 }}>
                  <span style={{ color: '#fff', background: '#174080', borderRadius: 4, padding: '1.5px 6px', fontWeight: 600, fontSize: 13}}>ОК</span>
                  <span style={{ color: '#fff', fontSize: 13 }}>Выбрать</span>
                </div>
              )}
              {tvState.activePanelBtn === 2 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 32 }}>
                  <span style={{ color: '#fff', background: '#174080', borderRadius: 4, padding: '1.5px 6px', fontWeight: 600, fontSize: 13}}>ОК</span>
                  <span style={{ color: '#fff', fontSize: 13 }}>Выбрать</span>
                </div>
              )}
              {tvState.activePanelBtn !== 1 && tvState.activePanelBtn !== 2 && (
                <>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#4caf50', fontSize: 13 }}>●</span>
                    <span style={{ color: '#fff', fontSize: 15 }}>Новое имя</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#ffd600', fontSize: 13 }}>●</span>
                    <span style={{ color: '#fff', fontSize: 15 }}>PID</span>
                  </span>
                </>
              )}
              {tvState.activePanelBtn === 2 && (
                <>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#4caf50', fontSize: 13 }}>●</span>
                    <span style={{ color: '#fff', fontSize: 15 }}>Переместить канал</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#ffd600', fontSize: 13 }}>●</span>
                    <span style={{ color: '#fff', fontSize: 15 }}>Переместить на номер</span>
                  </span>
                </>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {tvState.activePanelBtn !== 1 && tvState.activePanelBtn !== 2 && (
                <>
                  <span style={{ color: '#fff', background: '#174080', borderRadius: 4, padding: '1.5px 6px', fontWeight: 600, fontSize: 13}}>1-5</span>
                  <span style={{ color: '#fff', fontSize: 13 }}>Режим</span>
                </>
              )}
            </div>
          </div>
        </>
      )}
      {/* Модалка редактора каналов */}
      {tvState.channelEditorOpen && (
        <div style={{
          position: 'absolute',
          left: 80,
          top: 80,
          zIndex: 10,
          background: 'rgba(10,20,40,0.98)',
          borderRadius: 12,
          border: '2px solid #fff',
          boxShadow: '0 4px 24px #000a',
          minWidth: 260,
          maxWidth: 340,
          width: 300,
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}>
          {CHANNEL_EDITOR_ITEMS_LIST.map((item, idx) => {
            // Жёлтая рамка для 'Удалить все' на шаге 2
            const isDeleteAll = item.toLowerCase().includes('удалить');
            const showYellow = highlight && highlight.step === 1 && highlight.key === 'delete-all' && isDeleteAll;
            return (
              <div
                key={item}
                style={{
                  background: idx === tvState.channelEditorIndex ? '#e048b1' : 'transparent',
                  color: idx === tvState.channelEditorIndex ? '#fff' : '#fff',
                  fontWeight: idx === tvState.channelEditorIndex ? 700 : 400,
                  fontSize: 14,
                  padding: '7px 16px',
                  borderRadius: 7,
                  margin: '2px 7px',
                  transition: 'background 0.2s, box-shadow 0.2s, border 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: 0.2,
                  border: showYellow ? '2.5px solid #ffd600' : undefined,
                  boxShadow: showYellow ? '0 0 16px 2px #ffd60088, 0 2px 8px #ffd60055' : undefined,
                  animation: showYellow ? 'yellow-blink 1.1s infinite alternate' : undefined,
                }}
              >
                {item}
              </div>
            );
          })}
          <style>{`
            @keyframes yellow-blink {
              0% { box-shadow: 0 0 16px 2px #ffd60088, 0 2px 8px #ffd60055; border-color: #ffd600; }
              100% { box-shadow: 0 0 32px 8px #ffd600cc, 0 2px 16px #ffd60099; border-color: #fffde7; }
            }
          `}</style>
        </div>
      )}
      {tvState.settingsModalOpen && (
        <div style={{
          position: 'absolute',
          left: 80,
          top: 80,
          zIndex: 10,
          background: 'rgba(10,20,40,0.98)',
          borderRadius: 12,
          border: '2px solid #fff',
          boxShadow: '0 4px 24px #000a',
          minWidth: 260,
          maxWidth: 340,
          width: 300,
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          marginLeft: '240px',
        }}>
          {/* Стрелка вверх */}
          {tvState.settingsModalIndex > 0 && (
            <div style={{textAlign:'center',color:'#fff',fontSize:18,marginBottom:2}}>&uarr;</div>
          )}
          {/* Показываем 5 пунктов вокруг выбранного */}
          {SETTINGS_MENU_ITEMS.slice(
            Math.max(0, Math.min(tvState.settingsModalIndex - 2, SETTINGS_MENU_ITEMS.length - 5)),
            Math.max(0, Math.min(tvState.settingsModalIndex - 2, SETTINGS_MENU_ITEMS.length - 5)) + 5
          ).map((item, idx, arr) => {
            const globalIdx = Math.max(0, Math.min(tvState.settingsModalIndex - 2, SETTINGS_MENU_ITEMS.length - 5)) + idx;
            return (
              <div
                key={item}
                style={{
                  background: globalIdx === tvState.settingsModalIndex ? '#e048b1' : 'transparent',
                  color: globalIdx === tvState.settingsModalIndex ? '#fff' : '#fff',
                  fontWeight: globalIdx === tvState.settingsModalIndex ? 700 : 400,
                  fontSize: 14,
                  padding: '7px 16px',
                  borderRadius: 7,
                  margin: '2px 7px',
                  transition: 'background 0.2s, box-shadow 0.2s, border 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: 0.2,
                }}
              >
                {item}
              </div>
            );
          })}
          {/* Стрелка вниз */}
          {tvState.settingsModalIndex < SETTINGS_MENU_ITEMS.length - 1 && (
            <div style={{textAlign:'center',color:'#fff',fontSize:18,marginTop:2}}>&darr;</div>
          )}
        </div>
      )}
      {tvState.installModalOpen && (
        <div style={{
          position: 'absolute',
          left: 80,
          top: 80,
          zIndex: 10,
          background: 'rgba(10,20,40,0.98)',
          borderRadius: 12,
          border: '2px solid #fff',
          boxShadow: '0 4px 24px #000a',
          minWidth: 260,
          maxWidth: 340,
          width: 300,
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          marginLeft: '440px',
        }}>
          {/* Без стрелок вверх/вниз */}
          {INSTALL_MENU_ITEMS.slice(
            Math.max(0, Math.min(tvState.installModalIndex - 2, INSTALL_MENU_ITEMS.length - 5)),
            Math.max(0, Math.min(tvState.installModalIndex - 2, INSTALL_MENU_ITEMS.length - 5)) + 5
          ).map((item, idx, arr) => {
            const globalIdx = Math.max(0, Math.min(tvState.installModalIndex - 2, INSTALL_MENU_ITEMS.length - 5)) + idx;
            return (
              <div
                key={item}
                style={{
                  background: globalIdx === tvState.installModalIndex ? '#e048b1' : 'transparent',
                  color: globalIdx === tvState.installModalIndex ? '#fff' : '#fff',
                  fontWeight: globalIdx === tvState.installModalIndex ? 700 : 400,
                  fontSize: 14,
                  padding: '7px 16px',
                  borderRadius: 7,
                  margin: '2px 7px',
                  transition: 'background 0.2s, box-shadow 0.2s, border 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  letterSpacing: 0.2,
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
      {tvState.languageSettingsModalOpen && (
        <ChannelListModal
          title="Настройки языка"
          items={LANGUAGE_SETTINGS_ITEMS}
          selectedIndex={tvState.languageSettingsModalIndex}
          values={tvState.languageSettingsValues}
          onSelect={(idx) => sendCommand(idx > tvState.languageSettingsModalIndex ? 'down' : 'up')}
          onClose={() => sendCommand('exit')}
          onValueChange={(idx, dir) => sendCommand(dir)}
        />
      )}
      {tvState.abSettingsModalOpen && (
        <ChannelListModal
          title="Настройка AB"
          items={AB_SETTINGS_ITEMS}
          selectedIndex={tvState.abSettingsModalIndex}
          values={tvState.abSettingsValues}
          onSelect={(idx) => sendCommand(idx > tvState.abSettingsModalIndex ? 'down' : 'up')}
          onClose={() => sendCommand('exit')}
          onValueChange={(idx, dir) => sendCommand(dir)}
        />
      )}
      {tvState.accessCardModalOpen && (
        <ChannelListModal
          title="Карта доступа"
          items={ACCESS_CARD_ITEMS}
          selectedIndex={tvState.accessCardModalIndex}
          onSelect={(idx) => sendCommand(idx > tvState.accessCardModalIndex ? 'down' : 'up')}
          onClose={() => sendCommand('exit')}
          oneColumn={true}
        />
      )}
      {tvState.conaxInfoModalOpen && (
        <ConaxInfoModal onClose={() => sendCommand('exit')} />
      )}
      {tvState.subscriptionStatusModalOpen && (
        <SubscriptionStatusModal onClose={() => sendCommand('exit')} />
      )}
      {tvState.antennaSetupModalOpen && (
        <>
          <ChannelListModal
            title="Установка антенны"
            items={ANTENNA_SETUP_ITEMS}
            selectedIndex={tvState.antennaSetupIndex}
            values={tvState.antennaSetupValues}
            onSelect={(idx) => {
              if (idx > tvState.antennaSetupIndex) sendCommand('down');
              else if (idx < tvState.antennaSetupIndex) sendCommand('up');
            }}
            onClose={() => sendCommand('exit')}
            onValueChange={(idx, dir) => sendCommand(dir)}
            headerIcon={<FaSatelliteDish size={34} color="#fff" style={{marginRight: 14}} />}
            signalBlock={
              <>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ color: '#fff', fontSize: 13, width: 90 }}>Уровень</span>
                  <div style={{ flex: 1, height: 13, background: '#1a2a4a', borderRadius: 6, marginLeft: 10, marginRight: 10, overflow: 'hidden', border: '1px solid #3386ff' }}>
                    <div style={{ width: '83%', height: '100%', background: 'linear-gradient(90deg, #1e90ff 60%, #00eaff 100%)', borderRadius: 6 }} />
                  </div>
                  <span style={{ color: '#fff', fontSize: 13, width: 38, textAlign: 'right' }}>83%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 13, width: 90 }}>Сигнал</span>
                  <div style={{ flex: 1, height: 13, background: '#1a2a4a', borderRadius: 6, marginLeft: 10, marginRight: 10, overflow: 'hidden', border: '1px solid #3fcf4a' }}>
                    <div style={{ width: '79%', height: '100%', background: 'linear-gradient(90deg, #b6ff00 60%, #3fcf4a 100%)', borderRadius: 6 }} />
                  </div>
                  <span style={{ color: '#fff', fontSize: 13, width: 38, textAlign: 'right' }}>79%</span>
                </div>
              </>
            }
          />
          {/* Мини-футер под модалкой, как у ChannelListModal */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 12,
            zIndex: 31,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
            padding: '10px 36px',
            pointerEvents: 'none',
            background: '#0a1a2a',
            borderRadius: 12,
            width: 800,
            margin: '0 auto',
            boxSizing: 'border-box',
            boxShadow: '0 2px 16px #0006',
            color: '#fff',
          }}>
            <span style={{marginRight: 32}}><span style={{color:'#ff1744'}}>●</span> Список спутник</span>
            <span style={{marginRight: 32}}><span style={{color:'#00e676'}}>●</span> Список транспо</span>
            <span><span style={{color:'#2979ff'}}>●</span> Поиск T2-MI</span>
          </div>
        </>
      )}
      {/* Модалка поиска каналов поверх антенны */}
      {tvState.searchSettingsModalOpen && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -44%)',
          zIndex: 100,
          minWidth: 340,
          maxWidth: 370,
          background: 'linear-gradient(180deg, #f8f8f8 80%, #e0e0e0 100%)',
          border: '2.5px solid #888',
          borderRadius: 10,
          boxShadow: '0 8px 32px #0008, 0 2px 8px #2227',
          padding: '0 0 10px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          fontFamily: 'inherit',
        }}>
          {/* Заголовок */}
          <div style={{
            background: 'linear-gradient(90deg, #e0e0e0 60%, #f8f8f8 100%)',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            padding: '7px 18px 5px 18px',
            fontWeight: 700,
            fontSize: 18,
            color: '#222',
            borderBottom: '1.5px solid #bbb',
            letterSpacing: 0.2,
            textAlign: 'left',
            boxShadow: '0 2px 8px #0001',
          }}>
            Поиск каналов
          </div>
          {/* Список настроек + кнопка Поиск */}
          <div style={{ padding: '8px 18px 0 18px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SEARCH_SETTINGS_ITEMS.map((item, idx) => (
              <div key={item.label}
                onClick={() => sendCommand(idx > tvState.searchSettingsModalIndex ? 'down' : idx < tvState.searchSettingsModalIndex ? 'up' : null)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: idx === tvState.searchSettingsModalIndex ? '#2979ff' : 'transparent',
                  color: idx === tvState.searchSettingsModalIndex ? '#fff' : '#222',
                  fontWeight: idx === tvState.searchSettingsModalIndex ? 700 : 400,
                  fontSize: 15,
                  borderRadius: 5,
                  margin: '1.5px 0',
                  minHeight: 28,
                  height: 28,
                  transition: 'background 0.15s',
                  cursor: 'pointer',
                  paddingLeft: 6,
                  paddingRight: 6,
                }}>
                <span style={{ flex: 1, textAlign: 'left', fontSize: 15 }}>{item.label}</span>
                <span style={{ flex: 1, textAlign: 'right', fontSize: 15, fontWeight: 700, color: idx === tvState.searchSettingsModalIndex ? '#fff' : '#2979ff' }}>
                  {item.options[0]}
                </span>
              </div>
            ))}
            {/* Кнопка Поиск */}
            <div
              onClick={() => sendCommand('ok')}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: tvState.searchSettingsModalIndex === SEARCH_SETTINGS_ITEMS.length ? '#2979ff' : 'transparent',
                color: tvState.searchSettingsModalIndex === SEARCH_SETTINGS_ITEMS.length ? '#fff' : '#2979ff',
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 5,
                margin: '8px 0 0 0',
                minHeight: 32,
                height: 32,
                transition: 'background 0.15s',
                cursor: 'pointer',
                border: '1.5px solid #2979ff',
                boxShadow: tvState.searchSettingsModalIndex === SEARCH_SETTINGS_ITEMS.length ? '0 0 8px #2979ff88' : undefined,
              }}
            >
              Поиск
            </div>
          </div>
        </div>
      )}
      {/* Модалка прогресса поиска каналов */}
      {tvState.channelSearchProgressModalOpen && (
        <ChannelSearchProgressModal
          progress={tvState.channelSearchProgress}
          tvList={tvState.channelSearchTVList}
          radioList={tvState.channelSearchRadioList}
          onClose={() => sendCommand('exit')}
        />
      )}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 24,
        padding: 36,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #2b3a67 0%, #1e2a47 100%)",
        borderRadius: 8,
        boxShadow: "0 2px 12px #0004 inset",
      }}>
        {apps.map((app, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff",
              position: 'relative',
              border: tvState.selectedIcon === i ? '2px solid #fff' : '2px solid transparent',
              borderRadius: 12,
              transition: 'box-shadow 0.2s, border 0.2s',
              zIndex: tvState.selectedIcon === i ? 2 : 1,
              background: tvState.selectedIcon === i ? 'rgba(255,255,255,0.06)' : undefined,
              outline: highlight?.type === 'menu' && highlight?.key === 'channel-editor' && app.name === 'Редактор каналов' ? '3px solid #ffd600' : undefined,
              boxShadow: (
                (tvState.selectedIcon === i ? '0 0 0 3px #e048b1, 0 0 16px 2px #e048b1aa' : '') +
                (highlight?.type === 'menu' && highlight?.key === 'channel-editor' && app.name === 'Редактор каналов' ? ', 0 0 16px 4px #ffd60088' : '')
              ) || undefined,
            }}
          >
            {React.cloneElement(app.icon, { size: 70 })}
            <span style={{ fontSize: 13, marginTop: 4, textAlign: "center", textShadow: "0 1px 2px #000a" }}>{app.name}</span>
          </div>
        ))}
      </div>
      {/* Подставка телевизора */}
      <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", width: 140, height: 18, background: "#23272e", borderRadius: 9, boxShadow: "0 4px 16px #0008" }} />
      {/* Модальное окно подтверждения удаления */}
      {showDeleteModal && (
        <div style={{
          position: 'absolute',
          left: 0, right: 0, top: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100,
          background: 'radial-gradient(ellipse at 60% 40%, #2563eb55 0%, #181c20cc 100%)',
          boxShadow: '0 0 0 9999px rgba(10,20,40,0.45)',
          animation: 'fade-in-modal 0.5s cubic-bezier(.4,0,.2,1)',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #23272e 60%, #181c20 100%)',
            border: '2.5px solid #00eaff',
            borderRadius: 22,
            boxShadow: '0 12px 48px #00eaff55, 0 2px 8px #2227',
            minWidth: 420,
            maxWidth: 540,
            padding: '44px 48px 36px 48px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            position: 'relative',
            animation: 'modal-pop 0.6s cubic-bezier(.4,0,.2,1)',
          }}>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 28, marginBottom: 18, letterSpacing: 0.5, textShadow: '0 2px 12px #00eaff88', marginTop: 18 }}>Подтверждение</div>
            <div style={{ color: '#fff', fontSize: 19, marginBottom: 28, textAlign: 'center', lineHeight: 1.6, fontWeight: 500 }}>
              Удалить выбранные каналы?<br />Это действие нельзя отменить.
            </div>
            <div style={{ display: 'flex', gap: 28, marginTop: 12 }}>
              <button onClick={handleDeleteCancel} style={{
                background: 'linear-gradient(135deg, #222 60%, #444 100%)',
                color: '#fff', border: '2px solid #00eaff', borderRadius: 9,
                fontWeight: 700, fontSize: 18, padding: '11px 32px', cursor: 'pointer',
                boxShadow: '0 2px 12px #00eaff44',
                transition: 'background 0.18s',
              }}>Отмена</button>
              <button onClick={handleDeleteConfirm} style={{
                background: 'linear-gradient(135deg, #ff1744 60%, #b71c1c 100%)',
                color: '#fff', border: '2px solid #ff1744', borderRadius: 9,
                fontWeight: 800, fontSize: 18, padding: '11px 32px', cursor: 'pointer',
                boxShadow: '0 2px 18px #ff174488',
                transition: 'background 0.18s',
              }}>Удалить</button>
            </div>
            {/* Неоновое свечение */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 420,
              height: 180,
              zIndex: -1,
              pointerEvents: 'none',
              filter: 'blur(48px)',
              opacity: 0.35,
              background: 'radial-gradient(ellipse at center, #00eaff 0%, #2563eb 60%, transparent 100%)',
            }} />
          </div>
          <style>{`
            @keyframes fade-in-modal {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modal-pop {
              0% { transform: scale(0.85); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </div>
    </RealisticTVFrame>
  );
} 