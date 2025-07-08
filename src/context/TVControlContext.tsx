import React, { createContext, useContext, useState } from 'react';
import { ANTENNA_SETUP_ITEMS } from '../data/antennaSetup';

// Типы команд
export type TVCommand =
  | 'power'
  | 'exit'
  | 'ok'
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'open_channel_editor'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5';

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
  channelListOpen: boolean;
  selectedChannelIndex: number;
  channelList: { name: string; info: string }[];
  activePanelBtn: number | null; // активная кнопка панели 1-5
  favoriteChannels: Set<number>; // избранные каналы
  channelsToDelete: Set<number>; // каналы для удаления
  channelsToMove: Set<number>; // каналы для перемещения
  channelsToSkip: Set<number>; // каналы для пропуска
  channelsToLock: Set<number>; // каналы для блокировки
  settingsModalOpen: boolean;
  settingsModalIndex: number;
  installModalOpen: boolean;
  installModalIndex: number;
  languageSettingsModalOpen: boolean;
  languageSettingsModalIndex: number;
  languageSettingsValues: number[];
  abSettingsModalOpen: boolean;
  abSettingsModalIndex: number;
  abSettingsValues: number[];
  accessCardModalOpen: boolean;
  accessCardModalIndex: number;
  conaxInfoModalOpen: boolean;
  subscriptionStatusModalOpen: boolean;
  antennaSetupModalOpen: boolean;
  antennaSetupIndex: number;
  antennaSetupValues: number[];
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

