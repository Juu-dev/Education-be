import { PrismaService } from '@n-database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { {{Schema_in_prisma}}, Prisma } from '@prisma/client';

@Injectable()
export class {{Service_s_or_es}}Repository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly {{service_not_s}}Model = this.prisma.{{schema_in_prisma}};

  private readonly allRecordsCondition = {
    OR: [
      { status: true },
      { status: false },
    ],
  };

  async create(new{{Service_not_s}}Data: Prisma.{{Schema_in_prisma}}CreateInput): Promise<{{Schema_in_prisma}}> {
    return this.{{service_not_s}}Model.create({
      data: new{{Service_not_s}}Data,
    });
  }

  async findList( limit?: number, offset?: number): Promise<{{Schema_in_prisma}}[]> {
    const query: Prisma.{{Schema_in_prisma}}FindManyArgs = {
      where: {
        platformId,
        AND: [
          this.allRecordsCondition,
        ],
      },
    };

    if (limit) {
      query.take = limit;
    }

    if (offset) {
      query.skip = offset;
    }

    // sort by createdAt and status
    query.orderBy = [
      // { status: 'desc' },
      { createdAt: 'desc' },
    ];

    return this.{{service_not_s}}Model.findMany(query);
  }

  async count(platformid: string): Promise<number> {
    return this.{{service_not_s}}Model.count({
      where: {
        platformId,
        ...this.allRecordsCondition,
      },
    });
  }

  async findById( id: string): Promise<{{Schema_in_prisma}} | null> {
    const query: Prisma.{{Schema_in_prisma}}FindUniqueArgs = {
      where: {
        platformId,
        id,
        AND: [
          this.allRecordsCondition,
        ],
      },
    };

    return this.{{service_not_s}}Model.findUnique(query);
  }

  async update( id: string, update{{Service_not_s}}Data: Prisma.{{Schema_in_prisma}}UpdateInput): Promise<{{Schema_in_prisma}}> {
    return this.{{service_not_s}}Model.update({
      where: { id, platformId },
      data: update{{Service_not_s}}Data,
    });
  }

  async softDelete(platformId:number, id: string) {
    return this.prisma.authServiceUser.delete({ where: { platformId, id } });
  }
}
