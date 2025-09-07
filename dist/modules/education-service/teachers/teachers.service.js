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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const teachers_repository_1 = require("./teachers.repository");
let TeachersService = class TeachersService {
    constructor(teachersRepository) {
        this.teachersRepository = teachersRepository;
    }
    async createTeacher(createTeacherDto) {
        return this.teachersRepository.create(createTeacherDto);
    }
    async getListTeacher(page, pageSize) {
        const count = await this.teachersRepository.count();
        const items = await this.teachersRepository.findAllPagination({
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
    async getAllTeachers() {
        const teachers = await this.teachersRepository.findAllWithClass();
        return { data: teachers };
    }
    async getTeacherById(id) {
        const teacher = await this.teachersRepository.findById(id);
        if (!teacher) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.USER_NOT_FOUND);
        }
        return { data: teacher };
    }
    async getTeacherByUserId(userId) {
        const teacher = await this.teachersRepository.findByUserId(userId);
        if (!teacher) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.USER_NOT_FOUND);
        }
        return { data: teacher };
    }
    async updateTeacher(id, updateTeacherDto) {
        const teacher = await this.teachersRepository.findById(id);
        if (!teacher) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.USER_NOT_FOUND);
        }
        return this.teachersRepository.updateById(id, updateTeacherDto);
    }
};
TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [teachers_repository_1.TeachersRepository])
], TeachersService);
exports.TeachersService = TeachersService;
//# sourceMappingURL=teachers.service.js.map