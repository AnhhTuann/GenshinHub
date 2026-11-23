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

COPY docs/tierlist/phase-d2 /app/docs/tierlist/phase-d2/
COPY docs/tierlist-v7.2-audit/PHASE_D_CHARACTER_APPROVAL_SHEET.json /app/docs/tierlist-v7.2-audit/PHASE_D_CHARACTER_APPROVAL_SHEET.json
COPY docs/weapon-tier-audit/PHASE_B2_6_FINAL_REVIEW.md /app/docs/weapon-tier-audit/PHASE_B2_6_FINAL_REVIEW.md
COPY docs/weapon-tier-independent /app/docs/weapon-tier-independent/
COPY --from=builder /app/backend/scripts/weapon-tier-independent/ ./scripts/weapon-tier-independent/
COPY --from=builder /app/backend/scripts/weapon-tier-audit/db.cjs ./scripts/weapon-tier-audit/db.cjs

EXPOSE 4000

CMD ["npm", "start"]
