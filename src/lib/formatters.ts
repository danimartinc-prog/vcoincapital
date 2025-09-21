import i18n from '@/lib/i18n';

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat(i18n.language).format(value);
};

export const formatCurrency = (value: number, currency = 'EUR'): string => {
  return new Intl.NumberFormat(i18n.language, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return new Intl.NumberFormat(i18n.language, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatShortDate = (date: Date): string => {
  return new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};