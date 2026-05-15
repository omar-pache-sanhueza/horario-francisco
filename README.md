# Horario Mañana

Mini-PWA que muestra el horario escolar del día siguiente para Francisco (1° Básico Chicago, Colegio Inglés Mi Mundo). Pensada para vivir como acceso directo en la pantalla de inicio del iPhone SE 2.

Cuando es lunes a jueves muestra el día siguiente. Viernes, sábado y domingo muestra el lunes. Zona horaria fija: `America/Santiago`.

## Desarrollo

```bash
npm install
npm run dev
```

Abrir `http://localhost:4321`.

## Build

```bash
npm run build
npm run preview
```

El build genera los íconos PWA desde `public/logo.webp` y emite estáticos a `dist/`.

## Cambiar el horario

Editar `src/data/schedule.ts`. Los bloques vacíos del viernes simplemente se omiten del arreglo.

## Cambiar el logo

Reemplazar `public/logo.webp` y correr `npm run icons`.

## Despliegue

Cloudflare Pages conectado al repo:

- Build command: `npm run build`
- Output directory: `dist`
- Node: 20

Cada push a `main` despliega solo.

## Instalación en el iPhone

1. Abrir la URL en Safari.
2. Botón compartir -> "Agregar a inicio".

Más contexto técnico en `AGENTS.md` y especificación detallada en `SPEC.md`.
