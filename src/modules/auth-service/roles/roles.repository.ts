import {Injectable} from '@nestjs/common';
import {PrismaService} from '@n-database/prisma/prisma.service';
import {Role} from '@prisma/client';
import {GenericRepository} from "@n-modules/generic-service/genericRepository";

@Injectable()
export class RolesRepository extends GenericRepository<Role> {
    constructor(private readonly prismaService: PrismaService) {
        super(prismaService, 'role');
    }
}