# BOCRA Website

Frontend web application for the Botswana Communications Regulatory Authority (BOCRA), built with React, TypeScript, and Vite.

## Prerequisites

- Node.js 20+ (recommended LTS)
- npm 10+

## Project Structure

- `package.json` (root): convenience scripts that proxy commands to `frontend/`
- `frontend/`: main React application source code
- `frontend/src/`: pages, components, stores, utilities, and static app data
- `frontend/public/`: static public assets

## Setup

1. Install frontend dependencies from the repository root:

```bash
npm run install:frontend
```

## Run the App (Development)

From the repository root:

```bash
npm run dev
```

- Vite will start a local development server.
- The terminal will show the local URL (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

- TypeScript compilation runs first.
- Production files are generated in `frontend/dist/`.

## Preview Production Build

```bash
npm run preview
```

- Serves the built app from `frontend/dist/` for local verification.

## Linting

```bash
npm run lint
```

- Runs ESLint on the frontend codebase.

## Useful Direct Commands (optional)

If you prefer running commands inside `frontend/` directly:

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Tools and Technologies Used

- React 19
- TypeScript 5
- Vite 8
- React Router DOM 7
- Zustand (state management)
- Tailwind CSS 4 (available in dependencies)
- ESLint 9
- PostCSS + Autoprefixer

## Environment Variables

- Example file: `frontend/.env.example`
- Local file: `frontend/.env`

Copy and edit as needed for your environment.
