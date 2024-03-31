import { PrismaClient } from "@prisma/client";

declare global {
  let prisma: PrismaClient;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;