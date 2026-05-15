import type { Weekday } from '../data/schedule';

const ORDER: Weekday[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

export function todayName(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('es-CL', {
    weekday: 'long',
    timeZone: 'America/Santiago',
  }).format(now).toLowerCase();
}

export function nextSchoolDay(now: Date = new Date()): Weekday {
  switch (todayName(now)) {
    case 'lunes':     return 'martes';
    case 'martes':    return 'miércoles';
    case 'miércoles': return 'jueves';
    case 'jueves':    return 'viernes';
    default:          return 'lunes';
  }
}

export function isWeekendGap(now: Date = new Date()): boolean {
  const t = todayName(now);
  return t === 'viernes' || t === 'sábado';
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export { ORDER };
