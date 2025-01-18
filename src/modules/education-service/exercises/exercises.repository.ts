import { PrismaService } from '@n-database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {Exercise} from '@prisma/client';
import {GenericRepository} from "@n-modules/generic-service/generic.repository";

@Injectable()
export class ExercisesRepository extends GenericRepository<Exercise> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'exercise');
  }

  async findByIdWithQuestion(id: string): Promise<any | null> {
    return this.prismaService.exercise.findUnique({
      where: {
        id: id
      },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                options: {
                  select: {
                    id: true,
                    questionId: true,
                    content: true,
                  }
                },
              }
            }
          }
        }
      }
    });
  }
}
