import { Injectable } from '@nestjs/common';
import { Teacher } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/generic.repository';

@Injectable()
export class TeachersRepository extends GenericRepository<Teacher> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'teacher');
  }

  async findByUserId(userId: string): Promise<Teacher | null> {
    return this.prismaService.teacher.findFirst({
      where: { userId },
      include: {
        user: {
          include: {
            class: true,
          }
        }
      },
    });
  }

  async findAllWithClass(): Promise<Teacher[] | null> {
    return this.prismaService.teacher.findMany({
      include: {
        user: {
          include: {
            class: true,
          }
        },
      },
    });
  }
}
