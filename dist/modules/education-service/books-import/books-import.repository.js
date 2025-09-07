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
exports.BooksImportRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const generic_repository_1 = require("../../generic-service/generic.repository");
let BooksImportRepository = class BooksImportRepository extends generic_repository_1.GenericRepository {
    constructor(prismaService) {
        super(prismaService, 'bookImport');
        this.prismaService = prismaService;
    }
    deleteAllBooks() {
        return this.prismaService.bookImport.updateMany({
            where: {
                isDeleted: false
            },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
            }
        });
    }
    async getOverviewBook() {
        const result = await this.prismaService.bookImport.aggregate({
            _count: {
                id: true,
            },
            _sum: {
                amount: true,
                borrowedAmount: true,
            },
            where: {
                isDeleted: false,
            },
        });
        return {
            totalBookTitles: result._count.id,
            totalBooks: result._sum.amount || 0,
            totalBorrowedBooks: result._sum.borrowedAmount || 0,
        };
    }
};
BooksImportRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksImportRepository);
exports.BooksImportRepository = BooksImportRepository;
//# sourceMappingURL=books-import.repository.js.map