import React from 'react';
import { FaCog } from 'react-icons/fa';

interface ChannelListModalProps {
  title: string;
  items: { label: string; options?: string[] }[];
  selectedIndex: number;
  values?: number[];
  onSelect: (idx: number) => void;
  onClose: () => void;
  onValueChange?: (idx: number, direction: 'left' | 'right') => void;
  oneColumn?: boolean;
}

const AccessCardIcon = () => (
  <FaCog size={34} color="#fff" style={{marginRight: 14}} />
);

const ChannelListModal: React.FC<ChannelListModalProps> = ({ title, items, selectedIndex, values, onSelect, onClose, onValueChange, oneColumn }) => {
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
        {/* Верхняя панель */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#174080', borderTopLeftRadius: 14, borderTopRightRadius: 14, padding: '5px 14px', justifyContent: 'space-between', minHeight: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {(oneColumn || title.toLowerCase().includes('настройк')) && <AccessCardIcon />}
            <span style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 0.5, textShadow: '0 2px 12px #3386ff88' }}>{title}</span>
          </div>
          <span style={{ color: '#fff', fontSize: 13 }}>{dateStr} {timeStr}</span>
        </div>
        {/* Основной flex-контейнер модалки */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 120, background: '#102040', justifyContent: 'center', alignItems: 'center' }}>
          {/* Таблица настроек */}
          <div style={{ width: 700, margin: '0 auto', marginTop: 24, marginBottom: 24 }}>
            {items.map((item, idx) => (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: idx === selectedIndex ? '#e048b1' : 'transparent',
                  color: idx === selectedIndex ? '#fff' : '#fff',
                  fontWeight: idx === selectedIndex ? 700 : 400,
                  fontSize: 20,
                  borderRadius: 7,
                  margin: '2.5px 0',
                  padding: '0 0 0 0',
                  minHeight: 44,
                  height: 44,
                  transition: 'background 0.15s',
                  cursor: 'pointer',
                }}
                onClick={() => onSelect(idx)}
              >
                <span style={{ flex: 1, paddingLeft: 32, textAlign: 'left', fontSize: 20 }}>{item.label}</span>
                {!oneColumn && values && item.options && (
                  <div style={{ display: 'flex', alignItems: 'center', minWidth: 220, justifyContent: 'flex-end', paddingRight: 32 }}>
                    {idx === selectedIndex ? (
                      <>
                        <span style={{ fontSize: 26, fontWeight: 700, cursor: 'pointer', marginRight: 16 }} onClick={() => onValueChange && onValueChange(idx, 'left')}>&lt;</span>
                        <span style={{ fontSize: 20, fontWeight: 700, minWidth: 80, textAlign: 'center', flex: 1 }}>{item.options[values[idx]]}</span>
                        <span style={{ fontSize: 26, fontWeight: 700, cursor: 'pointer', marginLeft: 16 }} onClick={() => onValueChange && onValueChange(idx, 'right')}>&gt;</span>
                      </>
                    ) : (
                      <span style={{ fontSize: 20, fontWeight: 700, minWidth: 80, textAlign: 'center', flex: 1 }}>{item.options[values[idx]]}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Мини-футер — пустой */}
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
          {/* Пусто */}
        </div>
      </div>
    </div>
  );
};

export default ChannelListModal; 