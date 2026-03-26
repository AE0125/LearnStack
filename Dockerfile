FROM oven/bun:1 AS dependencies

WORKDIR /app

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --no-save --frozen-lockfile

FROM oven/bun:1 AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production

RUN bun run build

FROM oven/bun:1 AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=bun:bun /app/public ./public

RUN mkdir .next
RUN chown bun:bun .next

COPY --from=builder --chown=bun:bun /app/.next/standalone ./
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static


# Persist the fetch cache generated during the build so that
# cached responses are available immediately on startup.
# Comment out this line if you want to reduce image size at the cost of initial request latency.
COPY --from=builder --chown=bun:bun /app/.next/cache ./.next/cache

# Switch to non-root user for security best practices
USER bun

# Expose port 3000 to allow HTTP traffic
EXPOSE 3000

# Start Next.js standalone server with Bun
CMD ["bun", "server.js"]
