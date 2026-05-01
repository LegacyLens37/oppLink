# oppLink (Front-end)

Web app for discovering opportunities, onboarding, and coaching-style support. Built with React, TypeScript, and Vite.

## Requirements

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)

## Getting started

```bash
npm install
npm run dev
```

The dev server prints a local URL (typically `http://localhost:5173`).

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint on `.js`, `.jsx`, `.ts`, `.tsx` |

## Tech stack

- **React 18** — UI
- **TypeScript** — typing
- **Vite** — dev server and bundling
- **React Router** — client-side routing
- **Tailwind CSS** — styling
- **Emotion** — CSS-in-JS where used
- **Framer Motion** — animations
- **Lucide React** — icons

## Routes

| Path | Page |
|------|------|
| `/` | Landing |
| `/onboarding` | Onboarding (nav/footer hidden) |
| `/dashboard` | Dashboard (requires completed onboarding user) |
| `/opportunities` | Opportunity discovery |
| `/opportunities/:id` | Opportunity detail |
| `/support` | Support & coaching |

Protected routes use `getCurrentUser()` from `src/lib/user.ts`; without a user, the app redirects to `/onboarding`.

## Project layout

```
src/
  components/   # Shared UI (Navbar, Footer, cards, filters, etc.)
  pages/        # Route-level screens
  lib/          # Helpers (e.g. user state)
  data/         # Mock or static data
```

## Environment

For local secrets or API base URLs, add a `.env` file (see [Vite env variables](https://vitejs.dev/guide/env-and-mode.html)). `.env` and `.env.local` are gitignored; do not commit credentials.

## License

Private project (`private: true` in `package.json`).
