import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const readFileJson = (pathFile: string) => {
    const pathRefer = path.join(__dirname, pathFile);
    const data = fs.readFileSync(pathRefer, 'utf-8');
    return JSON.parse(data);
}

const getClasses = () => {
    return readFileJson('data-seed/1_classes.json')
}

const getRoles = () => {
    return readFileJson('data-seed/2_roles.json')
}

const getAccount = () => {
    return readFileJson('data-seed/3_accounts.json')
}

const getBooks = () => {
    return readFileJson('data-seed/4_books.json')
}

const getQuizzes = () => {
    return readFileJson('data-seed/5_quizzes.json')
}

const getExercises = () => {
    return readFileJson('data-seed/6_exercises.json')
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
                    birthDate: new Date(account.birthDate),
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
                                level: account.class || null,
                            },
                        },
                    }),
                    ...(account.role === "teacher" && {
                        teacher: {
                            create: {
                                position: account.jobPosition || null,
                            },
                        },
                    }),
                    ...(account.role === "librarian" && {
                        librarian: {
                            create: {
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

const seedBooks = async () => {
    const books = getBooks();

    const createdBooks = await Promise.all(
        books.map(async (book: any) => {
            return prisma.book.create({
                data: book,
            })
        })
    )

    return createdBooks;
}

const seedQuizzes = async () => {
    const quizzes = getQuizzes();

    const creatorEmail = "an.ptb@g.com";
    const creator = await prisma.user.findFirst({
        where: {
            email: creatorEmail
        }
    })

    const quizList = await Promise.all(
        quizzes.map(async (quiz: any) => {
            return prisma.quiz.create({
                data: {
                    title: quiz.title,
                    creator: {
                        connect: {
                            id: creator.id
                        }
                    },
                    questions: {
                        create: quiz.questions.map((question) => ({
                            content: question.content,
                            options: {
                                create: question.options.map((e) => ({
                                    content: e.content,
                                    isCorrect: e.isCorrect
                                }))
                            }
                        }))
                    },
                },
            })
        })
    )

    return quizList.map(quiz => quiz.id)
}

const seedExercises = async (quizIds: string[]) => {
    const exercises = getExercises()

    const assignerName = "an.ptb@g.com"
    const assigner = await prisma.user.findFirst({
        where: {
            email: assignerName
        }
    })
    const className = "1A"
    const classes = await prisma.class.findFirst({
        where: {
            name: className
        }
    })

    await Promise.all(
        exercises.map(async (exercise: any) => {
            await prisma.exercise.create({
                data: {
                    ...exercise,
                    assigner: {
                        connect: {
                            id: assigner.id,
                        }
                    },
                    classAssignee: {
                        connect: {
                            id: classes.id
                        }
                    },
                    quiz: {
                        connect: {
                            id: quizIds[0]
                        }
                    }
                },
            })
        })
    )
}

const main = async () => {
    // Seed roles
    await seedRoles();
    console.log('Seeding roles completed!');

    // Seed classes
    const createdClass = await seedClasses();
    console.log('Seeding classes completed!');

    // Seed users
    await seedUsers(createdClass)
    console.log('Seeding users completed!');

    // Seed books
    await seedBooks()
    console.log('Seeding books completed!');

    // Seed Quizzes
    const quizIds = await seedQuizzes()
    console.log('Seeding quizzes completed!');

    await seedExercises(quizIds)
    console.log('Seeding exercises completed!');

    // Done
    console.log('Seeding All completed!');
};

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
