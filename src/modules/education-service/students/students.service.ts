import {Injectable} from '@nestjs/common';
import {BaseException} from '@n-exceptions';
import {Errors} from '@n-constants';
import {CreateStudentDto, UpdateStudentDto} from './dto';
import {StudentsRepository} from './students.repository';

@Injectable()
export class StudentsService {
    constructor(private readonly studentsRepository: StudentsRepository) {
    }

    async createStudent(createStudentDto: CreateStudentDto) {
        return this.studentsRepository.create(createStudentDto as any);
    }

    async getListStudent(
        page?: number,
        pageSize?: number,
    ) {
        const count = await this.studentsRepository.count();

        const items = await this.studentsRepository.findAllPagination(page, pageSize);

        return {
            page: page,
            pageSize: pageSize,
            totalPage: Math.ceil(count / pageSize),
            count,
            items,
        };
    }

    async getStudentById(id: string) {
        const student = await this.studentsRepository.findById(id);

        if (!student) {
            throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
        }

        return student;
    }

    async updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
        const student = await this.studentsRepository.findById(id);
        if (!student) {
            throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
        }

        return this.studentsRepository.updateById(
            id,
            updateStudentDto as any,
        );

    }
}
