import {getQuizzes} from "./read-file";

export const seedQuizzes = async (prisma: any) => {
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
