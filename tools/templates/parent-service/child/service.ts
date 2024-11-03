import { Injectable } from '@nestjs/common';
import { Prisma, {{Schema_in_prisma}} } from '@prisma/client';
import { BaseException } from '@n-exceptions';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, Errors } from '@n-constants';
import { Create{{Service_not_s}}Dto, Update{{Service_not_s}}Dto } from './dtos';
import { {{Service_s_or_es}}Repository } from './{{service_s_or_es}}.repository';

@Injectable()
export class {{Service_s_or_es}}Service {
  constructor(private readonly {{service_s_or_es}}Repository: {{Service_s_or_es}}Repository) {}

  async create{{Service_not_s}}(create{{Service_not_s}}Dto: Create{{Service_not_s}}Dto): Promise<{{Schema_in_prisma}}> {
    const new{{Service_not_s}}Data = {
      ...create{{Service_not_s}}Dto,
      platformId,
    } as Prisma.{{Schema_in_prisma}}CreateInput;

    return this.{{service_s_or_es}}Repository.create(new{{Service_not_s}}Data);
  }

  getList{{Service_not_s}}(
    
  ) {
    return this.{{service_s_or_es}}Repository.findList(platformId);
  }

  async getListPaginated{{Service_not_s}}(
    
    page?: number,
    pageSize?: number,
  ) {
    const limit = pageSize || DEFAULT_PAGE_SIZE;
    const offset =
      pageSize * (page - 1) || DEFAULT_PAGE_SIZE * (DEFAULT_PAGE - 1);

    const count = await this.{{service_s_or_es}}Repository.count(
      platformId,
    );

    const items = await this.{{service_s_or_es}}Repository.findList(
      platformId,
      limit,
      offset,
    );

    return {
      page: offset / limit + 1,
      pageSize: limit,
      totalPage: Math.ceil(count / limit),
      count,
      items,
    };
  }

  async get{{Service_not_s}}ById(platformId:number, id: string): Promise<{{Schema_in_prisma}}> {
    const {{service_not_s}} = await this.{{service_s_or_es}}Repository.findById(platformId, id);
    if (!{{service_not_s}}) {
      throw new BaseException(Errors.{{SERVICE_NOT_S}}.NOT_FOUND);
    }
    return {{service_not_s}};
  }

  async update{{Service_not_s}}(platformId:number, id: string, update{{Service_not_s}}Dto: Update{{Service_not_s}}Dto): Promise<{{Schema_in_prisma}}> {
    const {{service_not_s}} = await this.{{service_s_or_es}}Repository.findById(platformId, id);
    if (!{{service_not_s}}) {
      throw new BaseException(Errors.{{SERVICE_NOT_S}}.NOT_FOUND);
    }

    const update{{Service_not_s}}Data = {
      ...update{{Service_not_s}}Dto,
    } as Prisma.{{Schema_in_prisma}}UpdateInput;

    const updated{{Service_not_s}} = await this.{{service_s_or_es}}Repository.update(
      platformId,
      id,
      update{{Service_not_s}}Data,
    );
    return updated{{Service_not_s}};
  }

  async delete{{Service_not_s}}ById( id: string) {
    const {{service_not_s}} = await this.{{service_s_or_es}}Repository.findById(platformId, id);
    if (!{{service_not_s}}) {
      throw new BaseException(Errors.{{SERVICE_NOT_S}}.NOT_FOUND);
    }

    return this.{{service_s_or_es}}Repository.softDelete(platformId, id);
  }
}
