import React, { createContext, useContext, useState } from 'react';

// Типы команд
export type TVCommand = 'power' | 'exit' | 'ok' | 'up' | 'down' | 'left' | 'right' | 'open_channel_editor';

// Количество иконок в сетке главного экрана (3 ряда по 4 иконки)
const ICONS_GRID_ROWS = 3;
const ICONS_GRID_COLS = 4;
const ICONS_TOTAL = 12;

// Состояние телевизора (минимальное для логики)
interface TVState {
  power: boolean;
  channelEditorOpen: boolean;
  channelEditorIndex: number; // выбранный пункт
  selectedIcon: number; // индекс выбранной иконки на главном экране
}

interface TVControlContextType {
  tvState: TVState;
  sendCommand: (cmd: TVCommand) => void;
}

const TVControlContext = createContext<TVControlContextType | undefined>(undefined);

const CHANNEL_EDITOR_ITEMS = [
  'Телеканал',
  'Радиоканал',
  'Удалить все',
];

export const TVControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tvState, setTvState] = useState<TVState>({
    power: true,
    channelEditorOpen: false,
    channelEditorIndex: 0,
    selectedIcon: 0,
  });

  function sendCommand(cmd: TVCommand) {
    setTvState(prev => {
      if (!prev.power) return prev;
      // Если открыта модалка редактора каналов — навигация только по ней
      if (prev.channelEditorOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, channelEditorOpen: false };
          case 'ok':
            return { ...prev, channelEditorOpen: false };
          case 'up':
            return {
              ...prev,
              channelEditorIndex: (prev.channelEditorIndex + CHANNEL_EDITOR_ITEMS.length - 1) % CHANNEL_EDITOR_ITEMS.length,
            };
          case 'down':
            return {
              ...prev,
              channelEditorIndex: (prev.channelEditorIndex + 1) % CHANNEL_EDITOR_ITEMS.length,
            };
          default:
            return prev;
        }
      }
      // Навигация по иконкам главного экрана
      switch (cmd) {
        case 'power':
          return { ...prev, power: !prev.power };
        case 'open_channel_editor':
          return { ...prev, channelEditorOpen: true, channelEditorIndex: 0 };
        case 'ok':
          // Если выбрана первая иконка (редактор каналов), открываем модалку
          if (prev.selectedIcon === 0) {
            return { ...prev, channelEditorOpen: true, channelEditorIndex: 0 };
          }
          return prev;
        case 'left':
          return { ...prev, selectedIcon: (prev.selectedIcon + ICONS_TOTAL - 1) % ICONS_TOTAL };
        case 'right':
          return { ...prev, selectedIcon: (prev.selectedIcon + 1) % ICONS_TOTAL };
        case 'up': {
          const row = Math.floor(prev.selectedIcon / ICONS_GRID_COLS);
          if (row === 0) return prev;
          return { ...prev, selectedIcon: prev.selectedIcon - ICONS_GRID_COLS };
        }
        case 'down': {
          const row = Math.floor(prev.selectedIcon / ICONS_GRID_COLS);
          if (row === ICONS_GRID_ROWS - 1) return prev;
          return { ...prev, selectedIcon: prev.selectedIcon + ICONS_GRID_COLS };
        }
        default:
          return prev;
      }
    });
  }

  return (
    <TVControlContext.Provider value={{ tvState, sendCommand }}>
      {children}
    </TVControlContext.Provider>
  );
};

export function useTVControl() {
  const ctx = useContext(TVControlContext);
  if (!ctx) throw new Error('useTVControl must be used within TVControlProvider');
  return ctx;
}

export const CHANNEL_EDITOR_ITEMS_LIST = CHANNEL_EDITOR_ITEMS; 