import React, { createContext, useContext, useState } from 'react';
import { ANTENNA_SETUP_ITEMS } from '../data/antennaSetup';
import { SEARCH_SETTINGS_ITEMS } from '../data/searchSettings';

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
  searchSettingsModalOpen: boolean;
  searchSettingsModalIndex: number;
  channelSearchProgressModalOpen: boolean;
  channelSearchProgress: number;
  channelSearchTVList: string[];
  channelSearchRadioList: string[];
}

interface TVControlContextType {
  tvState: TVState;
  sendCommand: (cmd: TVCommand | any) => void;
}

const TVControlContext = createContext<TVControlContextType | undefined>(undefined);

const CHANNEL_EDITOR_ITEMS = [
  'Телеканал',
  'Радиоканал',
  'Удалить все',
];

const DEFAULT_CHANNEL_LIST = [
  { name: '.RED HD', info: 'Express 80\n12049 / H / 31999\n.RED HD\nPID V:60 A:61 PCR:60' },
  { name: '.SCI-FI', info: 'Express 80\n12049 / H / 31999\n.SCI-FI\nPID V:62 A:63 PCR:62' },
  { name: '5 КАНАЛ', info: 'Express 80\n12049 / H / 31999\n5 КАНАЛ\nPID V:64 A:65 PCR:64' },
  { name: '7 СИТОРА HD', info: 'Express 80\n12049 / H / 31999\n7 СИТОРА HD\nPID V:66 A:67 PCR:66' },
  { name: 'ANI', info: 'Express 80\n12049 / H / 31999\nANI\nPID V:68 A:69 PCR:68' },
  { name: 'Animal Planet HD', info: 'Express 80\n12049 / H / 31999\nAnimal Planet HD\nPID V:70 A:71 PCR:70' },
  { name: 'ANIME', info: 'Express 80\n12049 / H / 31999\nANIME\nPID V:72 A:73 PCR:72' },
  { name: 'BOLAJON', info: 'Express 80\n12049 / H / 31999\nBOLAJON\nPID V:74 A:75 PCR:74' },
  { name: 'BOLLYWOOD', info: 'Express 80\n12049 / H / 31999\nBOLLYWOOD\nPID V:76 A:77 PCR:76' },
  { name: 'CINEMA', info: 'Express 80\n12049 / H / 31999\nCINEMA\nPID V:78 A:79 PCR:78' },
  { name: 'CTC KIDS', info: 'Express 80\n12049 / H / 31999\nCTC KIDS\nPID V:80 A:81 PCR:80' },
  { name: 'DA VINCI KIDS', info: 'Express 80\n12049 / H / 31999\nDA VINCI KIDS\nPID V:82 A:83 PCR:82' },
  { name: 'DISCOVERY CHANNEL', info: 'Express 80\n12049 / H / 31999\nDISCOVERY CHANNEL\nPID V:84 A:85 PCR:84' },
  { name: 'DISCOVERY ID', info: 'Express 80\n12049 / H / 31999\nDISCOVERY ID\nPID V:86 A:87 PCR:86' },
  { name: 'Disney', info: 'Express 80\n12049 / H / 31999\nDisney\nPID V:88 A:89 PCR:88' },
  { name: 'DIZI', info: 'Express 80\n12049 / H / 31999\nDIZI\nPID V:90 A:91 PCR:90' },
  { name: 'English Club', info: 'Express 80\n12049 / H / 31999\nEnglish Club\nPID V:92 A:93 PCR:92' },
  { name: 'EURONEWS', info: 'Express 80\n12049 / H / 31999\nEURONEWS\nPID V:94 A:95 PCR:94' },
  { name: 'EUROPA-PLUS TV', info: 'Express 80\n12049 / H / 31999\nEUROPA-PLUS TV\nPID V:96 A:97 PCR:96' },
  { name: 'EUROSPORT 1', info: 'Express 80\n12049 / H / 31999\nEUROSPORT 1\nPID V:98 A:99 PCR:98' },
  { name: 'EUROSPORT 2', info: 'Express 80\n12049 / H / 31999\nEUROSPORT 2\nPID V:100 A:101 PCR:100' },
  { name: 'Extreme Sports', info: 'Express 80\n12049 / H / 31999\nExtreme Sports\nPID V:102 A:103 PCR:102' },
  { name: 'FIGHTBOX', info: 'Express 80\n12049 / H / 31999\nFIGHTBOX\nPID V:104 A:105 PCR:104' },
  { name: 'GAME - TV HD', info: 'Express 80\n12049 / H / 31999\nGAME - TV HD\nPID V:106 A:107 PCR:106' },
  { name: 'GEM-BOLLYWOOD', info: 'Express 80\n12049 / H / 31999\nGEM-BOLLYWOOD\nPID V:108 A:109 PCR:108' },
  { name: 'GEM-FOOD', info: 'Express 80\n12049 / H / 31999\nGEM-FOOD\nPID V:110 A:111 PCR:110' },
  { name: 'ВОСТОК ТВ', info: 'Express 80\n12049 / H / 31999\nВОСТОК ТВ\nPID V:112 A:113 PCR:112' },
  { name: 'GEM-RIVER', info: 'Express 80\n12049 / H / 31999\nGEM-RIVER\nPID V:114 A:115 PCR:114' },
  { name: 'KHL', info: 'Express 80\n12049 / H / 31999\nKHL\nPID V:116 A:117 PCR:116' },
  { name: 'KHL PRIME HD', info: 'Express 80\n12049 / H / 31999\nKHL PRIME HD\nPID V:118 A:119 PCR:118' },
  { name: 'KINOTEATR', info: 'Express 80\n12049 / H / 31999\nKINOTEATR\nPID V:120 A:121 PCR:120' },
  { name: 'MADANIYAT VA MA`RIFAT', info: 'Express 80\n12049 / H / 31999\nMADANIYAT VA MA`RIFAT\nPID V:122 A:123 PCR:122' },
  { name: 'MAHALLA', info: 'Express 80\n12049 / H / 31999\nMAHALLA\nPID V:124 A:125 PCR:124' },
  { name: 'Milliy TV', info: 'Express 80\n12049 / H / 31999\nMilliy TV\nPID V:126 A:127 PCR:126' },
  { name: 'MMA-TV', info: 'Express 80\n12049 / H / 31999\nMMA-TV\nPID V:128 A:129 PCR:128' },
  { name: 'My5', info: 'Express 80\n12049 / H / 31999\nMy5\nPID V:130 A:131 PCR:130' },
  { name: 'NAT GEO WILD HD', info: 'Express 80\n12049 / H / 31999\nNAT GEO WILD HD\nPID V:132 A:133 PCR:132' },
  { name: 'NATIONAL GEOGRAPHIC HD', info: 'Express 80\n12049 / H / 31999\nNATIONAL GEOGRAPHIC HD\nPID V:134 A:135 PCR:134' },
  { name: 'NAVO', info: 'Express 80\n12049 / H / 31999\nNAVO\nPID V:136 A:137 PCR:136' },
  { name: 'NICK JUNIOR', info: 'Express 80\n12049 / H / 31999\nNICK JUNIOR\nPID V:138 A:139 PCR:138' },
  { name: 'OCEAN TV', info: 'Express 80\n12049 / H / 31999\nOCEAN TV\nPID V:140 A:141 PCR:140' },
  { name: 'PMC HD', info: 'Express 80\n12049 / H / 31999\nPMC HD\nPID V:142 A:143 PCR:142' },
  { name: 'Ru TV', info: 'Express 80\n12049 / H / 31999\nRu TV\nPID V:144 A:145 PCR:144' },
  { name: 'SAUDI QURAN HD', info: 'Express 80\n12049 / H / 31999\nSAUDI QURAN HD\nPID V:146 A:147 PCR:146' },
  { name: 'Saudi Sunnah HD', info: 'Express 80\n12049 / H / 31999\nSaudi Sunnah HD\nPID V:148 A:149 PCR:148' },
  { name: 'SETANTA SPORT 1 HD', info: 'Express 80\n12049 / H / 31999\nSETANTA SPORT 1 HD\nPID V:150 A:151 PCR:150' },
  { name: 'SETANTA SPORT 2', info: 'Express 80\n12049 / H / 31999\nSETANTA SPORT 2\nPID V:152 A:153 PCR:152' },
  { name: 'SEVIMLI TV', info: 'Express 80\n12049 / H / 31999\nSEVIMLI TV\nPID V:154 A:155 PCR:154' },
  { name: 'SPORT PREM 01', info: 'Express 80\n12049 / H / 31999\nSPORT PREM 01\nPID V:156 A:157 PCR:156' },
  { name: 'SPORT PREM 02', info: 'Express 80\n12049 / H / 31999\nSPORT PREM 02\nPID V:158 A:159 PCR:158' },
  { name: 'SPORT PREM 03', info: 'Express 80\n12049 / H / 31999\nSPORT PREM 03\nPID V:160 A:161 PCR:160' },
  { name: 'SPORT PREM 04', info: 'Express 80\n12049 / H / 31999\nSPORT PREM 04\nPID V:162 A:163 PCR:162' },
  { name: 'SPORT PREM 05', info: 'Express 80\n12049 / H / 31999\nSPORT PREM 05\nPID V:164 A:165 PCR:164' },
  { name: 'SPORT PREM 06', info: 'Express 80\n12049 / H / 31999\nSPORT PREM 06\nPID V:166 A:167 PCR:166' },
  { name: 'START WORLD', info: 'Express 80\n12049 / H / 31999\nSTART WORLD\nPID V:168 A:169 PCR:168' },
  { name: 'TLC', info: 'Express 80\n12049 / H / 31999\nTLC\nPID V:170 A:171 PCR:170' },
  { name: 'TV1000', info: 'Express 80\n12049 / H / 31999\nTV1000\nPID V:172 A:173 PCR:172' },
  { name: 'TV-1000 EAST', info: 'Express 80\n12049 / H / 31999\nTV-1000 EAST\nPID V:174 A:175 PCR:174' },
  { name: 'TV1000 Русское кино', info: 'Express 80\n12049 / H / 31999\nTV1000 Русское кино\nPID V:176 A:177 PCR:176' },
  { name: 'UFC TV HD', info: 'Express 80\n12049 / H / 31999\nUFC TV HD\nPID V:178 A:179 PCR:178' },
  { name: 'VIASAT HISTORY', info: 'Express 80\n12049 / H / 31999\nVIASAT HISTORY\nPID V:180 A:181 PCR:180' },
  { name: 'VIASAT SPORT', info: 'Express 80\n12049 / H / 31999\nVIASAT SPORT\nPID V:182 A:183 PCR:182' },
  { name: 'VIP MEGAHIT HD', info: 'Express 80\n12049 / H / 31999\nVIP MEGAHIT HD\nPID V:184 A:185 PCR:184' },
  { name: 'VIP PREIMERE HD', info: 'Express 80\n12049 / H / 31999\nVIP PREIMERE HD\nPID V:186 A:187 PCR:186' },
  { name: 'VIP-COMEDY', info: 'Express 80\n12049 / H / 31999\nVIP-COMEDY\nPID V:188 A:189 PCR:188' },
  { name: 'YOSHLAR', info: 'Express 80\n12049 / H / 31999\nYOSHLAR\nPID V:190 A:191 PCR:190' },
  { name: 'ZOR-TV', info: 'Express 80\n12049 / H / 31999\nZOR-TV\nPID V:192 A:193 PCR:192' },
  { name: 'АВТО 24', info: 'Express 80\n12049 / H / 31999\nАВТО 24\nPID V:194 A:195 PCR:194' },
  { name: 'АЗИЯ HD', info: 'Express 80\n12049 / H / 31999\nАЗИЯ HD\nPID V:196 A:197 PCR:196' },
  { name: 'АНТ', info: 'Express 80\n12049 / H / 31999\nАНТ\nPID V:198 A:199 PCR:198' },
  { name: 'АНТ Бизнес', info: 'Express 80\n12049 / H / 31999\nАНТ Бизнес\nPID V:200 A:201 PCR:200' },
  { name: 'Ант-Comedy HD', info: 'Express 80\n12049 / H / 31999\nАнт-Comedy HD\nPID V:202 A:203 PCR:202' },
  { name: 'АНТ-КИНО HD', info: 'Express 80\n12049 / H / 31999\nАНТ-КИНО HD\nPID V:204 A:205 PCR:204' },
  { name: 'АНТ-КУДАКОНА HD', info: 'Express 80\n12049 / H / 31999\nАНТ-КУДАКОНА HD\nPID V:206 A:207 PCR:206' },
  { name: 'АНТ-МУЗЫКА', info: 'Express 80\n12049 / H / 31999\nАНТ-МУЗЫКА\nPID V:208 A:209 PCR:208' },
  { name: 'АНТ-ОИЛА HD', info: 'Express 80\n12049 / H / 31999\nАНТ-ОИЛА HD\nPID V:210 A:211 PCR:210' },
  { name: 'АНТ-ОЛАМ HD', info: 'Express 80\n12049 / H / 31999\nАНТ-ОЛАМ HD\nPID V:212 A:213 PCR:212' },
  { name: 'АНТ-ПРЕМИУМ HD', info: 'Express 80\n12049 / H / 31999\nАНТ-ПРЕМИУМ HD\nPID V:214 A:215 PCR:214' },
  { name: 'АНТ-СEРИАЛ', info: 'Express 80\n12049 / H / 31999\nАНТ-СEРИАЛ\nPID V:216 A:217 PCR:216' },
  { name: 'АНТ-ШАШМАКОМ', info: 'Express 80\n12049 / H / 31999\nАНТ-ШАШМАКОМ\nPID V:218 A:219 PCR:218' },
  { name: 'БАХОРИСТОН', info: 'Express 80\n12049 / H / 31999\nБАХОРИСТОН\nPID V:220 A:221 PCR:220' },
  { name: 'БОКС ТВ', info: 'Express 80\n12049 / H / 31999\nБОКС ТВ\nPID V:222 A:223 PCR:222' },
  { name: 'БОЛЬШАЯ АЗИЯ', info: 'Express 80\n12049 / H / 31999\nБОЛЬШАЯ АЗИЯ\nPID V:224 A:225 PCR:224' },
  { name: 'ВАРЗИШ HD', info: 'Express 80\n12049 / H / 31999\nВАРЗИШ HD\nPID V:226 A:227 PCR:226' },
  { name: 'ГЛАЗАМИ ТУРИСТА HD', info: 'Express 80\n12049 / H / 31999\nГЛАЗАМИ ТУРИСТА HD\nPID V:228 A:229 PCR:228' },
  { name: 'ДЕТСКИЙ МИР', info: 'Express 80\n12049 / H / 31999\nДЕТСКИЙ МИР\nPID V:230 A:231 PCR:230' },
  { name: 'ДИЁР HD', info: 'Express 80\n12049 / H / 31999\nДИЁР HD\nPID V:232 A:233 PCR:232' },
  { name: 'ДИКАЯ ОХОТА HD', info: 'Express 80\n12049 / H / 31999\nДИКАЯ ОХОТА HD\nPID V:234 A:235 PCR:234' },
  { name: 'ДИКАЯ РЫБАЛКА HD', info: 'Express 80\n12049 / H / 31999\nДИКАЯ РЫБАЛКА HD\nPID V:236 A:237 PCR:236' },
  { name: 'ДИКИЙ', info: 'Express 80\n12049 / H / 31999\nДИКИЙ\nPID V:238 A:239 PCR:238' },
  { name: 'ДОКТОР', info: 'Express 80\n12049 / H / 31999\nДОКТОР\nPID V:240 A:241 PCR:240' },
  { name: 'ДОМ КИНО', info: 'Express 80\n12049 / H / 31999\nДОМ КИНО\nPID V:242 A:243 PCR:242' },
  { name: 'ДОМАШНИЙ', info: 'Express 80\n12049 / H / 31999\nДОМАШНИЙ\nPID V:244 A:245 PCR:244' },
  { name: 'ДУШАНБЕ HD', info: 'Express 80\n12049 / H / 31999\nДУШАНБЕ HD\nPID V:246 A:247 PCR:246' },
  { name: 'ЖИВАЯ ПРИРОДА HD', info: 'Express 80\n12049 / H / 31999\nЖИВАЯ ПРИРОДА HD\nPID V:248 A:249 PCR:248' },
  { name: 'ЖИВИ АКТИВНО HD', info: 'Express 80\n12049 / H / 31999\nЖИВИ АКТИВНО HD\nPID V:250 A:251 PCR:250' },
  { name: 'ЗАЛ СУДА', info: 'Express 80\n12049 / H / 31999\nЗАЛ СУДА\nPID V:252 A:253 PCR:252' },
  { name: 'ЗВЕЗДА', info: 'Express 80\n12049 / H / 31999\nЗВЕЗДА\nPID V:254 A:255 PCR:254' },
  { name: 'ЗООПАРК', info: 'Express 80\n12049 / H / 31999\nЗООПАРК\nPID V:256 A:257 PCR:256' },
  { name: 'ИЗВЕСТИЯ', info: 'Express 80\n12049 / H / 31999\nИЗВЕСТИЯ\nPID V:258 A:259 PCR:258' },
  { name: 'ИЛМ ва ТАБИАТ', info: 'Express 80\n12049 / H / 31999\nИЛМ ва ТАБИАТ\nPID V:260 A:261 PCR:260' },
  { name: 'ИНДИЙСКОЕ КИНО', info: 'Express 80\n12049 / H / 31999\nИНДИЙСКОЕ КИНО\nPID V:262 A:263 PCR:262' },
  { name: 'Индия', info: 'Express 80\n12049 / H / 31999\nИндия\nPID V:264 A:265 PCR:264' },
  { name: 'ИСТОРИЯ', info: 'Express 80\n12049 / H / 31999\nИСТОРИЯ\nPID V:266 A:267 PCR:266' },
  { name: 'КАРУСЕЛЬ', info: 'Express 80\n12049 / H / 31999\nКАРУСЕЛЬ\nPID V:268 A:269 PCR:268' },
  { name: 'КВН ТВ', info: 'Express 80\n12049 / H / 31999\nКВН ТВ\nPID V:270 A:271 PCR:270' },
  { name: 'КИНЕКО', info: 'Express 80\n12049 / H / 31999\nКИНЕКО\nPID V:272 A:273 PCR:272' },
  { name: 'КИНО ТВ HD', info: 'Express 80\n12049 / H / 31999\nКИНО ТВ HD\nPID V:274 A:275 PCR:274' },
  { name: 'КИНОМИКС HD', info: 'Express 80\n12049 / H / 31999\nКИНОМИКС HD\nPID V:276 A:277 PCR:276' },
  { name: 'КИНОПРЕМЬЕРА HD', info: 'Express 80\n12049 / H / 31999\nКИНОПРЕМЬЕРА HD\nPID V:278 A:279 PCR:278' },
  { name: 'КИНОСЕМЬЯ HD', info: 'Express 80\n12049 / H / 31999\nКИНОСЕМЬЯ HD\nPID V:280 A:281 PCR:280' },
  { name: 'КИНОХИТ HD', info: 'Express 80\n12049 / H / 31999\nКИНОХИТ HD\nPID V:282 A:283 PCR:282' },
  { name: 'КОМЕДИЯ', info: 'Express 80\n12049 / H / 31999\nКОМЕДИЯ\nPID V:284 A:285 PCR:284' },
  { name: 'КУХНЯ ТВ', info: 'Express 80\n12049 / H / 31999\nКУХНЯ ТВ\nPID V:286 A:287 PCR:286' },
  { name: 'Лёва', info: 'Express 80\n12049 / H / 31999\nЛёва\nPID V:288 A:289 PCR:288' },
  { name: 'ЛЮБИМОЕ КИНО', info: 'Express 80\n12049 / H / 31999\nЛЮБИМОЕ КИНО\nPID V:290 A:291 PCR:290' },
  { name: 'МАМА', info: 'Express 80\n12049 / H / 31999\nМАМА\nPID V:292 A:293 PCR:292' },
  { name: 'МАТЧ! HD', info: 'Express 80\n12049 / H / 31999\nМАТЧ! HD\nPID V:294 A:295 PCR:294' },
  { name: 'МАТЧ! БОЕЦ', info: 'Express 80\n12049 / H / 31999\nМАТЧ! БОЕЦ\nPID V:296 A:297 PCR:296' },
  { name: 'МАТЧ! ПРЕМЬЕР HD', info: 'Express 80\n12049 / H / 31999\nМАТЧ! ПРЕМЬЕР HD\nPID V:298 A:299 PCR:298' },
  { name: 'МАТЧ! СТРАНА', info: 'Express 80\n12049 / H / 31999\nМАТЧ! СТРАНА\nPID V:300 A:301 PCR:300' },
  { name: 'МАТЧ! ФУТБОЛ 1', info: 'Express 80\n12049 / H / 31999\nМАТЧ! ФУТБОЛ 1\nPID V:302 A:303 PCR:302' },
  { name: 'МАТЧ! ФУТБОЛ 2', info: 'Express 80\n12049 / H / 31999\nМАТЧ! ФУТБОЛ 2\nPID V:304 A:305 PCR:304' },
  { name: 'МАТЧ! ФУТБОЛ 3', info: 'Express 80\n12049 / H / 31999\nМАТЧ! ФУТБОЛ 3\nPID V:306 A:307 PCR:306' },
  { name: 'МИР', info: 'Express 80\n12049 / H / 31999\nМИР\nPID V:308 A:309 PCR:308' },
  { name: 'МИР 24', info: 'Express 80\n12049 / H / 31999\nМИР 24\nPID V:310 A:311 PCR:310' },
  { name: 'МИР СЕРИАЛА', info: 'Express 80\n12049 / H / 31999\nМИР СЕРИАЛА\nPID V:312 A:313 PCR:312' },
  { name: 'МОСФИЛЬМ', info: 'Express 80\n12049 / H / 31999\nМОСФИЛЬМ\nPID V:314 A:315 PCR:314' },
  { name: 'МОЯ ПЛАНЕТА', info: 'Express 80\n12049 / H / 31999\nМОЯ ПЛАНЕТА\nPID V:316 A:317 PCR:316' },
  { name: 'МУЖСКОЕ КИНО', info: 'Express 80\n12049 / H / 31999\nМУЖСКОЕ КИНО\nPID V:318 A:319 PCR:318' },
  { name: 'МУЗ-ТВ', info: 'Express 80\n12049 / H / 31999\nМУЗ-ТВ\nPID V:320 A:321 PCR:320' },
  { name: 'МУЛЬТ', info: 'Express 80\n12049 / H / 31999\nМУЛЬТ\nPID V:322 A:323 PCR:322' },
  { name: 'МУЛЬТ И МУЗЫКА', info: 'Express 80\n12049 / H / 31999\nМУЛЬТ И МУЗЫКА\nPID V:324 A:325 PCR:324' },
  { name: 'НАУКА 2.0', info: 'Express 80\n12049 / H / 31999\nНАУКА 2.0\nPID V:326 A:327 PCR:326' },
  { name: 'НОСТАЛЬГИЯ', info: 'Express 80\n12049 / H / 31999\nНОСТАЛЬГИЯ\nPID V:328 A:329 PCR:328' },
  { name: 'НСТВ', info: 'Express 80\n12049 / H / 31999\nНСТВ\nPID V:330 A:331 PCR:330' },
  { name: 'НТВ (+2)', info: 'Express 80\n12049 / H / 31999\nНТВ (+2)\nPID V:332 A:333 PCR:332' },
  { name: 'НТВ HD', info: 'Express 80\n12049 / H / 31999\nНТВ HD\nPID V:334 A:335 PCR:334' },
  { name: 'НТВ СЕРИАЛ', info: 'Express 80\n12049 / H / 31999\nНТВ СЕРИАЛ\nPID V:336 A:337 PCR:336' },
  { name: 'НТВ- СТИЛЬ', info: 'Express 80\n12049 / H / 31999\nНТВ- СТИЛЬ\nPID V:338 A:339 PCR:338' },
  { name: 'НТВ ХИТ', info: 'Express 80\n12049 / H / 31999\nНТВ ХИТ\nPID V:340 A:341 PCR:340' },
  { name: 'ОХОТА И РЫБАЛКА', info: 'Express 80\n12049 / H / 31999\nОХОТА И РЫБАЛКА\nPID V:342 A:343 PCR:342' },
  { name: 'ПЕРВЫЙ КАНАЛ +4', info: 'Express 80\n12049 / H / 31999\nПЕРВЫЙ КАНАЛ +4\nPID V:344 A:345 PCR:344' },
  { name: 'ПЕРВЫЙ КАНАЛ HD', info: 'Express 80\n12049 / H / 31999\nПЕРВЫЙ КАНАЛ HD\nPID V:346 A:347 PCR:346' },
  { name: 'ПОБЕДА', info: 'Express 80\n12049 / H / 31999\nПОБЕДА\nPID V:348 A:349 PCR:348' },
  { name: 'ПЯТНИЦА', info: 'Express 80\n12049 / H / 31999\nПЯТНИЦА\nPID V:350 A:351 PCR:350' },
  { name: 'РБК', info: 'Express 80\n12049 / H / 31999\nРБК\nPID V:352 A:353 PCR:352' },
  { name: 'РЕН ТВ', info: 'Express 80\n12049 / H / 31999\nРЕН ТВ\nPID V:354 A:355 PCR:354' },
  { name: 'Родное Кино', info: 'Express 80\n12049 / H / 31999\nРодное Кино\nPID V:356 A:357 PCR:356' },
  { name: 'РОССИЯ +4', info: 'Express 80\n12049 / H / 31999\nРОССИЯ +4\nPID V:358 A:359 PCR:358' },
  { name: 'РОССИЯ 24', info: 'Express 80\n12049 / H / 31999\nРОССИЯ 24\nPID V:360 A:361 PCR:360' },
  { name: 'РОССИЯ HD', info: 'Express 80\n12049 / H / 31999\nРОССИЯ HD\nPID V:362 A:363 PCR:362' },
  { name: 'РТР ПЛАНЕТА', info: 'Express 80\n12049 / H / 31999\nРТР ПЛАНЕТА\nPID V:364 A:365 PCR:364' },
  { name: 'Русский Бестселлер', info: 'Express 80\n12049 / H / 31999\nРусский Бестселлер\nPID V:366 A:367 PCR:366' },
  { name: 'РУССКИЙ ДЕТЕКТИВ', info: 'Express 80\n12049 / H / 31999\nРУССКИЙ ДЕТЕКТИВ\nPID V:368 A:369 PCR:368' },
  { name: 'РУССКИЙ РОМАН', info: 'Express 80\n12049 / H / 31999\nРУССКИЙ РОМАН\nPID V:370 A:371 PCR:370' },
  { name: 'САЛОМ ТВ', info: 'Express 80\n12049 / H / 31999\nСАЛОМ ТВ\nPID V:372 A:373 PCR:372' },
  { name: 'САПФИР', info: 'Express 80\n12049 / H / 31999\nСАПФИР\nPID V:374 A:375 PCR:374' },
  { name: 'САФИНА HD', info: 'Express 80\n12049 / H / 31999\nСАФИНА HD\nPID V:376 A:377 PCR:376' },
  { name: 'СИНАМО HD', info: 'Express 80\n12049 / H / 31999\nСИНАМО HD\nPID V:378 A:379 PCR:378' },
  { name: 'СМ-1', info: 'Express 80\n12049 / H / 31999\nСМ-1\nPID V:380 A:381 PCR:380' },
  { name: 'Солнце', info: 'Express 80\n12049 / H / 31999\nСолнце\nPID V:382 A:383 PCR:382' },
  { name: 'СОМОН', info: 'Express 80\n12049 / H / 31999\nСОМОН\nPID V:384 A:385 PCR:384' },
  { name: 'СТС +2', info: 'Express 80\n12049 / H / 31999\nСТС +2\nPID V:386 A:387 PCR:386' },
  { name: 'СТС HD', info: 'Express 80\n12049 / H / 31999\nСТС HD\nPID V:388 A:389 PCR:388' },
  { name: 'СУГД HD', info: 'Express 80\n12049 / H / 31999\nСУГД HD\nPID V:390 A:391 PCR:390' },
  { name: 'Т24', info: 'Express 80\n12049 / H / 31999\nТ24\nPID V:392 A:393 PCR:392' },
  { name: 'ТАНИН', info: 'Express 80\n12049 / H / 31999\nТАНИН\nPID V:394 A:395 PCR:394' },
  { name: 'ТВ Бадахшон', info: 'Express 80\n12049 / H / 31999\nТВ Бадахшон\nPID V:396 A:397 PCR:396' },
  { name: 'ТВ Гулакандоз', info: 'Express 80\n12049 / H / 31999\nТВ Гулакандоз\nPID V:398 A:399 PCR:398' },
  { name: 'ТВ САЙЕХИ', info: 'Express 80\n12049 / H / 31999\nТВ САЙЕХИ\nPID V:400 A:401 PCR:400' },
  { name: 'ТВЦ', info: 'Express 80\n12049 / H / 31999\nТВЦ\nPID V:402 A:403 PCR:402' },
  { name: 'ТВ-3', info: 'Express 80\n12049 / H / 31999\nТВ-3\nPID V:404 A:405 PCR:404' },
  { name: 'ТМТ ШАХНАВОЗ', info: 'Express 80\n12049 / H / 31999\nТМТ ШАХНАВОЗ\nPID V:406 A:407 PCR:406' },
  { name: 'ТНТ (+4)', info: 'Express 80\n12049 / H / 31999\nТНТ (+4)\nPID V:408 A:409 PCR:408' },
  { name: 'ТНТ HD', info: 'Express 80\n12049 / H / 31999\nТНТ HD\nPID V:410 A:411 PCR:410' },
  { name: 'ТНТ4', info: 'Express 80\n12049 / H / 31999\nТНТ4\nPID V:412 A:413 PCR:412' },
  { name: 'ТОЧИКИСТОН HD', info: 'Express 80\n12049 / H / 31999\nТОЧИКИСТОН HD\nPID V:414 A:415 PCR:414' },
  { name: 'Футбол ТЧ HD', info: 'Express 80\n12049 / H / 31999\nФутбол ТЧ HD\nPID V:416 A:417 PCR:416' },
  { name: 'ЧАХОНОРО', info: 'Express 80\n12049 / H / 31999\nЧАХОНОРО\nPID V:418 A:419 PCR:418' },
  { name: 'ЧАХОННАМО', info: 'Express 80\n12049 / H / 31999\nЧАХОННАМО\nPID V:420 A:421 PCR:420' },
  { name: 'ЧЕ', info: 'Express 80\n12049 / H / 31999\nЧЕ\nPID V:422 A:423 PCR:422' },
  { name: 'Ю ТВ', info: 'Express 80\n12049 / H / 31999\nЮ ТВ\nPID V:424 A:425 PCR:424' },
];

