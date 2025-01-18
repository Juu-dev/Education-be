import { Injectable } from '@nestjs/common';
import { Quiz } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from "@n-modules/generic-service/generic.repository";

interface IQuiz {
  title: string;
  creatorId: string;
  questions: {
    content: string;
    answers: {
      content: string
      isCorrect: boolean;
    }[];
  }[]
}

@Injectable()
export class QuizzesRepository extends GenericRepository<Quiz> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'quiz');
  }

  createQuiz(data: IQuiz) {
    return this.prismaService.quiz.create({
      data: {
        title: data.title,
        creator: {
          connect: {
            id: data.creatorId,
          },
        },
        questions: {
          create: data.questions.map((q) => ({
            content: q.content,
            options: {
              create: q.answers.map((a) => ({
                content: a.content,
                isCorrect: a.isCorrect,
              })),
            },
          })),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  findQuizAndExercise(quizId: string): Promise<any> {
    return this.prismaService.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        exercise: true,
      },
    });
  }

  findByIdAndQuestion(quizId: string): Promise<any> {
    return this.prismaService.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        id: true,
        questions: {
          select: {
            id: true,
            options: true,
          }
        }
      }
    })
  }

  updateByIdWithAnswer(id: string, updateQuizData: any, newQuestion: any): Promise<any> {
    return this.prismaService.quiz.update({
      where: {
        id,
      },
      data: {
        title: updateQuizData.title,
        questions: {
          update: updateQuizData.questions.map((q) => ({
            where: {
              id: q.id,
            },
            data: {
              content: q.content,
              options: {
                update: q.answers.map((a) => ({
                  where: {
                    id: a.id,
                  },
                  data: {
                    content: a.content,
                    isCorrect: a.isCorrect,
                  },
                })),
              },
            },
          })),
          create: newQuestion.map((q) => ({
            content: q.content,
            options: {
              create: q.answers.map((a) => ({
                content: a.content,
                isCorrect: a.isCorrect,
              })),
            },
          })),
        },
      },
    });
  }

  countQuestions(quizId: string, questionIds: string[]): Promise<number> {
    return this.prismaService.question.count({
      where: {
        quizId,
        id: {
          in: questionIds,
        },
      },
    });
  }

  deleteQuestionsWithCascade(questionIds: string[]) {
    return this.prismaService.question.deleteMany({
      where: {
        id: {
          in: questionIds,
        },
      },
    });
  }
}
