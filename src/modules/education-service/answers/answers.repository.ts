import { Injectable } from '@nestjs/common';
import { Answer } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from "@n-modules/generic-service/generic.repository";

interface IAnswerSelectedOption {
  questionId: string;
  optionId: string;
}

interface IAnswer {
  studentId: string;
  exerciseId: string;
  answers: IAnswerSelectedOption[];
  mark: number;
}

@Injectable()
export class AnswersRepository extends GenericRepository<Answer> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'answer');
  }

  createAnswer(data: IAnswer) {
    return this.prismaService.answer.create({
      data: {
        mark: data.mark,
        user: {
          connect: {
            id: data.studentId,
          },
        },
        exercise: {
          connect: {
            id: data.exerciseId,
          },
        },
        questionAnswers: {
          create: data.answers.map((e) => ({
            question: {
              connect: {
                id: e.questionId
              }
            },
            selectedOption: {
              connect: {
                id: e.optionId
              }
            },
          }))
        }
      }
    })
  }

  countRightAnswer(data: IAnswerSelectedOption[]) {
    const questionIds = data.map((item) => item.questionId);
    const selectedOptionIds = data.map((item) => item.optionId);
    return this.prismaService.question.count({
      where: {
        id: { in: questionIds },
        options: {
          some: {
            id: { in: selectedOptionIds },
            isCorrect: true,
          },
        },
      },
    });
  }

  countQuestionsInQuiz(exerciseId: string): Promise<number> {
    return this.prismaService.question.count({
      where: {
        quiz: {
          exercise: {
            some: {
              id: exerciseId,
            },
          }
        },
      },
    });
  }
}
