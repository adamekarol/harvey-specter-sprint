<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Harvey Specter Sprint

Next.js 16 app with TypeScript, Tailwind CSS, and App Router.

## GitHub

Repo: https://github.com/adamekarol/harvey-specter-sprint
Remote: `origin` -> `main`

## Stack

- Next.js 16 (App Router, `src/` directory, `@/*` alias)
- TypeScript
- Tailwind CSS
- Abril Fatface via `next/font/google`

## Project structure

- `src/app/layout.tsx` - root layout, loads Abril Fatface font
- `src/app/page.tsx` - splash page (black background, hot pink Abril Fatface text)
- `src/app/globals.css` - global styles

## Dev

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Git workflow

- Commit and push changes to `main` on GitHub after each meaningful change.
- Always ask the user before pushing unless they've explicitly said to push automatically.
