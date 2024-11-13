import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@prisma/client';
import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/generic.repository';

@Injectable()
export class RefreshTokensRepository extends GenericRepository<RefreshToken> {
    constructor(private readonly prismaService: PrismaService) {
        super(prismaService, 'refreshToken');
    }

    async findByValue(value: string): Promise<RefreshToken | null> {
        return this.prismaService.refreshToken.findFirst({ where: { value } });
    }
}
