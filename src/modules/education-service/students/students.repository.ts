import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/generic.repository';
import {includesConfig} from "@n-modules/generic-service/includesConfig";
import {IFindAllPagination} from "@n-modules/generic-service/generic.interface";

@Injectable()
export class StudentsRepository extends GenericRepository<Student> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'student');
  }

  async findByClassId(classId: string, props?: IFindAllPagination): Promise<Student[] | null> {
    const {
      page = 1,
      pageSize = 10,
    } = props;
    const skip = (page - 1) * pageSize;

    return this.prismaService.student.findMany({
        include: includesConfig["student"] || {},
        skip,
        take: pageSize,
        where: {
            user: {
              classId: classId,
              isDeleted: false,
            },
          },
        }
    );
  }

  async countByClassId(classId: string): Promise<number> {
      return this.prismaService.student.count({
          where: {
              user: {
                  classId: classId,
                  isDeleted: false,
              },
          }
      });
  }
}
