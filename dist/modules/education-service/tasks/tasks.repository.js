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
exports.TasksRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const generic_repository_1 = require("../../generic-service/generic.repository");
let TasksRepository = class TasksRepository extends generic_repository_1.GenericRepository {
    constructor(prismaService) {
        super(prismaService, 'task');
        this.prismaService = prismaService;
    }
    findFiveLatest(userId) {
        const limit = 5;
        const now = new Date();
        return this.prismaService.task.findMany({
            where: {
                assigneeId: userId,
                endTime: {
                    gte: now,
                },
            },
            take: limit,
            orderBy: {
                endTime: "asc"
            },
            include: {
                assignee: true,
                assigner: true
            },
        });
    }
    findAllPaginationWithSpecificMode(props) {
        const { page, pageSize: limit, mode, id } = props;
        const skip = (page - 1) * limit;
        const where = {};
        if (mode === "sent") {
            where.assignerId = id;
        }
        else if (mode === "received") {
            where.assigneeId = id;
        }
        return this.prismaService.task.findMany({
            skip,
            take: limit,
            where,
            include: {
                assignee: true,
                assigner: true
            },
        });
    }
};
TasksRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksRepository);
exports.TasksRepository = TasksRepository;
//# sourceMappingURL=tasks.repository.js.map