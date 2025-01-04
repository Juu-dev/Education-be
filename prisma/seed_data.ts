import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const readFileJson = (pathFile: string) => {
    const pathRefer = path.join(__dirname, pathFile);
    const data = fs.readFileSync(pathRefer, 'utf-8');
    return JSON.parse(data);
}

const getAccount = () => {
    return readFileJson('data-seed/3_account.json')
}

const getClasses = () => {
    return readFileJson('data-seed/1_classes.json')
}

const getRoles = () => {
    return readFileJson('data-seed/2_roles.json')
}

const seedRoles = async () => {
    const roles = getRoles();

    await Promise.all(
        roles.map(async (role: any) => {
            await prisma.role.upsert({
                where: { name: role.name },
                update: {},
                create: role,
            });
        })
    );
};

const seedClasses = async () => {
    const classes = getClasses();

    const createdClasses = await Promise.all(
        classes.map(async (classData: any) => {
            return prisma.class.create({
                data: classData,
            });
        })
    );

    return createdClasses.map((e) => ({
        id: e.id,
        name: e.name,
    }));
};

interface seedUsersProps {
    id: string;
    name: string;
}

const seedUsers = async (createdClass: seedUsersProps[]) => {
    const accounts = getAccount();

    const users = await Promise.all(
        accounts.map(async (account: any) => {
            return prisma.user.create({
                data: {
                    username: account.email,
                    password: account.password,
                    email: account.email,
                    roles: {
                        create: [
                            {
                                role: {
                                    connectOrCreate: {
                                        where: { name: account.role },
                                        create: { name: account.role },
                                    },
                                },
                            },
                        ],
                    },
                    ...(account.role === "student" && {
                        Student: {
                            create: {
                                name: account.fullName,
                                birthDate: new Date(account.birthDate),
                                level: account.class || null,
                                class: {
                                    connect : {
                                        id: createdClass.find((e) => e.name === account?.className).id
                                    }
                                }
                            },
                        },
                    }),
                    ...(account.role === "teacher" && {
                        Teacher: {
                            create: {
                                name: account.fullName,
                                dob: new Date(account.birthDate),
                                position: account.jobPosition || null,
                                class: {
                                    connect : {
                                        id: createdClass.find((e) => e.name === account?.className).id
                                    }
                                }
                            },
                        },
                    }),
                    ...(account.role === "librarian" && {
                        librarians: {
                            create: {
                                name: account.fullName,
                                dob: new Date(account.birthDate),
                                position: account.jobPosition || null,
                            },
                        },
                    }),
                },
                include: {
                    roles: {
                        include: {
                            role: true,
                        },
                    },
                    Student: true,
                    Teacher: true,
                    librarians: true,
                },
            });
        })
    );

    return users;
};

const seedDocuments = async () => {
    const teachers = await prisma.teacher.findMany();

    const documentPromises = [];

    teachers.forEach((teacher) => {
        for (let i = 1; i <= 10; i++) {
            documentPromises.push(
                prisma.document.create({
                    data: {
                        teacherId: teacher.id,
                        type: 'Assignment',
                        description: `Homework assignment ${i} for ${teacher.name}`,
                        createdAt: new Date(),
                        url: `http://example.com/homework${i}.pdf`,
                    },
                })
            );
        }
    });

    await Promise.all(documentPromises);
};

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
    // await clearDatabase();
    // console.log('Clearing database completed!');

    // Seed roles
    await seedRoles();
    console.log('Seeding roles completed!');

    // Seed classes
    const createdClassIds = await seedClasses();
    console.log('Seeding classes completed!');

    // Seed users
    await seedUsers(createdClassIds)
    console.log('Seeding users completed!');

    // Done
    console.log('Seeding All completed!');
};

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
