# AGENTS.md - Agentic Coding Guidelines

This document provides guidelines for agents operating in the leaperone monorepo.

## Project Structure

```
/
├── apps/
│   ├── web/          # Next.js 16 web application
│   ├── server/       # Hono.js API server (Bun)
│   ├── aws/          # AWS CDK infrastructure
│   └── proxy/        # Proxy service
├── packages/
│   ├── biome-config/ # Shared Biome configuration
│   ├── database/     # Drizzle ORM database layer
│   ├── ui/           # Shared React UI components
│   ├── core/         # Core utilities and config
│   ├── types/        # Shared TypeScript types
│   ├── env/          # Environment validation
│   ├── error/        # Error handling utilities
│   ├── logger/       # Pino logging
│   ├── session/      # Session management
│   └── zod/          # Zod schemas
└── package.json      # Workspace root
```

## Build/Lint/Test Commands

### Root Commands
```bash
# Build all packages and apps
npm run build

# Development (runs turbo dev)
npm run dev

# Lint all files (Biome)
npm run lint

# Format all files (Biome)
npm run format

# Clean build artifacts
npm run clean
```

### Per-App Commands

**Web App** (`apps/web/`):
```bash
npm run dev          # Next.js dev with Turbopack
npm run build        # Next.js build
npm run lint         # Biome lint
npm run format       # Biome format
npm run typecheck    # TypeScript check
```

**Server App** (`apps/server/`):
```bash
npm run dev          # Bun hot reload
npm run build        # TSDown build
npm run start        # Start production server
npm run lint         # Biome lint
npm run format       # Biome format
npm run typecheck    # TypeScript check
```

**AWS App** (`apps/aws/`):
```bash
npm run test         # Bun test
npm run build        # TSC build
npm run lint         # Biome lint
npm run format       # Biome format
npm run typecheck    # TypeScript check
npm run cdk          # Run CDK commands
```

### Running a Single Test
```bash
# In apps/aws/
bun test

# Run specific test file
bun test apps/aws/tests/s3.lambda.stack.test.ts
```

### Package Commands
Most packages support:
```bash
npm run lint         # Biome lint
npm run format       # Biome format
npm run typecheck    # TypeScript check
```

Database package (`packages/database/`):
```bash
npm run db:generate  # Generate Drizzle migrations
npm run db:migrate   # Run migrations
npm run db:push     # Push schema to DB
npm run db:seed     # Seed database
npm run db:studio   # Open Drizzle Studio
```

## Code Style Guidelines

### Formatting (Biome)
- **Indent**: 2 spaces
- **Line width**: 100 characters
- **Line endings**: LF
- **Quote style**: Double quotes (`"`)
- **Semicolons**: As needed
- **Trailing commas**: All (in objects, arrays, function calls)

### Import Conventions

**Workspace packages** (absolute `@app/` path):
```typescript
import { ApiError } from "@app/error"
import type { CookieOptions } from "@app/types"
```

**Local packages** (absolute `@/` path):
```typescript
import { BootStrap } from "@/bootstrap"
import { analyticsController } from "@/features/analytics/modules/analytics.module"
```

**Relative imports**: Avoid when possible; prefer `@/` aliases.

### TypeScript Conventions

- **Always use explicit types** for function parameters and return types
- **Use `type`** for type aliases, `interface` for object shapes
- **Use `import type`** for type-only imports to improve tree-shaking
- **Avoid `any`**: Use `unknown` or explicit types instead

```typescript
// Good
interface ILoginPage {
  searchParams: Promise<{ callbackUrl: string }>
}

export default async function LoginPage({ searchParams }: ILoginPage): Promise<React.ReactNode> {}

// Bad
function LoginPage({ searchParams }) {
```

### Naming Conventions

- **Files**: kebab-case (e.g., `error.middleware.ts`, `auth.service.ts`)
- **Components**: PascalCase (e.g., `LoginForm.tsx`, `AuthWrapper.tsx`)
- **Interfaces**: Prefix with `I` (e.g., `ILoginPage`, `IUser`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `SESSION_COOKIE_OPTIONS`)
- **Booleans**: Prefix with `is`, `has`, `should` (e.g., `isAuthenticated`)

### React/Next.js Conventions

- Use **Server Components** by default (no `"use client"` unless needed)
- Use **async components** for data fetching in page components
- Use **Fragment** instead of wrapper divs when possible
- Organize imports: React imports → external → workspace (@app/) → local (@/)

```typescript
import { Fragment } from "react"
import { APP_URL } from "@/constants/app"
import { LoginForm } from "@/features/auth/components/forms/login"
import { AuthWrapper } from "@/features/auth/components/layouts/auth-layout"
```

### Error Handling

- Use the custom `ApiError` class from `@app/error`
- Convert errors to responses using `.toResponse(c)` method

```typescript
import { ApiError } from "@app/error"
import type { Context } from "hono"
import type { HTTPResponseError } from "hono/types"

export const errorMiddleware = (err: Error | HTTPResponseError, c: Context) => {
  const apiError = ApiError.fromError(err)
  return apiError.toResponse(c)
}
```

### Project-Specific Patterns

**Server (Hono.js)**:
- Controllers go in `features/*/controllers/`
- Services go in `features/*/services/`
- Modules export controllers and group related functionality
- Middlewares go in `middlewares/` directory

**Database**:
- Use Drizzle ORM with `@app/database`
- Generate migrations with `npm run db:generate`
- Follow existing schema patterns in `packages/database/src/schema/`

**UI Components**:
- Use Radix UI primitives (installed via catalog)
- Use `class-variance-authority` for component variants
- Use `clsx` and `tailwind-merge` for conditional classes
- Export components from `@app/ui/components/*`

### Lint Rules (Biome)

The following rules are enforced:
- **No unused imports/variables** (error)
- **No CommonJS** (error) - use ES modules
- **Use const** (error) - never var
- **Use template literals** (error) - no string concatenation
- **Use self-closing elements** (error) - for empty JSX elements
- **Use array literals** (error) - `[]` instead of `Array()`
- **Use as const** (error) - for literal types
- **Use import type** (error) - for type-only imports

### Pre-commit Hooks

The project uses Husky with lint-staged. Files are automatically formatted with Biome on commit.

### Running Typecheck Before Commit

Always run typecheck before committing:
```bash
# In relevant app/package
npm run typecheck

# Or in root (will check all packages)
npm run build
```

## Technology Stack

- **Runtime**: Bun 1.4.x, Node 22.22+
- **Package Manager**: Bun workspaces
- **Build**: Turbo
- **Web Framework**: Next.js 16
- **API Server**: Hono.js
- **Database**: Drizzle ORM + Neon + Upstash Redis
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + Tailwind
- **Forms**: React Hook Form + Zod
- **State**: Zustand
- **API Client**: TanStack Query
- **Linting/Formatting**: Biome 2.5.14
- **Infrastructure**: AWS CDK

## Notes for Agents

1. **Always run lint/format before committing**: `npm run lint && npm run format`
2. **Always run typecheck**: `npm run typecheck` in the relevant package
3. **Use workspace packages**: Don't duplicate utilities; use `@app/*` packages
4. **Follow feature structure**: Add new features in `features/*/` folders with controllers, services, and modules
5. **Use Biome for all formatting**: Don't use Prettier or ESLint directly
6. **Test AWS changes locally**: Use `bun test` in `apps/aws/` before deploying
