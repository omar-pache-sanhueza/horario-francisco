# AGENTS.md

Contexto operativo para cualquier agente o colaborador que toque este repo.

## Qué es esto

PWA personal para Francisco (6 años) que muestra el horario escolar del día siguiente en el iPhone SE 2. Especificación completa en `SPEC.md`.

## Stack

- Astro 5 estático + Tailwind CSS 4 + TypeScript estricto.
- PWA con `@vite-pwa/astro`.
- Despliegue automático a Cloudflare Pages desde `main`.

## Convenciones

- Idioma del repo, commits y UI: **español** (UTF-8).
- Commits cortos, imperativo, sin firma de co-autor.
- Usar guion corto `-`, nunca em dash `—`.
- Sin comentarios en código salvo que expliquen un porqué no obvio.
- Sin abstracciones prematuras: una página, datos planos, lógica mínima.

## Comandos

```bash
npm install        # instalar dependencias
npm run icons      # regenerar íconos PWA desde public/logo.webp
npm run dev        # servidor local
npm run build      # build de producción a dist/
npm run preview    # previsualizar build
```

## Cómo cambiar el horario

Editar `src/data/schedule.ts`. Los bloques vacíos simplemente se omiten del arreglo. Los colores y emojis viven en el mismo archivo, asociados al nombre canónico de la asignatura.

## Cómo cambiar el logo o íconos

Reemplazar `public/logo.webp` y correr `npm run icons`.

## Deploy

Configurado en Cloudflare Pages:
- Build command: `npm run build`
- Output: `dist`
- Node: 20

Cada push a `main` despliega solo.
