"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericRepository = void 0;
const includesConfig_1 = require("./includesConfig");
class GenericRepository {
    constructor(prisma, model) {
        this.prisma = prisma;
        this.model = model;
    }
    async create(data) {
        return this.prisma[this.model].create({ data });
    }
    async createMany(data) {
        return this.prisma[this.model].createMany({ data: data, skipDuplicates: true });
    }
    async findAll(props) {
        const conditionParams = {};
        if (props?.where) {
            conditionParams.where = props.where;
        }
        return this.prisma[this.model].findMany({
            ...conditionParams
        });
    }
    async findAllPagination(props) {
        const { page = 1, pageSize = 10, orderBy, } = props;
        const skip = (page - 1) * pageSize;
        const defaultOrderBy = {
            createdAt: 'desc',
        };
        const orderByBuild = orderBy ? [...orderBy, {
                createdAt: 'desc',
            }] : defaultOrderBy;
        const conditionParams = {};
        if (props?.where) {
            conditionParams.where = props.where;
        }
        return this.prisma[this.model].findMany({
            skip,
            take: pageSize,
            ...conditionParams,
            orderBy: orderByBuild,
            include: includesConfig_1.includesConfig[this.model] || {},
        });
    }
    async findAllPaginationModeStudent(props) {
        const { page = 1, pageSize = 10, orderBy, } = props;
        const skip = (page - 1) * pageSize;
        const defaultOrderBy = {
            createdAt: 'desc',
        };
        const orderByBuild = orderBy ? [{
                createdAt: 'desc',
            }, ...orderBy] : defaultOrderBy;
        const conditionParams = {};
        if (props?.where) {
            conditionParams.where = props.where;
        }
        return this.prisma[this.model].findMany({
            skip,
            take: pageSize,
            ...conditionParams,
            orderBy: orderByBuild,
            include: includesConfig_1.includesConfig[this.model] || {},
        });
    }
    async findById(id) {
        return this.prisma[this.model].findUnique({ where: { id } });
    }
    async updateById(id, data) {
        return this.prisma[this.model].update({
            where: { id },
            data,
        });
    }
    async hardDeleteById(id) {
        return this.prisma[this.model].delete({ where: { id } });
    }
    async softDeleteById(id) {
        return this.prisma[this.model].update({
            where: { id },
            data: {
                isDeleted: true,
                deletedAt: new Date().toISOString(),
            }
        });
    }
    async count(props) {
        const conditionParams = {};
        if (props?.where) {
            conditionParams.where = props?.where;
        }
        return this.prisma[this.model].count(conditionParams);
    }
}
exports.GenericRepository = GenericRepository;
//# sourceMappingURL=generic.repository.js.map