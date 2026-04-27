@AGENTS.md

# Harvey Specter Sprint

Next.js 16 app with TypeScript, Tailwind CSS, and App Router.

## GitHub
Repo: https://github.com/adamekarol/harvey-specter-sprint
Remote: `origin` → `main`

## Stack
- Next.js 16 (App Router, `src/` directory, `@/*` alias)
- TypeScript
- Tailwind CSS
- Abril Fatface via `next/font/google`

## Project structure
- `src/app/layout.tsx` — root layout, loads Abril Fatface font
- `src/app/page.tsx` — splash page (black background, hot pink Abril Fatface text)
- `src/app/globals.css` — global styles

## Dev
```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Git workflow
- Commit and push changes to `main` on GitHub after each meaningful change.
- Always ask the user before pushing unless they've explicitly said to push automatically.
