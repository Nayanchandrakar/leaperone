# Bun version
ARG VERSION=latest

# Base image
FROM oven/bun:${VERSION} AS base

# Install turbo globally
FROM base AS turbo-cli
RUN bun add -g turbo

# Pruning unnecessary files for server build
FROM turbo-cli AS pruner
WORKDIR /app
COPY . .
RUN turbo prune server --docker

# Install dependencies using only exact lockfile
FROM base AS deps
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN bun install --frozen-lockfile

# Build server
FROM deps AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/ .
ENV NODE_ENV=production
RUN bun run build

# Runtime image
FROM base AS runner
WORKDIR /app

# Add non-root user
RUN addgroup --system --gid 1001 bunjs 
RUN adduser --system --uid 1001 leaperone
USER leaperone

# Copy built app to final image with correct permissions
COPY --from=builder --chown=leaperone:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=leaperone:nodejs /app/apps/server/dist ./dist
COPY --from=builder --chown=leaperone:nodejs /app/apps/server/package.json ./package.json

EXPOSE 8080

# Start server
CMD ["bun", "run", "start"]