import {getDocuments} from "./read-file";

export const seedDocuments = async (prisma: any) => {
    const documents = getDocuments();

    const userName = "an.ptb@g.com"
    const user = await prisma.user.findFirst({
        where: {
            email: userName
        }
    })

    await Promise.all(
        documents.map(async (document: any) => {
            await prisma.document.create({
                data: {
                    ...document,
                    userId: user.id
                },
            });
        })
    );
};
