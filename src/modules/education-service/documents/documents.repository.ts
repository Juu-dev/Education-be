import { Injectable } from '@nestjs/common';
import { Document } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/generic.repository';
import {IGetListDocumentsDTO} from "@n-modules/education-service/documents/documents.service";

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

  async findAllPaginationWithFilter(props: IGetListDocumentsDTO): Promise<Document[]> {
    const {pageSize: limit, page, filter, search} = props
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filter?.type?.length > 0) {
      where.type = {
        in: filter.type,
      };
    }

    if (search) {
      where.description = {
        search: search,
      };
    }

    return this.prismaService.document.findMany({
      skip,
      take: limit,
      where,
      include: {
        teacher: true,
      },
    });
  }

  async findAllPaginationByTeacherId(props: IGetListDocumentsDTO): Promise<Document[]> {
    const {teacherId, pageSize: limit, page, filter, search} = props
    const skip = (page - 1) * limit;

    const where: any = {teacherId}

    if (filter?.type?.length > 0) {
      where.type = {
        in: filter.type,
      };
    }

    if (search) {
      where.description = {
        contains: search, mode: "insensitive"
      };
    }

    return this.prismaService.document.findMany({
      skip,
      take: limit,
      where,
      include: {
        teacher: true,
      },
    });
  }
}
