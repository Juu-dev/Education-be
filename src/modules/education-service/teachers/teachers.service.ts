import {Injectable} from '@nestjs/common';
import {BaseException} from '@n-exceptions';
import {Errors} from '@n-constants';
import {CreateTeacherDto, UpdateTeacherDto} from './dto';
import {TeachersRepository} from './teachers.repository';

@Injectable()
export class TeachersService {
    constructor(private readonly teachersRepository: TeachersRepository) {
    }

    async createTeacher(createTeacherDto: CreateTeacherDto) {
        return this.teachersRepository.create(createTeacherDto as any);
    }

    async getListTeacher(
        page?: number,
        pageSize?: number,
    ) {
        const count = await this.teachersRepository.count();

        const items = await this.teachersRepository.findAllPagination(page, pageSize);

        return {
            page: page,
            pageSize: pageSize,
            totalPage: Math.ceil(count / pageSize),
            count,
            items,
        };
    }

    async getTeacherById(id: string) {
        const teacher = await this.teachersRepository.findById(id);

        if (!teacher) {
            throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
        }

        return teacher;
    }

    async updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto) {
        const teacher = await this.teachersRepository.findById(id);
        if (!teacher) {
            throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
        }

        return this.teachersRepository.updateById(
            id,
            updateTeacherDto as any,
        );

    }
}
