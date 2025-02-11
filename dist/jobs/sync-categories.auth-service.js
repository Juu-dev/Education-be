"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledJobService = void 0;
const common_1 = require("@nestjs/common");
const cron = __importStar(require("node-cron"));
const prisma_service_1 = require("../database/prisma/prisma.service");
const _n_utils_1 = require("../utils/index");
let ScheduledJobService = class ScheduledJobService {
    constructor(prisma) {
        this.prisma = prisma;
        this.listServiceCategory = [
            this.prisma.authServiceCategory,
            this.prisma.scheduleServiceCategory,
            this.prisma.customerServiceCategory,
            this.prisma.productServiceCategory,
        ];
        this.logger = (0, _n_utils_1.logger)({
            infoFile: 'jobs-info.log',
            errorFile: 'jobs-error.log',
        });
        this.isFirstRun = true;
    }
    async onModuleInit() {
        cron.schedule('*/5 * * * *', () => {
            this.categorySyncData();
        });
    }
    async categorySyncData() {
        try {
            if (this.isFirstRun) {
                this.isFirstRun = false;
            }
            const categoriesFromCategoryService = await this.prisma.cateServiceCategory.findMany({ where: _n_utils_1.allRecordsCondition });
            const categoryIds = categoriesFromCategoryService.map((category) => category.id);
            const updateOperations = categoriesFromCategoryService.map((category) => ({
                where: { id: category.id, ..._n_utils_1.allRecordsCondition },
                data: category,
            }));
            await Promise.all(this.listServiceCategory.map(async (serviceCategory) => {
                const existingCategories = await serviceCategory.findMany({
                    where: {
                        id: { in: categoryIds },
                        ..._n_utils_1.allRecordsCondition,
                    },
                });
                const existingCategoryIds = new Set(existingCategories.map((category) => category.id));
                const categoriesToUpdate = updateOperations.filter((operation) => existingCategoryIds.has(operation.where.id));
                const categoriesToCreate = categoriesFromCategoryService.filter((category) => !existingCategoryIds.has(category.id));
                if (categoriesToUpdate.length > 0) {
                    await Promise.all(categoriesToUpdate.map(async (operation) => serviceCategory.update(operation)));
                }
                if (categoriesToCreate.length > 0) {
                    await serviceCategory.createMany({
                        data: categoriesToCreate,
                    });
                }
            }));
            this.logger.info('Sync category_service_categories successfully!');
            this.logger.info('Sync category_service_categories successfully!');
        }
        catch (error) {
            this.logger.error('Sync category_service_categories error:', error);
        }
        finally {
            await this.prisma.$disconnect();
        }
    }
};
ScheduledJobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ScheduledJobService);
exports.ScheduledJobService = ScheduledJobService;
//# sourceMappingURL=sync-categories.auth-service.js.map