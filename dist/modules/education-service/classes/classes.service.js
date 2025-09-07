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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const classes_repository_1 = require("./classes.repository");
let ClassesService = class ClassesService {
    constructor(classesRepository) {
        this.classesRepository = classesRepository;
    }
    async createClass(createClassDto) {
        return this.classesRepository.create(createClassDto);
    }
    async getAllClass() {
        const classes = await this.classesRepository.findAll();
        return {
            data: classes,
        };
    }
    async getListClass(page, pageSize, search) {
        const where = {};
        if (search) {
            where.name = {
                contains: search, mode: "insensitive"
            };
        }
        const count = await this.classesRepository.count({ where });
        const orderBy = [{ name: "asc" }];
        const items = await this.classesRepository.findAllPagination({
            page,
            pageSize,
            orderBy,
            where
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
    async getClassById(id) {
        const classResult = await this.classesRepository.findById(id);
        if (!classResult) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.CLASS.CLASS_NOT_FOUND);
        }
        return { data: classResult };
    }
    async getCountStudentByClassId(classId) {
        const count = await this.classesRepository.countStudentByClassId(classId);
        return { data: count };
    }
    async updateClass(id, updateClassDto) {
        const classResult = await this.classesRepository.findById(id);
        if (!classResult) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.CLASS.CLASS_NOT_FOUND);
        }
        return this.classesRepository.updateById(id, updateClassDto);
    }
};
ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [classes_repository_1.ClassesRepository])
], ClassesService);
exports.ClassesService = ClassesService;
//# sourceMappingURL=classes.service.js.map