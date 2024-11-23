import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const seedRoles = async () => {
    const roles = [
        { name: 'admin' },
        { name: 'teacher' },
        { name: 'librarian' },
        { name: 'student' },
    ];

    await Promise.all(
        roles.map(async (role) => {
            await prisma.role.upsert({
                where: { name: role.name },
                update: {},
                create: role,
            });
        })
    );
};

const readDataFromFile = () => {
    const accountsPath = path.join(__dirname, 'account.json');
    const accountsData = fs.readFileSync(accountsPath, 'utf-8');
    return JSON.parse(accountsData);
}

const seedUsers = async (createdClassIds: string[]) => {
    const accounts = readDataFromFile();

    const users = await Promise.all(
        accounts.map(async (account) => {
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
                                        id: createdClassIds[0]
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
                                        id: createdClassIds[0]
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


const seedClasses = async () => {
    const classes = [
        { name: 'Class 1' },
        { name: 'Class 2' },
    ];

    const createdClasses = await Promise.all(
        classes.map(async (classData) => {
            return prisma.class.create({
                data: classData,
            });
        })
    );

    return createdClasses.map((e) => e.id);
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

const main = async () => {
    // Seed roles
    await seedRoles();
    console.log('Seeding roles completed!');


    // Seed class
    const createdClassIds = await seedClasses();
    console.log('Seeding classes completed!');

    // Seed users
    await seedUsers(createdClassIds)
    console.log('Seeding users completed!');

    console.log('Seeding All completed!');
};

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
