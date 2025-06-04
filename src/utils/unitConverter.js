export const convertTemp = (temp, unit) => {
  if (unit === 'imperial') {
    return Math.round(temp);
  } else {
    return Math.round(temp);
  }
};

export const getTempUnitSymbol = (unit) => {
  return unit === 'imperial' ? '°F' : '°C';
};