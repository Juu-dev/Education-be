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
exports.DocumentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const generic_repository_1 = require("../../generic-service/generic.repository");
let DocumentsRepository = class DocumentsRepository extends generic_repository_1.GenericRepository {
    constructor(prismaService) {
        super(prismaService, 'document');
        this.prismaService = prismaService;
    }
    async createDocument(createDocumentDto) {
        const { userId, ...rest } = createDocumentDto;
        return this.prismaService.document.create({
            data: {
                ...rest,
                user: {
                    connect: {
                        id: userId,
                    }
                },
            }
        });
    }
    async countByUserId(id) {
        return this.prismaService.document.count({
            where: {
                userId: id,
            },
        });
    }
    async findAllPaginationWithFilter(props) {
        const { pageSize: limit, page, filter, search } = props;
        const skip = (page - 1) * limit;
        const where = {};
        if (filter?.type?.length > 0) {
            where.type = {
                in: filter.type,
            };
        }
        if (search) {
            where.description = {
                search: search,
            };
        }
        return this.prismaService.document.findMany({
            skip,
            take: limit,
            where,
            include: {
                user: true,
            },
        });
    }
    async findAllPaginationByTeacherId(props) {
        const { userId, pageSize: limit, page, filter, search } = props;
        const skip = (page - 1) * limit;
        const where = { userId };
        if (filter?.type?.length > 0) {
            where.type = {
                in: filter.type,
            };
        }
        if (search) {
            where.description = {
                contains: search, mode: "insensitive"
            };
        }
        return this.prismaService.document.findMany({
            skip,
            take: limit,
            where,
            include: {
                user: true,
            },
        });
    }
};
DocumentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentsRepository);
exports.DocumentsRepository = DocumentsRepository;
//# sourceMappingURL=documents.repository.js.map