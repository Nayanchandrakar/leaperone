# Bun version 
ARG VERSION=latest

# Base image 
FROM oven/bun:${VERSION} AS base

# Install turbo globally
FROM base AS turbo-cli
RUN bun add -g turbo

# Pruner 
FROM turbo-cli AS pruner
WORKDIR /app
COPY . .
RUN turbo prune server --docker

# Builder 
FROM base AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/full/ .
RUN bun install

# Build in production mode 
ENV NODE_ENV=production
RUN bun run build

# Runner 
FROM base AS runner
WORKDIR /app
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/apps/server/dist dist
COPY --from=builder /app/apps/server/package.json package.json
EXPOSE 8080

# Start server 
CMD ["bun", "run", "start"]
