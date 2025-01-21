import {getAccount} from "./read-file";
interface seedUsersProps {
    id: string;
    name: string;
}

export const seedUsers = async (prisma: any, createdClass: seedUsersProps[]) => {
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
