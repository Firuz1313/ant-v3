export const antennaOptions = {
  satellites: ['Express 80', 'Yamal 401', 'ABS 2A', 'KazSat 3'],
  lnbPower: ['18V', '13V', 'Выкл.'],
  lnbFreq: ['Universal1(9750/10600)', 'Universal2(9750/10750)', 'Single(10750)'],
  diseqc10: ['порт 1', 'порт 2', 'порт 3', 'порт 4'],
  diseqc11: ['Выкл.', 'порт 1', 'порт 2', 'порт 3', 'порт 4'],
  tp: ['11799 / H / 31999', '12049 / H / 31999', '12188 / V / 27500'],
};

export const ANTENNA_SETUP_ITEMS = [
  { label: 'Спутник', options: antennaOptions.satellites },
  { label: 'Питание LNB', options: antennaOptions.lnbPower },
  { label: 'Частота LNB', options: antennaOptions.lnbFreq },
  { label: '22K', options: ['Авто'] },
  { label: 'DiSEqC 1.0', options: antennaOptions.diseqc10 },
  { label: 'DiSEqC 1.1', options: antennaOptions.diseqc11 },
  { label: 'TP', options: antennaOptions.tp },
  { label: 'Начать поиск', options: ['Спутник'] },
]; 