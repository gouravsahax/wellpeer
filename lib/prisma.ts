import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: pg.Pool;
};

const pool =
  globalForPrisma.pgPool ??
  new pg.Pool({
    connectionString: process.env.DATABASE_URL!,
    max: 5,
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 5000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pgPool = pool;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pool),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}