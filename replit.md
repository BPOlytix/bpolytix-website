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

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Deploying BPOLytix to Vercel (push workflow)

The BPOLytix site (`artifacts/bpolytix`) is hosted at
github.com/BPOlytix/bpolytix-website (branch `main`) and auto-deploys
to Vercel on every push. Follow this exact sequence for every push:

1. **Keep Next.js current.** Vercel rejects builds on Next.js versions
   with known CVEs ("Vulnerable version of Next.js detected"). Before
   pushing, if dependencies have not been refreshed recently, run:
   `pnpm --filter @workspace/bpolytix update next@latest`
   then verify with `grep '"next"' artifacts/bpolytix/package.json`.
2. **Run a production build locally first** to catch breakage:
   `pnpm --filter @workspace/bpolytix run build`
   The build must finish with all routes generated (no errors).
3. **Commit only source files.** Never stage `.next/` build artefacts.
   Stage `package.json` + `pnpm-lock.yaml` whenever dependencies
   changed.
4. **Push using the PAT remote**:
   `git push https://$GITHUB_PERSONAL_ACCESS_TOKEN@github.com/BPOlytix/bpolytix-website.git HEAD:main`
   Use `--force` only if the remote has diverged with stale `.next`
   artefacts (already verified safe in past sessions).
5. **Vercel auto-deploys** the new commit. Watch the Vercel dashboard
   for the build status.

History note: Next.js 15.1.6 was rejected by Vercel; upgrading to
16.2.4 cleared the alert (commit 50f08cc).
