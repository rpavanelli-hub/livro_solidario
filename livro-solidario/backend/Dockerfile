# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && \
    npm cache clean --force

# Runtime stage
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY prisma ./prisma
COPY src ./src
COPY public ./public

RUN npm install -g prisma && npx prisma generate

EXPOSE 8080

ENV NODE_ENV=production

RUN npx prisma migrate deploy || true

CMD ["node", "src/server.js"]
