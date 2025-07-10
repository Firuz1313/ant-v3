import React from 'react';
import { IconSatellite } from '@tabler/icons-react';

const menuItems = [
  { label: 'Установка', selected: true },
  { label: 'Редактор Каналов' },
  { label: 'Настройка Системы' },
  { label: 'Приложение' },
  { label: 'Условный Доступ' },
];

export default function OpenboxTVInterface() {
  return (
    <div style={{
      position: 'absolute',
      left: 24,
      bottom: 24,
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      pointerEvents: 'none',
    }}>
      {/* Иконка строго над модалкой */}
      <div style={{
        alignSelf: 'center',
        marginBottom: 2,
        marginLeft: 2,
        pointerEvents: 'auto',
      }}>
        <div style={{
          background: '#fff',
          border: '2.5px solid #b0b0b0',
          borderRadius: '50%',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px #0001',
        }}>
          <IconSatellite size={30} stroke={1.7} color="#174080" />
        </div>
      </div>
      {/* Модалка меню с особой формой */}
      <div
        style={{
          background: '#fffbe6',
          border: '2.5px solid #b0b0b0',
          // Скругления: справа полукруг, слева срезано и чуть скруглено
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 18,
          borderTopRightRadius: 36,
          borderBottomRightRadius: 36,
          boxShadow: '0 2px 8px #0002',
          minWidth: 200,
          maxWidth: 240,
          padding: '8px 0 10px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          pointerEvents: 'auto',
          // clip-path для плавного среза слева
          clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 12% 100%, 0 90%, 0 10%)',
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>
          {menuItems.map((item, idx) => (
            <div
              key={item.label}
              style={{
                background: item.selected ? '#3386ff' : 'transparent',
                color: item.selected ? '#fff' : '#222',
                fontWeight: item.selected ? 700 : 500,
                fontSize: 15.5,
                padding: '7px 18px 7px 18px',
                borderRadius: 4,
                margin: idx === 0 ? '0 10px 2px 10px' : '2px 10px',
                border: item.selected ? '2px solid #3386ff' : 'none',
                boxShadow: item.selected ? '0 0 0 2px #17408022' : undefined,
                transition: 'all 0.18s',
                textAlign: 'left',
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 