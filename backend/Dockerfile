FROM node:20-alpine AS base
RUN apk add --no-cache openssl

FROM base AS builder

WORKDIR /app/backend

# Copy package.json and lockfile
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY backend/ .

# Generate Prisma Client and compile TypeScript.
RUN npm run build

FROM base AS runner

WORKDIR /app/backend

ENV NODE_ENV production

# Copy package files and install only production dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

# Copy built code and prisma
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/prisma ./prisma
COPY --from=builder /app/backend/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/backend/node_modules/.prisma ./node_modules/.prisma

EXPOSE 4000

CMD ["npm", "start"]
