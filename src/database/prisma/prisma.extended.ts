import { Prisma, PrismaClient } from '@prisma/client';
import kyselyExtension from 'prisma-extension-kysely';
import type { DB } from '@n-database/kysely/types';
import {
  CamelCasePlugin,
  Kysely, PostgresAdapter, PostgresIntrospector, PostgresQueryCompiler,
} from 'kysely';

export const customPrismaClient = (prismaClient: PrismaClient) => prismaClient.$extends(
  kyselyExtension({
    kysely: (driver) =>
      new Kysely<DB>({
        dialect: {
          createDriver: () => driver,
          createAdapter: () => new PostgresAdapter(),
          createIntrospector: (db) => new PostgresIntrospector(db),
          createQueryCompiler: () => new PostgresQueryCompiler(),
        },
        plugins: [
          new CamelCasePlugin(),
        ],
      }),
  }),

);

export class PrismaClientExtended extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel> {
  customPrismaClient: CustomPrismaClient;

  get kysely() {
    if (!this.customPrismaClient) this.customPrismaClient = customPrismaClient(this);

    return this.customPrismaClient.$kysely;
  }
}

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;
