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
                    name: account.fullName,
                    class: {
                        connect : {
                            id: createdClass.find((e) => e.name === account?.className).id
                        }
                    },
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
                        student: {
                            create: {
                                birthDate: new Date(account.birthDate),
                                level: account.class || null,
                            },
                        },
                    }),
                    ...(account.role === "teacher" && {
                        teacher: {
                            create: {
                                dob: new Date(account.birthDate),
                                position: account.jobPosition || null,

                            },
                        },
                    }),
                    ...(account.role === "librarian" && {
                        librarian: {
                            create: {
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
                    student: true,
                    teacher: true,
                    librarian: true,
                    class: true,
                },
            });
        })
    );

    return users;
};

const main = async () => {
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
