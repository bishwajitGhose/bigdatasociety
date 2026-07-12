# infoart

Jon Neo's portfolio website — big data, quantitative analysis, and web dev.

## Stack

- React 19 + Vite 7
- TypeScript 5
- Tailwind CSS v4
- Framer Motion
- shadcn/ui (Radix UI primitives)
- Wouter (client-side routing)

## Getting started

**Prerequisites:** Node.js 18+ and npm/pnpm/yarn installed.

```bash
# Install dependencies
npm install
# or
pnpm install

# Start the dev server (opens at http://localhost:5173)
npm run dev

# Type-check
npm run typecheck

# Production build (outputs to ./dist)
npm run build

# Preview the production build locally
npm run preview
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/big-data` | Big Data Engineering |
| `/data-analysis` | Quantitative Analysis |
| `/visualization` | Data Visualization |
| `/web-dev` | Web Development |
| `/tutorials` | Tutorials (R, Python, Stata, SQL, Scala, Julia) |
| `/tutorials/:lang` | Tutorials for a specific language |
| `/blog` | Insights / Blog |
| `/contact` | Contact form |

## Project structure

```
src/
  components/
    layout/      Navbar, Footer
    ui/          shadcn/ui components
  hooks/         useTheme (dark mode), use-toast
  lib/           utils (cn helper)
  pages/         One file per route
  index.css      Tailwind base + CSS variables (light + dark)
  main.tsx       App entry point
  App.tsx        Router + providers
```

## Dark mode

Click the moon/sun icon in the top-right of the navbar to toggle dark mode.
The preference is persisted in `localStorage`.
