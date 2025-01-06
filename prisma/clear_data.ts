import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const clearDatabase = async () => {
    const tables = await prisma.$queryRaw<
        { tablename: string }[]
    >`SELECT tablename FROM pg_tables WHERE schemaname = 'public'`;

    for (const table of tables) {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table.tablename}" CASCADE`);
    }

    console.log('All tables cleared!');
};


const main = async () => {
    // Clear Database
    await clearDatabase();
    console.log('Clearing database completed!');
};

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