const DEFAULT_CHANNEL_LIST = [
  { name: '.RED HD', info: 'Express 80\n12049 / H / 31999\n.RED HD\nPID V:60 A:61 PCR:60' },
  { name: '.SCI-FI', info: '' },
  { name: '5 КАНАЛ', info: '' },
  { name: '7 СИТОРА HD', info: '' },
  { name: 'ANI', info: '' },
  { name: 'Animal Planet HD', info: '' },
  { name: 'ANIME', info: '' },
  { name: 'BOLAJON', info: '' },
  { name: 'BOLLYWOOD', info: '' },
  { name: 'CINEMA', info: '' },
  { name: 'CTC KIDS', info: '' },
  { name: 'DA VINCI KIDS', info: '' },
  { name: 'DISCOVERY CHANNEL', info: '' },
  { name: 'DISCOVERY ID', info: '' },
  { name: 'Disney', info: '' },
  { name: 'DIZI', info: '' },
  { name: 'English Club', info: '' },
  { name: 'EURONEWS', info: '' },
  { name: 'EUROPA-PLUS TV', info: '' },
  { name: 'EUROSPORT 1', info: '' },
  { name: 'EUROSPORT 2', info: '' },
  { name: 'Extreme Sports', info: '' },
  { name: 'FIGHTBOX', info: '' },
  { name: 'GAME - TV HD', info: '' },
  { name: 'GEM-BOLLYWOOD', info: '' },
  { name: 'GEM-FOOD', info: '' },
  { name: 'ВОСТОК ТВ', info: '' },
  { name: 'GEM-RIVER', info: '' },
  { name: 'KHL', info: '' },
  { name: 'KHL PRIME HD', info: '' },
  { name: 'KINOTEATR', info: '' },
  { name: 'MADANIYAT VA MA`RIFAT', info: '' },
  { name: 'MAHALLA', info: '' },
  { name: 'Milliy TV', info: '' },
  { name: 'MMA-TV', info: '' },
  { name: 'My5', info: '' },
  { name: 'NAT GEO WILD HD', info: '' },
  { name: 'NATIONAL GEOGRAPHIC HD', info: '' },
  { name: 'NAVO', info: '' },
  { name: 'NICK JUNIOR', info: '' },
  { name: 'OCEAN TV', info: '' },
  { name: 'PMC HD', info: '' },
  { name: 'Ru TV', info: '' },
  { name: 'SAUDI QURAN HD', info: '' },
  { name: 'Saudi Sunnah HD', info: '' },
  { name: 'SETANTA SPORT 1 HD', info: '' },
  { name: 'SETANTA SPORT 2', info: '' },
  { name: 'SEVIMLI TV', info: '' },
  { name: 'SPORT PREM 01', info: '' },
  { name: 'SPORT PREM 02', info: '' },
  { name: 'SPORT PREM 03', info: '' },
  { name: 'SPORT PREM 04', info: '' },
  { name: 'SPORT PREM 05', info: '' },
  { name: 'SPORT PREM 06', info: '' },
  { name: 'START WORLD', info: '' },
  { name: 'TLC', info: '' },
  { name: 'TV1000', info: '' },
  { name: 'TV-1000 EAST', info: '' },
  { name: 'TV1000 Русское кино', info: '' },
  { name: 'UFC TV HD', info: '' },
  { name: 'VIASAT HISTORY', info: '' },
  { name: 'VIASAT SPORT', info: '' },
  { name: 'VIP MEGAHIT HD', info: '' },
  { name: 'VIP PREIMERE HD', info: '' },
  { name: 'VIP-COMEDY', info: '' },
  { name: 'YOSHLAR', info: '' },
  { name: 'ZOR-TV', info: '' },
  { name: 'АВТО 24', info: '' },
  { name: 'АЗИЯ HD', info: '' },
  { name: 'АНТ', info: '' },
  { name: 'АНТ Бизнес', info: '' },
  { name: 'Ант-Comedy HD', info: '' },
  { name: 'АНТ-КИНО HD', info: '' },
  { name: 'АНТ-КУДАКОНА HD', info: '' },
  { name: 'АНТ-МУЗЫКА', info: '' },
  { name: 'АНТ-ОИЛА HD', info: '' },
  { name: 'АНТ-ОЛАМ HD', info: '' },
  { name: 'АНТ-ПРЕМИУМ HD', info: '' },
  { name: 'АНТ-СEРИАЛ', info: '' },
  { name: 'АНТ-ШАШМАКОМ', info: '' },
  { name: 'БАХОРИСТОН', info: '' },
  { name: 'БОКС ТВ', info: '' },
  { name: 'БОЛЬШАЯ АЗИЯ', info: '' },
  { name: 'ВАРЗИШ HD', info: '' },
  { name: 'ГЛАЗАМИ ТУРИСТА HD', info: '' },
  { name: 'ДЕТСКИЙ МИР', info: '' },
  { name: 'ДИЁР HD', info: '' },
  { name: 'ДИКАЯ ОХОТА HD', info: '' },
  { name: 'ДИКАЯ РЫБАЛКА HD', info: '' },
  { name: 'ДИКИЙ', info: '' },
  { name: 'ДОКТОР', info: '' },
  { name: 'ДОМ КИНО', info: '' },
  { name: 'ДОМАШНИЙ', info: '' },
  { name: 'ДУШАНБЕ HD', info: '' },
  { name: 'ЖИВАЯ ПРИРОДА HD', info: '' },
  { name: 'ЖИВИ АКТИВНО HD', info: '' },
  { name: 'ЗАЛ СУДА', info: '' },
  { name: 'ЗВЕЗДА', info: '' },
  { name: 'ЗООПАРК', info: '' },
  { name: 'ИЗВЕСТИЯ', info: '' },
  { name: 'ИЛМ ва ТАБИАТ', info: '' },
  { name: 'ИНДИЙСКОЕ КИНО', info: '' },
  { name: 'Индия', info: '' },
  { name: 'ИСТОРИЯ', info: '' },
  { name: 'КАРУСЕЛЬ', info: '' },
  { name: 'КВН ТВ', info: '' },
  { name: 'КИНЕКО', info: '' },
  { name: 'КИНО ТВ HD', info: '' },
  { name: 'КИНОМИКС HD', info: '' },
  { name: 'КИНОПРЕМЬЕРА HD', info: '' },
  { name: 'КИНОСЕМЬЯ HD', info: '' },
  { name: 'КИНОХИТ HD', info: '' },
  { name: 'КОМЕДИЯ', info: '' },
  { name: 'КУХНЯ ТВ', info: '' },
  { name: 'Лёва', info: '' },
  { name: 'ЛЮБИМОЕ КИНО', info: '' },
  { name: 'МАМА', info: '' },
  { name: 'МАТЧ! HD', info: '' },
  { name: 'МАТЧ! БОЕЦ', info: '' },
  { name: 'МАТЧ! ПРЕМЬЕР HD', info: '' },
  { name: 'МАТЧ! СТРАНА', info: '' },
  { name: 'МАТЧ! ФУТБОЛ 1', info: '' },
  { name: 'МАТЧ! ФУТБОЛ 2', info: '' },
  { name: 'МАТЧ! ФУТБОЛ 3', info: '' },
  { name: 'МИР', info: '' },
  { name: 'МИР 24', info: '' },
  { name: 'МИР СЕРИАЛА', info: '' },
  { name: 'МОСФИЛЬМ', info: '' },
  { name: 'МОЯ ПЛАНЕТА', info: '' },
  { name: 'МУЖСКОЕ КИНО', info: '' },
  { name: 'МУЗ-ТВ', info: '' },
  { name: 'МУЛЬТ', info: '' },
  { name: 'МУЛЬТ И МУЗЫКА', info: '' },
  { name: 'НАУКА 2.0', info: '' },
  { name: 'НОСТАЛЬГИЯ', info: '' },
  { name: 'НСТВ', info: '' },
  { name: 'НТВ (+2)', info: '' },
  { name: 'НТВ HD', info: '' },
  { name: 'НТВ СЕРИАЛ', info: '' },
  { name: 'НТВ- СТИЛЬ', info: '' },
  { name: 'НТВ ХИТ', info: '' },
  { name: 'ОХОТА И РЫБАЛКА', info: '' },
  { name: 'ПЕРВЫЙ КАНАЛ +4', info: '' },
  { name: 'ПЕРВЫЙ КАНАЛ HD', info: '' },
  { name: 'ПОБЕДА', info: '' },
  { name: 'ПЯТНИЦА', info: '' },
  { name: 'РБК', info: '' },
  { name: 'РЕН ТВ', info: '' },
  { name: 'Родное Кино', info: '' },
  { name: 'РОССИЯ +4', info: '' },
  { name: 'РОССИЯ 24', info: '' },
  { name: 'РОССИЯ HD', info: '' },
  { name: 'РТР ПЛАНЕТА', info: '' },
  { name: 'Русский Бестселлер', info: '' },
  { name: 'РУССКИЙ ДЕТЕКТИВ', info: '' },
  { name: 'РУССКИЙ РОМАН', info: '' },
  { name: 'САЛОМ ТВ', info: '' },
  { name: 'САПФИР', info: '' },
  { name: 'САФИНА HD', info: '' },
  { name: 'СИНАМО HD', info: '' },
  { name: 'СМ-1', info: '' },
  { name: 'Солнце', info: '' },
  { name: 'СОМОН', info: '' },
  { name: 'СТС +2', info: '' },
  { name: 'СТС HD', info: '' },
  { name: 'СУГД HD', info: '' },
  { name: 'Т24', info: '' },
  { name: 'ТАНИН', info: '' },
  { name: 'ТВ Бадахшон', info: '' },
  { name: 'ТВ Гулакандоз', info: '' },
  { name: 'ТВ САЙЕХИ', info: '' },
  { name: 'ТВЦ', info: '' },
  { name: 'ТВ-3', info: '' },
  { name: 'ТМТ ШАХНАВОЗ', info: '' },
  { name: 'ТНТ (+4)', info: '' },
  { name: 'ТНТ HD', info: '' },
  { name: 'ТНТ4', info: '' },
  { name: 'ТОЧИКИСТОН HD', info: '' },
  { name: 'Футбол ТЧ HD', info: '' },
  { name: 'ЧАХОНОРО', info: '' },
  { name: 'ЧАХОННАМО', info: '' },
  { name: 'ЧЕ', info: '' },
  { name: 'Ю ТВ', info: '' },
];

