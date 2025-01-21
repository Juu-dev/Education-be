import {getExercises} from "./read-file";

export const seedExercises = async (prisma: any, quizIds: string[]) => {
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
