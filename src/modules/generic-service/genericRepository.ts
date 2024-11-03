import {PrismaClient} from '@prisma/client';

export class GenericRepository<T> {
    constructor(private prisma: PrismaClient, private model: string) {
    }

    async create(data: T): Promise<T> {
        return this.prisma[this.model].create({data});
    }

    async findAll(): Promise<T[]> {
        return this.prisma[this.model].findMany();
    }

    async findAllPagination(page: number = 1, limit: number = 10): Promise<T[]> {
        const skip = (page - 1) * limit;
        return this.prisma[this.model].findMany({
            skip,
            take: limit,
        });
    }

    async findById(id: string): Promise<T | null> {
        return this.prisma[this.model].findUnique({where: {id}});
    }

    async updateById(id: string, data: T): Promise<T> {
        return this.prisma[this.model].update({
            where: {id},
            data,
        });
    }

    async deleteById(id: string): Promise<T> {
        return this.prisma[this.model].delete({where: {id}});
    }

    async count(): Promise<number> {
        return this.prisma[this.model].count();
    }
}
