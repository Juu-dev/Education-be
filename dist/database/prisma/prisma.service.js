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
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const colorette_1 = require("colorette");
const _n_utils_1 = require("../../utils/index");
const prisma_extended_1 = require("./prisma.extended");
let PrismaService = PrismaService_1 = class PrismaService extends prisma_extended_1.PrismaClientExtended {
    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
                {
                    emit: 'event',
                    level: 'error',
                },
                {
                    emit: 'event',
                    level: 'info',
                },
                {
                    emit: 'event',
                    level: 'warn',
                },
            ],
        });
        this.loggerTerminal = new common_1.Logger(PrismaService_1.name);
        this.logger = (0, _n_utils_1.logger)({
            infoFile: 'prisma-info.log',
            errorFile: 'prisma-error.log',
        });
        this.softDeleteMiddleware = async (params, next) => {
            if (params.action === 'delete') {
                return next({
                    ...params,
                    action: 'update',
                    args: {
                        ...params.args,
                        data: {
                            isActive: false,
                        },
                    },
                });
            }
            if (params.action === 'deleteMany') {
                return next({
                    ...params,
                    action: 'updateMany',
                    args: {
                        ...params.args,
                        data: {
                            isActive: false,
                        },
                    },
                });
            }
            return next(params);
        };
        this.findMiddleware = async (params, next) => {
            if (['findUnique', 'findFirst', 'findMany', 'count'].includes(params.action)) {
                const hasStatus = params.args?.where && this.hasStatusCondition(params.args.where);
                if (!hasStatus) {
                    params = {
                        ...params,
                        args: {
                            ...params.args,
                            where: {
                                ...params.args?.where,
                                isActive: true,
                            },
                        },
                    };
                }
                if (params.action === 'findUnique' || params.action === 'findFirst') {
                    params.action = 'findFirst';
                }
            }
            return next(params);
        };
    }
    async onModuleDestroy() {
        await this.$disconnect();
        throw new Error('Method not implemented.');
    }
    async onModuleInit() {
        await this.$connect();
        this.$on('error', ({ message }) => {
            this.loggerTerminal.error(message);
            this.logger.error(message);
        });
        this.$on('warn', ({ message }) => {
            this.loggerTerminal.warn(message);
        });
        this.$on('info', ({ message }) => {
            this.loggerTerminal.debug(message);
            this.logger.info(message);
        });
        this.$on('query', ({ query, params }) => {
            const transformedQuery = this.simplifyQuery(query, params);
            this.loggerTerminal.log((0, colorette_1.blue)(transformedQuery));
        });
    }
    simplifyQuery(inputQuery, params) {
        try {
            const paramsObject = JSON.parse(params);
            const tableNameMatch = inputQuery.match(/"public"\."\w+"/);
            if (!tableNameMatch) {
                throw new Error('Table name not found in the query.');
            }
            const tableName = tableNameMatch[0].split('"').join('').split('.')[1];
            let simplifiedQuery = inputQuery.replace(/"public"\."\w+"/g, tableName);
            paramsObject.forEach((param, index) => {
                simplifiedQuery = simplifiedQuery.replace(`$${index + 1}`, `'${param}'`);
            });
            return simplifiedQuery;
        }
        catch (error) {
            return inputQuery;
        }
    }
    hasStatusCondition(where) {
        if (where.isActive !== undefined) {
            return true;
        }
        return ['AND', 'OR', 'NOT'].some((condition) => {
            if (where[condition]) {
                const conditions = Array.isArray(where[condition]) ? where[condition] : [where[condition]];
                return conditions.some((subWhere) => this.hasStatusCondition(subWhere));
            }
            return false;
        });
    }
};
PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
exports.PrismaService = PrismaService;
//# sourceMappingURL=prisma.service.js.map