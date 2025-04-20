# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

# Set workdir for the builder stage
WORKDIR /build_root

# Install dependencies based on the preferred package manager
# Copy dependency definition files from the ./app dir in the context
COPY app/package.json app/yarn.lock* app/package-lock.json* app/pnpm-lock.yaml* app/.npmrc* ./
# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

# Copy application code and config from the ./app dir in the context
# Copy the actual Next.js app directory
COPY app/app ./app 
# Copy other necessary directories/files from ./app in the context
COPY app/src ./src # If you have a src dir inside ./app
COPY app/components ./components # Copy components if they are directly under ./app
COPY app/lib ./lib # Copy lib if directly under ./app
COPY app/public ./public
COPY app/next.config.cjs .
COPY app/tsconfig.json .
COPY app/globals.css .
COPY app/layout.tsx ./app/ # Copy layout into the ./app dir inside container
COPY app/page.tsx ./app/ # Copy root page into the ./app dir inside container
COPY app/fonts ./fonts # Copy fonts
COPY "app/(legal)" ./'(legal)' # Copy legal pages group

# Environment variables must be present at build time
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# Build Next.js based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else npm run build; \
  fi

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app # Final app location

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy built assets from the builder stage (adjust source paths)
COPY --from=builder /build_root/public ./public
COPY --from=builder --chown=nextjs:nodejs /build_root/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /build_root/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]