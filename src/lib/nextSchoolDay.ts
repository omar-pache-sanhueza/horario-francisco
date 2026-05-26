import type { Weekday } from '../data/schedule';
import { feriados, vacaciones } from '../data/calendario';

const ORDER: Weekday[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

const WEEKDAY_NAME: Record<number, string> = {
  0: 'domingo', 1: 'lunes', 2: 'martes', 3: 'miércoles',
  4: 'jueves', 5: 'viernes', 6: 'sábado',
};

const feriadosSet = new Set(feriados);

// Fecha calendario de hoy en Santiago, como YYYY-MM-DD.
function isoSantiago(now: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now);
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function esDiaDeClases(d: Date): boolean {
  const dow = d.getUTCDay();
  if (dow === 0 || dow === 6) return false;
  const s = iso(d);
  if (feriadosSet.has(s)) return false;
  for (const v of vacaciones) {
    if (s >= v.desde && s <= v.hasta) return false;
  }
  return true;
}

export interface NextDay {
  day: Weekday;
  gap: boolean;
}

// Próximo día con clases. gap = true cuando ese día no es mañana
// (porque mañana cae en fin de semana, feriado o vacaciones).
export function nextSchoolDay(now: Date = new Date()): NextDay {
  const [y, m, d] = isoSantiago(now).split('-').map(Number);
  const cursor = new Date(Date.UTC(y, m - 1, d));
  let gap = false;
  for (let i = 0; i < 60; i++) {
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    if (esDiaDeClases(cursor)) {
      return { day: WEEKDAY_NAME[cursor.getUTCDay()] as Weekday, gap };
    }
    gap = true;
  }
  return { day: 'lunes', gap: true };
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export { ORDER };
