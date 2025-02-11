import { PrismaClient } from '@prisma/client';
import { includesConfig } from '@n-modules/generic-service/includesConfig';
import {ICount, IFindAll, IFindAllPagination} from "@n-modules/generic-service/generic.interface";

export class GenericRepository<T> {
  constructor(private prisma: PrismaClient, private model: string) {
  }

  async create(data: T): Promise<T> {
    return this.prisma[this.model].create({ data });
  }

  async createMany(data: T[]): Promise<T[]> {
    return this.prisma[this.model].createMany({data: data, skipDuplicates: true})
  }

  async findAll(props?: IFindAll): Promise<T[]> {
    const conditionParams: any = {}

    if (props?.where) {
      conditionParams.where = props.where
    }

    return this.prisma[this.model].findMany({
      ...conditionParams
    });
  }

  async findAllPagination(props?: IFindAllPagination): Promise<T[]> {
    const {
      page = 1,
      pageSize = 10,
      orderBy,
    } = props;
    const skip = (page - 1) * pageSize;
    // console.log(this.model, includesConfig[this.model])
    const defaultOrderBy = {
      createdAt: 'desc',
    }
    const orderByBuild = orderBy ? [...orderBy, {
      createdAt: 'desc',
    }] : defaultOrderBy

    const conditionParams: any = {}

    if (props?.where) {
      conditionParams.where = props.where
    }

    return this.prisma[this.model].findMany({
      skip,
      take: pageSize,
      ...conditionParams,
      orderBy: orderByBuild,
      include: includesConfig[this.model] || {},
    });
  }

  async findAllPaginationModeStudent(props?: IFindAllPagination): Promise<T[]> {
    const {
      page = 1,
      pageSize = 10,
      orderBy,
    } = props;
    const skip = (page - 1) * pageSize;
    // console.log(this.model, includesConfig[this.model])
    const defaultOrderBy = {
      createdAt: 'desc',
    }
    const orderByBuild = orderBy ? [{
      createdAt: 'desc',
    }, ...orderBy] : defaultOrderBy

    const conditionParams: any = {}

    if (props?.where) {
      conditionParams.where = props.where
    }

    return this.prisma[this.model].findMany({
      skip,
      take: pageSize,
      ...conditionParams,
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

  async count(props?: ICount): Promise<number> {
    const conditionParams: any = {}

    if (props?.where) {
      conditionParams.where = props?.where
    }

    return this.prisma[this.model].count(conditionParams);
  }
}