export const SETTINGS_MENU_ITEMS = [
  'Настройки языка',
  'Заводские настройки',
  'Сбросить настройки',
  'Установка времени',
  'Установка таймера',
  'Настройки AB',
  'Управления блокировкой',
  'Настройки меню',
  'Настройки цвета',
  'Режим питания вкл/выкл',
  'Настройки дисплея',
  'Каналы Спутник+IPTV',
  'Настройка сети',
  'Сервер',
  'Карта доступа',
];

export const INSTALL_MENU_ITEMS = [
  'Установка антенны',
  'Установка позиционера',
  'Список спутника',
  'Список транспондеров',
];

export const LANGUAGE_SETTINGS_ITEMS = [
  { label: 'Язык меню', options: ['Русский', 'Английский', 'Французский'], default: 0 },
  { label: 'Первый Язык аудио', options: ['Русский', 'Английский', 'Французский'], default: 0 },
  { label: 'Второй Язык аудио', options: ['Русский', 'Английский', 'Французский'], default: 0 },
  { label: 'Первый язык субтитров', options: ['Выкл.', 'Русский', 'Английский', 'Французский'], default: 0 },
  { label: 'Второй язык субтитров', options: ['Авто', 'Русский', 'Английский', 'Французский'], default: 0 },
  { label: 'EPG язык', options: ['Все', 'Русский', 'Английский', 'Французский'], default: 0 },
];

