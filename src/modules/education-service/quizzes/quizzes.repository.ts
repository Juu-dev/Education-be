import { Injectable } from '@nestjs/common';
import { Quiz } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from "@n-modules/generic-service/generic.repository";

interface IQuiz {
  title: string;
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
    })
  }
}
