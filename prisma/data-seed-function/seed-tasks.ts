import {getTasks} from "./read-file";

export const seedTasks = async (prisma: any) => {
    const tasks = getTasks();

    const assignerName = "binh.ttt@g.com"
    const assigner = await prisma.user.findFirst({
        where: {
            email: assignerName
        }
    })

    const assigneeName = "an.ptb@g.com"
    const assignee = await prisma.user.findFirst({
        where: {
            email: assigneeName
        }
    })

    await Promise.all(
        tasks.map(async (task: any) => {
            return prisma.task.create({
                data: {
                    ...task,
                    assigner: {
                        connect: {
                            id: assigner.id
                        }
                    },
                    assignee: {
                        connect: {
                            id: assignee.id
                        }
                    }
                },
            })
        })
    )
}
