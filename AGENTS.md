# Repository Guidelines

This repository is a Bun + Turbo monorepo. It uses workspaces for shared packages and app targets, with Biome for formatting and linting.

## Project Structure & Module Organization
- `apps/`: deployable applications (e.g., `web`, `server`, `proxy`, `aws`).
- `packages/`: shared libraries and configs (e.g., `ui`, `core`, `database`, `types`, `biome-config`, `tsconfig`).
- `docker/`: container assets for local/dev infrastructure.
- `turbo.jsonc`: task orchestration and caching rules across workspaces.

## Build, Test, and Development Commands
- `bun install`: install dependencies (Bun is the package manager).
- `bun run dev`: start all dev tasks via Turbo.
- `bun run build`: build all packages/apps via Turbo.
- `bun run lint`: run Biome lints and apply fixes.
- `bun run format`: run Biome checks and apply formatting.
- `bun run clean`: clear Turbo cache and workspace build outputs.
- `cd apps/aws && bun run test`: run the AWS app tests.

## Coding Style & Naming Conventions
- Formatting is enforced by Biome (`packages/biome-config/base.json`).
- Indentation: 2 spaces. Line width: 100. Quotes: double. Semicolons: as needed.
- Prefer workspace imports (`@app/*`) over deep relative paths when available.

## Testing Guidelines
- There is no repo-wide test script; tests are package-specific.
- The AWS CDK app uses `bun test` (`apps/aws`).
- When adding new suites, keep tests close to source and name files `*.test.ts` or `*.spec.ts` to match common tooling.

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits via commitlint (`commitlint.config.ts`).
- Allowed types include `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `ci`, `build`, `perf`, `style`, `revert`.
- Keep the header under 100 characters, use lowercase types, and avoid a trailing period.
- Example: `feat: add workspace analytics`.
- PRs should include a clear summary, testing steps, and screenshots for UI changes (e.g., `apps/web`) when relevant. Link related issues if available.

## Configuration & Secrets
- Turbo tasks treat `.env*` files as inputs; keep environment files local and out of version control.
- Database tasks (e.g., `db:generate`, `db:migrate`) require `DATABASE_URL` to be set.
