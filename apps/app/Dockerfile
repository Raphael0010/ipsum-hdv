FROM node AS builder
#RUN apk update
#RUN apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@ipsum-hdv/app --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node AS installer
#RUN apk update
#RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-*.yaml .
COPY .npmrc .
RUN corepack enable
RUN pnpm install -r --frozen-lockfile

# Install sharp for Next.js Image Optimization
RUN pnpm add -C ./apps/app sharp

# Build the project
COPY --from=builder /app/out/full/ .
COPY .env.local .
RUN pnpm turbo build --filter=@ipsum-hdv/app...
RUN rm .env.local


FROM node AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/app/next.config.mjs .
COPY --from=installer /app/apps/app/package.json .

COPY --from=installer /app/apps/app/public ./apps/app/public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/app/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/app/.next/static ./apps/app/.next/static

CMD node apps/app/server.js

