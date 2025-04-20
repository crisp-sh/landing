# syntax=docker.io/docker/dockerfile:1

# Base image for installing dependencies
FROM node:20-alpine AS base
WORKDIR /app
# Install pnpm
RUN npm install -g pnpm

# Builder stage: Install dependencies and build the Next.js app
FROM base AS builder
WORKDIR /app

# Copy package.json and lock file first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./
# Copy Prisma schema if you have one (adjust path if necessary)
# COPY prisma ./prisma/

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
# Copy the source directories
COPY app ./app/
COPY components ./components/
COPY lib ./lib/
COPY hooks ./hooks/
COPY styles ./styles/
# Copy public directory and config files
COPY public ./public/
COPY next.config.mjs .
COPY tsconfig.json .
COPY postcss.config.mjs .
COPY components.json .

# Build the Next.js application
# Pass build-time environment variables if needed
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN pnpm build

# Pruning stage: Install only production dependencies
FROM base AS pruner
WORKDIR /app
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
RUN pnpm prune --prod

# Runner stage: Create the final image
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment variables (adjust as needed)
ENV NODE_ENV=production
# Example: Set a default port, can be overridden
ENV PORT=3000
EXPOSE 3000

# You may need libraries like openssl if your application uses them
# RUN apk add --no-cache openssl

# Copy necessary files from previous stages
COPY --from=builder /app/public ./public
# Copy the standalone Next.js server output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy the static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy production node_modules
COPY --from=pruner /app/node_modules ./node_modules

# User for running the application (optional but recommended)
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# USER nextjs

# Command to run the application
CMD ["node", "server.js"]