import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();
// in order  to not create bunch of new prisma instances
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