export const AB_SETTINGS_ITEMS = [
  { label: 'ТВ стандарт', options: ['1080p@60Hz', '1080i@50Hz', '720p@60Hz', '720p@50Hz', '576p@50Hz', '480p@60Hz'], default: 0 },
  { label: 'Соотношение ТВ', options: ['16:9', '4:3', 'Авто'], default: 0 },
  { label: 'Аспект режим', options: ['Авто', '16:9', '4:3'], default: 0 },
  { label: 'Громкость', options: ['Все каналы', 'Текущий канал'], default: 0 },
  { label: 'SPDIF/HDMI', options: ['AC3 Авто', 'PCM', 'Выкл.'], default: 0 },
];

export const ACCESS_CARD_ITEMS = [
  { label: 'Conax Information' },
  { label: 'Change PIN' },
  { label: 'Matural_Rate' },
  { label: 'Subscription Status' },
];

export const TVControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tvState, setTvState] = useState<TVState>({
    power: true,
    channelEditorOpen: false,
    channelEditorIndex: 0,
    selectedIcon: 0,
    channelListOpen: false,
    selectedChannelIndex: 0,
    channelList: DEFAULT_CHANNEL_LIST,
    activePanelBtn: null,
    favoriteChannels: new Set(),
    channelsToDelete: new Set(),
    channelsToMove: new Set(),
    channelsToSkip: new Set(),
    channelsToLock: new Set(),
    settingsModalOpen: false,
    settingsModalIndex: 0,
    installModalOpen: false,
    installModalIndex: 0,
    languageSettingsModalOpen: false,
    languageSettingsModalIndex: 0,
    languageSettingsValues: [0,0,0,0,0,0],
    abSettingsModalOpen: false,
    abSettingsModalIndex: 0,
    abSettingsValues: [0,0,0,0,0],
    accessCardModalOpen: false,
    accessCardModalIndex: 0,
    conaxInfoModalOpen: false,
    subscriptionStatusModalOpen: false,
    antennaSetupModalOpen: false,
    antennaSetupIndex: 0,
    antennaSetupValues: [0,0,0,0,0,0,0,0],
  });

  function sendCommand(cmd: TVCommand) {
    setTvState(prev => {
      if (!prev.power) return prev;
      
      // Обработка цифровых кнопок 1-5
      if (['1', '2', '3', '4', '5'].includes(cmd)) {
        const btnNumber = parseInt(cmd);
        if (prev.channelListOpen) {
          // Если открыт список каналов, активируем соответствующую кнопку панели
          return { ...prev, activePanelBtn: btnNumber };
        }
        return prev;
      }
      
      // Channel List Modal
      if (prev.channelListOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, channelListOpen: false, activePanelBtn: null };
          case 'ok':
            // Обработка выбора канала в зависимости от активной панели
            if (prev.activePanelBtn === 1) {
              // Удаление каналов
              const newChannelsToDelete = new Set(prev.channelsToDelete);
              if (newChannelsToDelete.has(prev.selectedChannelIndex)) {
                newChannelsToDelete.delete(prev.selectedChannelIndex);
              } else {
                newChannelsToDelete.add(prev.selectedChannelIndex);
              }
              return { ...prev, channelsToDelete: newChannelsToDelete };
            } else if (prev.activePanelBtn === 2) {
              // Перемещение каналов
              const newChannelsToMove = new Set(prev.channelsToMove);
              if (newChannelsToMove.has(prev.selectedChannelIndex)) {
                newChannelsToMove.delete(prev.selectedChannelIndex);
              } else {
                newChannelsToMove.add(prev.selectedChannelIndex);
              }
              return { ...prev, channelsToMove: newChannelsToMove };
            } else if (prev.activePanelBtn === 3) {
              // Пропуск каналов
              const newChannelsToSkip = new Set(prev.channelsToSkip);
              if (newChannelsToSkip.has(prev.selectedChannelIndex)) {
                newChannelsToSkip.delete(prev.selectedChannelIndex);
              } else {
                newChannelsToSkip.add(prev.selectedChannelIndex);
              }
              return { ...prev, channelsToSkip: newChannelsToSkip };
            } else if (prev.activePanelBtn === 4) {
              // Блокировка каналов
              const newChannelsToLock = new Set(prev.channelsToLock);
              if (newChannelsToLock.has(prev.selectedChannelIndex)) {
                newChannelsToLock.delete(prev.selectedChannelIndex);
              } else {
                newChannelsToLock.add(prev.selectedChannelIndex);
              }
              return { ...prev, channelsToLock: newChannelsToLock };
            } else if (prev.activePanelBtn === 5) {
              // Добавление в избранное
              const newFavorites = new Set(prev.favoriteChannels);
              if (newFavorites.has(prev.selectedChannelIndex)) {
                newFavorites.delete(prev.selectedChannelIndex);
              } else {
                newFavorites.add(prev.selectedChannelIndex);
              }
              return { ...prev, favoriteChannels: newFavorites };
            }
            return prev;
          case 'up':
            return {
              ...prev,
              selectedChannelIndex:
                (prev.selectedChannelIndex + prev.channelList.length - 1) % prev.channelList.length,
            };
          case 'down':
            return {
              ...prev,
              selectedChannelIndex:
                (prev.selectedChannelIndex + 1) % prev.channelList.length,
            };
          default:
            return prev;
        }
      }
      // Channel Editor Modal
      if (prev.channelEditorOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, channelEditorOpen: false };
          case 'ok':
            // Если выбран "Телеканал", открываем список каналов
            if (prev.channelEditorIndex === 0) {
              return { ...prev, channelEditorOpen: false, channelListOpen: true, selectedChannelIndex: 0 };
            }
            return { ...prev, channelEditorOpen: false };
          case 'up':
            return {
              ...prev,
              channelEditorIndex:
                (prev.channelEditorIndex + CHANNEL_EDITOR_ITEMS.length - 1) % CHANNEL_EDITOR_ITEMS.length,
            };
          case 'down':
            return {
              ...prev,
              channelEditorIndex:
                (prev.channelEditorIndex + 1) % CHANNEL_EDITOR_ITEMS.length,
            };
          default:
            return prev;
        }
      }
      // Settings Modal
      if (prev.settingsModalOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, settingsModalOpen: false };
          case 'ok':
            if (prev.settingsModalIndex === 0) {
              return { ...prev, settingsModalOpen: false, languageSettingsModalOpen: true, languageSettingsModalIndex: 0 };
            }
            if (prev.settingsModalIndex === 5) {
              return { ...prev, settingsModalOpen: false, abSettingsModalOpen: true, abSettingsModalIndex: 0 };
            }
            if (prev.settingsModalIndex === 14) {
              return { ...prev, settingsModalOpen: false, accessCardModalOpen: true, accessCardModalIndex: 0 };
            }
            // Здесь можно добавить обработку выбора других пунктов настроек
            return { ...prev, settingsModalOpen: false };
          case 'up':
            return {
              ...prev,
              settingsModalIndex: (prev.settingsModalIndex + SETTINGS_MENU_ITEMS.length - 1) % SETTINGS_MENU_ITEMS.length,
            };
          case 'down':
            return {
              ...prev,
              settingsModalIndex: (prev.settingsModalIndex + 1) % SETTINGS_MENU_ITEMS.length,
            };
          default:
            return prev;
        }
      }
      // Language Settings Modal
      if (prev.languageSettingsModalOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, languageSettingsModalOpen: false };
          case 'ok':
            // Здесь можно добавить обработку выбора языка
            return prev;
          case 'up':
            return {
              ...prev,
              languageSettingsModalIndex: (prev.languageSettingsModalIndex + LANGUAGE_SETTINGS_ITEMS.length - 1) % LANGUAGE_SETTINGS_ITEMS.length,
            };
          case 'down':
            return {
              ...prev,
              languageSettingsModalIndex: (prev.languageSettingsModalIndex + 1) % LANGUAGE_SETTINGS_ITEMS.length,
            };
          case 'left': {
            const idx = prev.languageSettingsModalIndex;
            const opts = LANGUAGE_SETTINGS_ITEMS[idx].options;
            const newVals = [...prev.languageSettingsValues];
            newVals[idx] = (newVals[idx] + opts.length - 1) % opts.length;
            return { ...prev, languageSettingsValues: newVals };
          }
          case 'right': {
            const idx = prev.languageSettingsModalIndex;
            const opts = LANGUAGE_SETTINGS_ITEMS[idx].options;
            const newVals = [...prev.languageSettingsValues];
            newVals[idx] = (newVals[idx] + 1) % opts.length;
            return { ...prev, languageSettingsValues: newVals };
          }
          default:
            return prev;
        }
      }
      // Install Modal
      if (prev.installModalOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, installModalOpen: false };
          case 'ok':
            if (prev.installModalIndex === 0) {
              return { ...prev, installModalOpen: false, antennaSetupModalOpen: true };
            }
            return { ...prev, installModalOpen: false };
          case 'up':
            return {
              ...prev,
              installModalIndex: (prev.installModalIndex + INSTALL_MENU_ITEMS.length - 1) % INSTALL_MENU_ITEMS.length,
            };
          case 'down':
            return {
              ...prev,
              installModalIndex: (prev.installModalIndex + 1) % INSTALL_MENU_ITEMS.length,
            };
          default:
            return prev;
        }
      }
      // Antenna Setup Modal
      if (prev.antennaSetupModalOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, antennaSetupModalOpen: false, installModalOpen: true, installModalIndex: 0 };
          case 'up':
            return {
              ...prev,
              antennaSetupIndex: (prev.antennaSetupIndex + ANTENNA_SETUP_ITEMS.length - 1) % ANTENNA_SETUP_ITEMS.length,
            };
          case 'down':
            return {
              ...prev,
              antennaSetupIndex: (prev.antennaSetupIndex + 1) % ANTENNA_SETUP_ITEMS.length,
            };
          case 'left': {
            const idx = prev.antennaSetupIndex;
            const opts = ANTENNA_SETUP_ITEMS[idx].options;
            if (!opts) return prev;
            const newVals = [...prev.antennaSetupValues];
            newVals[idx] = (newVals[idx] + opts.length - 1) % opts.length;
            return { ...prev, antennaSetupValues: newVals };
          }
          case 'right': {
            const idx = prev.antennaSetupIndex;
            const opts = ANTENNA_SETUP_ITEMS[idx].options;
            if (!opts) return prev;
            const newVals = [...prev.antennaSetupValues];
            newVals[idx] = (newVals[idx] + 1) % opts.length;
            return { ...prev, antennaSetupValues: newVals };
          }
          case 'ok':
            // Здесь можно добавить обработку OK для выбранного пункта
            return prev;
          default:
            return prev;
        }
      }
      // AB Settings Modal
      if (prev.abSettingsModalOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, abSettingsModalOpen: false };
          case 'ok':
            // Здесь можно добавить обработку выбора
            return prev;
          case 'up':
            return {
              ...prev,
              abSettingsModalIndex: (prev.abSettingsModalIndex + AB_SETTINGS_ITEMS.length - 1) % AB_SETTINGS_ITEMS.length,
            };
          case 'down':
            return {
              ...prev,
              abSettingsModalIndex: (prev.abSettingsModalIndex + 1) % AB_SETTINGS_ITEMS.length,
            };
          case 'left': {
            const idx = prev.abSettingsModalIndex;
            const opts = AB_SETTINGS_ITEMS[idx].options;
            const newVals = [...prev.abSettingsValues];
            newVals[idx] = (newVals[idx] + opts.length - 1) % opts.length;
            return { ...prev, abSettingsValues: newVals };
          }
          case 'right': {
            const idx = prev.abSettingsModalIndex;
            const opts = AB_SETTINGS_ITEMS[idx].options;
            const newVals = [...prev.abSettingsValues];
            newVals[idx] = (newVals[idx] + 1) % opts.length;
            return { ...prev, abSettingsValues: newVals };
          }
          default:
            return prev;
        }
      }
      // Access Card Modal
      if (prev.accessCardModalOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, accessCardModalOpen: false };
          case 'ok':
            // Открытие conaxInfoModalOpen при выборе первого пункта в accessCardModalOpen (accessCardModalIndex === 0 и OK)
            if (prev.accessCardModalIndex === 0) {
              return { ...prev, accessCardModalOpen: false, conaxInfoModalOpen: true };
            }
            // Открытие subscriptionStatusModalOpen при выборе последнего пункта в accessCardModalOpen (accessCardModalIndex === 3 и OK)
            if (prev.accessCardModalIndex === 3) {
              return { ...prev, accessCardModalOpen: false, subscriptionStatusModalOpen: true };
            }
            return prev;
          case 'up':
            return {
              ...prev,
              accessCardModalIndex: (prev.accessCardModalIndex + ACCESS_CARD_ITEMS.length - 1) % ACCESS_CARD_ITEMS.length,
            };
          case 'down':
            return {
              ...prev,
              accessCardModalIndex: (prev.accessCardModalIndex + 1) % ACCESS_CARD_ITEMS.length,
            };
          default:
            return prev;
        }
      }
      // Conax Info Modal
      if (prev.conaxInfoModalOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, conaxInfoModalOpen: false, accessCardModalOpen: true, accessCardModalIndex: 0 };
          default:
            return prev;
        }
      }
      // Subscription Status Modal
      if (prev.subscriptionStatusModalOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, subscriptionStatusModalOpen: false, accessCardModalOpen: true, accessCardModalIndex: 3 };
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
          if (prev.selectedIcon === 0) {
            return { ...prev, channelEditorOpen: true, channelEditorIndex: 0 };
          }
          if (prev.selectedIcon === 1) {
            return { ...prev, settingsModalOpen: true, settingsModalIndex: 0 };
          }
          if (prev.selectedIcon === 2) {
            return { ...prev, installModalOpen: true, installModalIndex: 0 };
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