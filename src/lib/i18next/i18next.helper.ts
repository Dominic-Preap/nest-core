import { FormatFunction } from 'i18next';

export const format: FormatFunction = (value, format, lng) => {
  if (format === 'strong') return `<font color=#0a2751><b>${value}</b></font>`;
  return value;
};
