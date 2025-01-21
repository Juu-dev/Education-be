import {getRoles} from "./read-file";

export const seedRoles = async (prisma: any) => {
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
