export type Subject =
  | 'Lenguaje y Comunicación'
  | 'Matemática'
  | 'Historia, Geografía y Ciencias Sociales'
  | 'Ciencias Naturales'
  | 'Tecnología'
  | 'Educación Física y Salud'
  | 'Idioma Extranjero (Inglés)'
  | 'Artes Visuales'
  | 'Música'
  | 'Orientación'
  | 'Taller de Teatro'
  | 'Taller de Reforzamiento'
  | 'Karate';

export type Weekday = 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes';

export type Treatment = 'Miss' | 'Mister';

export interface Block {
  bloque: number;
  asignatura: Subject;
  profesor: string;
  trato: Treatment;
}

export const teacherTreatment: Record<string, Treatment> = {
  'Nelda Garcés': 'Miss',
  'Catalina Méndez': 'Miss',
  'Katya Castro': 'Miss',
  'Álvaro Rodríguez': 'Mister',
  'Blas Valenzuela': 'Mister',
};

export const subjectStyle: Record<Subject, { color: string; emoji: string; text: string }> = {
  'Lenguaje y Comunicación':                 { color: '#f59e0b', emoji: '📖', text: '#ffffff' },
  'Matemática':                              { color: '#eab308', emoji: '🔢', text: '#1f2937' },
  'Historia, Geografía y Ciencias Sociales': { color: '#ca8a04', emoji: '🌍', text: '#ffffff' },
  'Ciencias Naturales':                      { color: '#ea580c', emoji: '🔬', text: '#ffffff' },
  'Tecnología':                              { color: '#a16207', emoji: '💻', text: '#ffffff' },
  'Educación Física y Salud':                { color: '#dc2626', emoji: '⚽', text: '#ffffff' },
  'Idioma Extranjero (Inglés)':              { color: '#1e3a8a', emoji: '🗣️', text: '#ffffff' },
  'Artes Visuales':                          { color: '#166534', emoji: '🎨', text: '#ffffff' },
  'Música':                                  { color: '#65a30d', emoji: '🎵', text: '#ffffff' },
  'Orientación':                             { color: '#d946ef', emoji: '🧭', text: '#ffffff' },
  'Taller de Teatro':                        { color: '#c026d3', emoji: '🎭', text: '#ffffff' },
  'Taller de Reforzamiento':                 { color: '#f87171', emoji: '✨', text: '#1f2937' },
  'Karate':                                  { color: '#1f2937', emoji: '🥋', text: '#ffffff' },
};

const NELDA = 'Nelda Garcés';

export const schedule: Record<Weekday, Block[]> = {
  lunes: [
    { bloque: 1, asignatura: 'Lenguaje y Comunicación', profesor: NELDA, trato: 'Miss' },
    { bloque: 2, asignatura: 'Lenguaje y Comunicación', profesor: NELDA, trato: 'Miss' },
    { bloque: 3, asignatura: 'Matemática', profesor: NELDA, trato: 'Miss' },
    { bloque: 4, asignatura: 'Matemática', profesor: NELDA, trato: 'Miss' },
    { bloque: 5, asignatura: 'Tecnología', profesor: 'Catalina Méndez', trato: 'Miss' },
    { bloque: 6, asignatura: 'Educación Física y Salud', profesor: 'Katya Castro', trato: 'Miss' },
    { bloque: 7, asignatura: 'Taller de Teatro', profesor: NELDA, trato: 'Miss' },
    { bloque: 8, asignatura: 'Taller de Teatro', profesor: NELDA, trato: 'Miss' },
    { bloque: 9, asignatura: 'Karate', profesor: 'Blas Valenzuela', trato: 'Mister' },
  ],
  martes: [
    { bloque: 1, asignatura: 'Lenguaje y Comunicación', profesor: NELDA, trato: 'Miss' },
    { bloque: 2, asignatura: 'Lenguaje y Comunicación', profesor: NELDA, trato: 'Miss' },
    { bloque: 3, asignatura: 'Historia, Geografía y Ciencias Sociales', profesor: NELDA, trato: 'Miss' },
    { bloque: 4, asignatura: 'Historia, Geografía y Ciencias Sociales', profesor: NELDA, trato: 'Miss' },
    { bloque: 5, asignatura: 'Historia, Geografía y Ciencias Sociales', profesor: NELDA, trato: 'Miss' },
    { bloque: 6, asignatura: 'Idioma Extranjero (Inglés)', profesor: 'Álvaro Rodríguez', trato: 'Mister' },
    { bloque: 7, asignatura: 'Taller de Reforzamiento', profesor: NELDA, trato: 'Miss' },
    { bloque: 8, asignatura: 'Taller de Reforzamiento', profesor: NELDA, trato: 'Miss' },
  ],
  'miércoles': [
    { bloque: 1, asignatura: 'Idioma Extranjero (Inglés)', profesor: 'Álvaro Rodríguez', trato: 'Mister' },
    { bloque: 2, asignatura: 'Idioma Extranjero (Inglés)', profesor: 'Álvaro Rodríguez', trato: 'Mister' },
    { bloque: 3, asignatura: 'Orientación', profesor: NELDA, trato: 'Miss' },
    { bloque: 4, asignatura: 'Educación Física y Salud', profesor: 'Katya Castro', trato: 'Miss' },
    { bloque: 5, asignatura: 'Educación Física y Salud', profesor: 'Katya Castro', trato: 'Miss' },
    { bloque: 6, asignatura: 'Matemática', profesor: NELDA, trato: 'Miss' },
    { bloque: 7, asignatura: 'Matemática', profesor: NELDA, trato: 'Miss' },
    { bloque: 8, asignatura: 'Matemática', profesor: NELDA, trato: 'Miss' },
  ],
  jueves: [
    { bloque: 1, asignatura: 'Lenguaje y Comunicación', profesor: NELDA, trato: 'Miss' },
    { bloque: 2, asignatura: 'Lenguaje y Comunicación', profesor: NELDA, trato: 'Miss' },
    { bloque: 3, asignatura: 'Idioma Extranjero (Inglés)', profesor: 'Álvaro Rodríguez', trato: 'Mister' },
    { bloque: 4, asignatura: 'Idioma Extranjero (Inglés)', profesor: 'Álvaro Rodríguez', trato: 'Mister' },
    { bloque: 5, asignatura: 'Artes Visuales', profesor: NELDA, trato: 'Miss' },
    { bloque: 6, asignatura: 'Artes Visuales', profesor: NELDA, trato: 'Miss' },
    { bloque: 7, asignatura: 'Música', profesor: NELDA, trato: 'Miss' },
    { bloque: 8, asignatura: 'Música', profesor: NELDA, trato: 'Miss' },
  ],
  viernes: [
    { bloque: 1, asignatura: 'Lenguaje y Comunicación', profesor: NELDA, trato: 'Miss' },
    { bloque: 2, asignatura: 'Lenguaje y Comunicación', profesor: NELDA, trato: 'Miss' },
    { bloque: 3, asignatura: 'Ciencias Naturales', profesor: NELDA, trato: 'Miss' },
    { bloque: 4, asignatura: 'Ciencias Naturales', profesor: NELDA, trato: 'Miss' },
    { bloque: 5, asignatura: 'Ciencias Naturales', profesor: NELDA, trato: 'Miss' },
    { bloque: 6, asignatura: 'Matemática', profesor: NELDA, trato: 'Miss' },
  ],
};
