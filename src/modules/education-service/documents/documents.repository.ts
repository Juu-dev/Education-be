import { Injectable } from '@nestjs/common';
import { Document } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/generic.repository';

@Injectable()
export class DocumentsRepository extends GenericRepository<Document> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'document');
  }

  async countByTeacherId(id: string): Promise<number> {
    return this.prismaService.document.count({
      where: {
        teacherId: id,
      },
    });
  }

  async findAllPaginationByTeacherId(page: number = 1, limit: number = 10, id: string = ''): Promise<Document[]> {
    const skip = (page - 1) * limit;
    return this.prismaService.document.findMany({
      skip,
      take: limit,
      where: {
        teacherId: id,
      },
      include: {
        teacher: true,
      },
    });
  }
}