export { DEFAULT_CHANNEL_LIST };

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
    searchSettingsModalOpen: false,
    searchSettingsModalIndex: 0,
    channelSearchProgressModalOpen: false,
    channelSearchProgress: 0,
    channelSearchTVList: [],
    channelSearchRadioList: [],
  });

  function sendCommand(cmd: TVCommand | any) {
    setTvState(prev => {
      if (!prev.power) return prev;
      
      // Обработка прогресса поиска каналов (кастомная команда)
      if (cmd && typeof cmd === 'object' && cmd.type === 'search-progress') {
        return {
          ...prev,
          channelSearchProgress: cmd.progress,
          channelSearchTVList: cmd.tv,
          channelSearchRadioList: cmd.radio,
        };
      }
      
      // Обработка кастомных команд
      if (cmd && typeof cmd === 'object') {
        // Команда для открытия меню установки
        if (cmd.type === 'custom' && cmd.action === 'openInstall') {
          return {
            ...prev,
            installModalOpen: true,
            installModalIndex: 0,
            channelSearchProgressModalOpen: false
          };
        }
        
        // Команда для открытия меню установки антенны
        if (cmd.type === 'custom' && cmd.action === 'openAntennaSetup') {
          return {
            ...prev,
            installModalOpen: false,
            antennaSetupModalOpen: true,
            antennaSetupIndex: 0
          };
        }
      }
      
      // 1. Если открыта searchSettingsModalOpen — только она реагирует на команды
      if (prev.searchSettingsModalOpen) {
        switch (cmd) {
          case 'exit':
            return { ...prev, searchSettingsModalOpen: false };
          case 'up':
            return { ...prev, searchSettingsModalIndex: (prev.searchSettingsModalIndex + SEARCH_SETTINGS_ITEMS.length) % (SEARCH_SETTINGS_ITEMS.length + 1) };
          case 'down':
            return { ...prev, searchSettingsModalIndex: (prev.searchSettingsModalIndex + 1) % (SEARCH_SETTINGS_ITEMS.length + 1) };
          case 'left':
          case 'right':
            // Здесь можно добавить смену значения для выбранного пункта
            return prev;
          case 'ok':
            // Если выбрана кнопка 'Поиск', открываем модалку прогресса
            if (prev.searchSettingsModalIndex === SEARCH_SETTINGS_ITEMS.length) {
              return {
                ...prev,
                searchSettingsModalOpen: false,
                channelSearchProgressModalOpen: true,
                channelSearchProgress: 0,
                channelSearchTVList: [],
                channelSearchRadioList: [],
              };
            }
            // Иначе просто закрываем
            return { ...prev, searchSettingsModalOpen: false };
          default:
            return prev;
        }
      }
      
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
            // Если выбран пункт "Начать поиск", открываем searchSettingsModalOpen
            if (prev.antennaSetupIndex === ANTENNA_SETUP_ITEMS.length - 1) {
              return { ...prev, searchSettingsModalOpen: true, searchSettingsModalIndex: 0 };
            }
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