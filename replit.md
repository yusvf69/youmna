# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Personal Brand Portfolio (`artifacts/portfolio`)
- **Type**: react-vite (presentation-first, no backend)
- **Preview Path**: `/`
- **Stack**: React 19, Vite, Tailwind CSS, framer-motion, react-icons, lucide-react
- **Sections**: Hero (animated particle canvas), About (timeline), Projects (filterable grid), Skills (animated icon cards), Gallery (masonry + fullscreen), Contact (form + socials)
- **Theme**: Dark futuristic — deep black, electric violet (#8B5CF6), neon cyan (#06B6D4)
- **Features**: Custom cursor, loading screen, scroll animations, hover glow effects

### API Server (`artifacts/api-server`)
- **Type**: Express 5 backend
- **Path**: `/api`
- Currently only has health check endpoint

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/portfolio run dev` — run portfolio locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
