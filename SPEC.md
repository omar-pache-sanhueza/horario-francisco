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

- Muestra el **próximo día con clases**, calculado sobre fechas reales: se recorre día a día a partir de mañana y se omiten fin de semana, feriados nacionales y vacaciones.
- En la práctica: lunes a jueves -> día siguiente (martes a viernes); viernes, sábado y domingo -> lunes; salvo que esos días caigan en feriado o vacaciones, en cuyo caso se sigue avanzando.
- Zona horaria fija: `America/Santiago`.
- El cálculo se hace tanto en SSR como en el cliente, sobre la fecha calendario de Santiago (`Intl.DateTimeFormat` con locale `en-CA`).
- `gap` indica que el día mostrado no es mañana (mañana es finde, feriado o vacaciones); dispara el encabezado y avisos en su variante "no hay clases".

### Feriados y vacaciones

- Definidos en `src/data/calendario.ts`: `feriados` (array de fechas `YYYY-MM-DD`) y `vacaciones` (rangos `{ desde, hasta }` inclusivos).
- Contiene los feriados nacionales de Chile y las vacaciones de invierno (22 jun - 3 jul 2026).
- Las fechas están fijadas por año; actualizar este archivo cada año escolar.

### Encabezado

Tres líneas apiladas en el `<h1>`:

Las tres líneas deben leerse de corrido como una sola frase, en todas las combinaciones.

- Línea 1 (prefijo, gris): `Mañana es` cuando el día mostrado es mañana; `Mañana no hay clases, pero el` cuando hay `gap` (finde, feriado o vacaciones); `El` en modo manual.
- Línea 2 (día gigante, bold): el nombre del día capitalizado.
- Línea 3 (sufijo, gris): encadena los avisos del día y cierra con `me toca:`. Se arma como una lista de "extras" unidos con ` y `, seguida de ` y me toca:`:
  - Extra buzo (el horario del día contiene `Educación Física y Salud`, detección automática): `voy con buzo 👟`.
  - Extra salida temprano (el día mostrado es viernes): `salgo a las 1 😄`.
  - Si no hay extras: `y me toca:` solo en modo auto sin `gap`; `me toca:` en los demás casos (con `gap` o manual).

Ejemplos de la frase completa: "Mañana es Miércoles voy con buzo 👟 y me toca:", "Mañana no hay clases, pero el Lunes voy con buzo 👟 y me toca:", "El Viernes salgo a las 1 😄 y me toca:", "El Martes me toca:".

No hay zona de avisos separada: buzo y salida temprano se leen dentro del encabezado.

### Selector de día

Bajo los avisos (antes del footer) hay una fila de 5 botones grandes `Lun · Mar · Mié · Jue · Vie` (`#dias`) para mirar el horario de cualquier día de la semana. El botón del día mostrado queda resaltado (naranjo `#ea580c`, texto blanco; los demás blancos con borde).

- Por defecto la app está en **modo auto**: muestra mañana con el encabezado descrito arriba.
- Al tocar un día se entra en **modo manual**: encabezado neutral (`El` / `[Día]` / `me toca:`), el aviso de buzo dice `El [Día] voy con buzo` y aparece el botón `Volver a mañana` (`#volver`), que regresa al modo auto.
- El modo manual es transitorio: cada apertura y cada vez que la app vuelve a primer plano (`visibilitychange`) se reinicia a modo auto, garantizando que el default sea siempre mañana.
- El parámetro `?day=lunes…viernes` entra directo en modo manual con ese día (útil para pruebas).

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
- Interacción mínima: scroll y el selector de día (ver arriba).

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
    │   ├── schedule.ts
    │   └── calendario.ts
    ├── lib/
    │   └── nextSchoolDay.ts
    ├── components/
    │   └── SubjectCard.astro
    ├── styles/
    │   └── global.css
    └── pages/
        └── index.astro
```
