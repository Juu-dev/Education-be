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
exports.StudentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const generic_repository_1 = require("../../generic-service/generic.repository");
const includesConfig_1 = require("../../generic-service/includesConfig");
let StudentsRepository = class StudentsRepository extends generic_repository_1.GenericRepository {
    constructor(prismaService) {
        super(prismaService, 'student');
        this.prismaService = prismaService;
    }
    async findByClassId(classId, props) {
        const { page = 1, pageSize = 10, } = props;
        const skip = (page - 1) * pageSize;
        return this.prismaService.student.findMany({
            include: includesConfig_1.includesConfig["student"] || {},
            skip,
            take: pageSize,
            where: {
                user: {
                    classId: classId,
                    isDeleted: false,
                },
            },
        });
    }
    async countByClassId(classId) {
        return this.prismaService.student.count({
            where: {
                user: {
                    classId: classId,
                    isDeleted: false,
                },
            }
        });
    }
};
StudentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsRepository);
exports.StudentsRepository = StudentsRepository;
//# sourceMappingURL=students.repository.js.map