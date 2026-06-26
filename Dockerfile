# Base image
FROM node:20-alpine AS base

# Install openssl and certificates for prisma and external databases
RUN apk add --no-cache openssl libc6-compat ca-certificates

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy database schema and generate prisma client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code and build
COPY . .
RUN npm run build

# Expose port 3000
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["npm", "start"]
