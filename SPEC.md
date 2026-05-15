# Horario Mañana - Especificación

Aplicación web (PWA) personal para Francisco (6 años, 1° Básico Chicago, Colegio Inglés Mi Mundo) que muestra el horario escolar del día siguiente al abrirse desde el ícono del iPhone SE 2.

## Objetivo

Que Francisco pueda abrir un ícono en la pantalla de inicio de su iPhone SE 2 y ver de inmediato qué clases le tocan al día siguiente, con tipografía, colores y emojis pensados para un niño de 6 años que recién aprende a leer.

## Alcance

- Una sola pantalla.
- Muestra día de la semana del día siguiente y la lista de clases (sólo bloques con clase, sin horas).
- Datos del horario embebidos en código (no hay backend, no hay edición en vivo).
- Funciona offline tras la primera carga (PWA).

Fuera de alcance: notificaciones, tareas, recordatorios, login, edición desde la UI, multi-alumno.

## Reglas de "día siguiente"

- Lunes a jueves -> muestra el día siguiente (martes a viernes).
- Viernes, sábado y domingo -> muestra el lunes.
- Zona horaria fija: `America/Santiago`.
- El cálculo se hace en el cliente con `Intl.DateTimeFormat`.

### Encabezado

Tres líneas apiladas en el `<h1>`:

- Línea 1 (prefijo, gris): `Mañana es` en días normales; `Mañana no hay clases, pero el` los viernes y sábados.
- Línea 2 (día gigante, bold): el nombre del día capitalizado.
- Línea 3 (sufijo, gris): `y me toca:` en días normales; `me toca:` los viernes y sábados.

### Zona de avisos

Entre la lista de bloques y el footer hay una sección `#avisos` con mensajes contextuales en texto grande, bold, centrado, gris oscuro, sin caja. Cada aviso aparece o se oculta según una regla:

- **Aviso de buzo** (`#buzo`): `Mañana voy con buzo 👟`. Visible si el horario mostrado contiene `Educación Física y Salud`. La detección es automática: lee del propio arreglo de bloques en vez de hardcodear lunes/miércoles.
- **Aviso de salida temprano** (`#viernes`): `Mañana salgo a las 1 😄`. Visible si el día mostrado es viernes.

Si ambos aplican el mismo día, se apilan en ese orden con poco espacio entre ellos y poco espacio hasta el footer.

## Tratamiento de profesores

Cada profesor lleva un tratamiento (`trato`) que se muestra antes del nombre en la tarjeta:

- `Miss` para profesoras mujeres.
- `Mister` para profesores hombres.

Mapeo actual (`teacherTreatment` en `src/data/schedule.ts`):

| Profesor | Trato |
|---|---|
| Nelda Garcés | Miss |
| Catalina Méndez | Miss |
| Katya Castro | Miss |
| Álvaro Rodríguez | Mister |
| Blas Valenzuela | Mister |

Al sumar un profesor nuevo, agregarlo al mapa y asignar el campo `trato` en cada bloque.

## Datos del horario

Curso: 1° Básico Chicago, Colegio Inglés Mi Mundo. 8 bloques de lunes a jueves, 6 bloques el viernes (los bloques vacíos no se muestran).

### Lunes
1. Lenguaje y Comunicación - Nelda Garcés
2. Lenguaje y Comunicación - Nelda Garcés
3. Matemática - Nelda Garcés
4. Matemática - Nelda Garcés
5. Tecnología - Catalina Méndez
6. Educación Física y Salud - Katya Castro
7. Taller de Teatro - Nelda Garcés
8. Taller de Teatro - Nelda Garcés
9. Karate - Blas Valenzuela (extracurricular)

### Martes
1-2. Lenguaje y Comunicación - Nelda Garcés
3-5. Historia, Geografía y Ciencias Sociales - Nelda Garcés
6. Idioma Extranjero (Inglés) - Álvaro Rodríguez
7-8. Taller de Reforzamiento - Nelda Garcés

### Miércoles
1-2. Idioma Extranjero (Inglés) - Álvaro Rodríguez
3. Orientación - Nelda Garcés
4-5. Educación Física y Salud - Katya Castro
6-8. Matemática - Nelda Garcés

### Jueves
1-2. Lenguaje y Comunicación - Nelda Garcés
3-4. Idioma Extranjero (Inglés) - Álvaro Rodríguez
5-6. Artes Visuales - Nelda Garcés
7-8. Música - Nelda Garcés

### Viernes
1-2. Lenguaje y Comunicación - Nelda Garcés
3-5. Ciencias Naturales - Nelda Garcés
6. Matemática - Nelda Garcés

## Diseño visual

- Tipografía: Fredoka (variable, self-hosted vía `@fontsource-variable/fredoka`).
- Encoding: UTF-8, español.
- Paleta por asignatura (replica los colores del horario oficial):

| Asignatura | Color base |
|---|---|
| Lenguaje y Comunicación | `#f59e0b` naranjo |
| Matemática | `#eab308` amarillo |
| Historia, Geografía y Ciencias Sociales | `#ca8a04` mostaza |
| Ciencias Naturales | `#ea580c` naranjo oscuro |
| Tecnología | `#a16207` ocre |
| Educación Física y Salud | `#dc2626` rojo |
| Idioma Extranjero (Inglés) | `#1e3a8a` azul marino |
| Artes Visuales | `#166534` verde oscuro |
| Música | `#65a30d` verde claro |
| Orientación | `#d946ef` fucsia |
| Taller de Teatro | `#c026d3` magenta |
| Taller de Reforzamiento | `#f87171` salmón |
| Karate | `#1f2937` grafito |

- Emojis por asignatura: Lenguaje 📖, Matemática 🔢, Historia 🌍, Ciencias 🔬, Tecnología 💻, Educación Física ⚽, Inglés 🗣️, Artes 🎨, Música 🎵, Orientación 🧭, Teatro 🎭, Reforzamiento ✨, Karate 🥋.
- Logo del colegio: discreto en el footer.
- Jerarquía: día gigante arriba, frase "Mañana te toca:", tarjetas grandes apilables.
- Sin interacciones: sólo scroll.

## Stack técnico

- Astro 5 (output estático).
- Tailwind CSS 4 (vía `@tailwindcss/vite`).
- TypeScript estricto.
- PWA con `@vite-pwa/astro` (manifest + service worker para offline).
- `@fontsource-variable/fredoka` (sin llamadas a Google Fonts).
- `sharp` para generar íconos PWA desde el logo.

## Despliegue

- Repo en GitHub, rama `main`.
- Cloudflare Pages conectado al repo:
  - Build command: `npm run build`
  - Output directory: `dist`
  - Node version: 20
- Cada `git push` a `main` genera deploy automático.

## Instalación en el iPhone

1. Abrir la URL de Cloudflare Pages en Safari.
2. Botón compartir -> "Agregar a inicio".
3. El ícono usa `apple-touch-icon.png` (180x180) generado desde el logo del colegio.

## Estructura del repo

```
horario-francisco/
├── AGENTS.md
├── SPEC.md
├── README.md
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── scripts/
│   └── generate-icons.mjs
├── public/
│   ├── logo.webp
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   └── icon-maskable-512.png
└── src/
    ├── data/
    │   └── schedule.ts
    ├── lib/
    │   └── nextSchoolDay.ts
    ├── components/
    │   └── SubjectCard.astro
    ├── styles/
    │   └── global.css
    └── pages/
        └── index.astro
```
