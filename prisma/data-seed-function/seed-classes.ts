import {getClasses} from "./read-file";

export const seedClasses = async (prisma: any) => {
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
