import { Injectable } from '@nestjs/common';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import { CreateClassDto, UpdateClassDto } from './dto';
import { ClassesRepository } from './classes.repository';

@Injectable()
export class ClassesService {
  constructor(private readonly classesRepository: ClassesRepository) {
  }

  async createClass(createClassDto: CreateClassDto) {
    return this.classesRepository.create(createClassDto as any);
  }

  async getListClass(
    page?: number,
    pageSize?: number,
  ) {
    const count = await this.classesRepository.count();

    const items = await this.classesRepository.findAllPagination(page, pageSize);

    return {
      pagination: {
        page,
        pageSize,
        totalPage: Math.ceil(count / pageSize),
      },
      count,
      data: items,
    };
  }

  async getClassById(id: string) {
    const classResult = await this.classesRepository.findById(id);

    if (!classResult) {
      throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
    }

    return classResult;
  }

  async updateClass(id: string, updateClassDto: UpdateClassDto) {
    const classResult = await this.classesRepository.findById(id);
    if (!classResult) {
      throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
    }

    return this.classesRepository.updateById(
      id,
      updateClassDto as any,
    );
  }
}
