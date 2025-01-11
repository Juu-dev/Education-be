import { PrismaClient } from '@prisma/client';
import { includesConfig } from '@n-modules/generic-service/includesConfig';

export class GenericRepository<T> {
  constructor(private prisma: PrismaClient, private model: string) {
  }

  async create(data: T): Promise<T> {
    return this.prisma[this.model].create({ data });
  }

  async createMany(data: T[]): Promise<T[]> {
    return this.prisma[this.model].createMany({data})
  }

  async findAll(): Promise<T[]> {
    return this.prisma[this.model].findMany({
      // where: {
      //   isDeleted: true
      // }
    });
  }

  async findAllPagination(page: number = 1, limit: number = 10, orderBy?: {}[]): Promise<T[]> {
    const skip = (page - 1) * limit;
    // console.log(this.model, includesConfig[this.model])
    const defaultOrderBy = {
      createdAt: 'desc',
    }
    const orderByBuild = orderBy ? [{
      createdAt: 'desc',
    }, ...orderBy] : defaultOrderBy

    console.log("this.model: ", this.model, includesConfig[this.model])

    return this.prisma[this.model].findMany({
      skip,
      take: limit,
      orderBy: orderByBuild,
      include: includesConfig[this.model] || {},
    });
  }

  async findById(id: string): Promise<T | null> {
    return this.prisma[this.model].findUnique({ where: { id } });
  }

  async updateById(id: string, data: T): Promise<T> {
    return this.prisma[this.model].update({
      where: { id },
      data,
    });
  }

  async hardDeleteById(id: string): Promise<T> {
    return this.prisma[this.model].delete({ where: { id } });
  }

  async softDeleteById(id: string): Promise<T> {
    return this.prisma[this.model].update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date().toISOString(),
      }
    });
  }

  async count(): Promise<number> {
    return this.prisma[this.model].count();
  }
}
