"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const students_repository_1 = require("./students.repository");
let StudentsService = class StudentsService {
    constructor(studentsRepository) {
        this.studentsRepository = studentsRepository;
    }
    async createStudent(createStudentDto) {
        return this.studentsRepository.create(createStudentDto);
    }
    async getListStudent(page, pageSize) {
        const count = await this.studentsRepository.count();
        const items = await this.studentsRepository.findAllPagination({
            page,
            pageSize
        });
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
    async getStudentById(id) {
        const student = await this.studentsRepository.findById(id);
        if (!student) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.USER_NOT_FOUND);
        }
        return student;
    }
    async getStudentsByClassId(classId, page, pageSize) {
        const count = await this.studentsRepository.countByClassId(classId);
        const students = await this.studentsRepository.findByClassId(classId, { page, pageSize });
        return {
            pagination: {
                page,
                pageSize,
                totalPage: Math.ceil(count / pageSize),
            },
            count,
            data: students,
        };
    }
    async updateStudent(id, updateStudentDto) {
        const student = await this.studentsRepository.findById(id);
        if (!student) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.USER_NOT_FOUND);
        }
        return this.studentsRepository.updateById(id, updateStudentDto);
    }
};
StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [students_repository_1.StudentsRepository])
], StudentsService);
exports.StudentsService = StudentsService;
//# sourceMappingURL=students.service.js.map