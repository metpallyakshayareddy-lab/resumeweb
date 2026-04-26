import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prevent Prisma from crashing Next.js build on Vercel with SQLite
let prismaInstance: PrismaClient;

// Is NEXT_PHASE not available? Fallback to checking process.argv
const isBuildPhase = process.argv.includes('build') || process.env.npm_lifecycle_event === 'build';

if (isBuildPhase) {
  // Return a mock Proxy object during Next.js build to prevent static evaluation crashes
  prismaInstance = new Proxy({}, {
    get: () => {
      return () => Promise.resolve({});
    }
  }) as unknown as PrismaClient;
} else {
  prismaInstance = globalForPrisma.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance;
}

export const prisma = prismaInstance;
