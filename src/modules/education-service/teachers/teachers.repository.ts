import {Injectable} from '@nestjs/common';
import {Teacher} from '@prisma/client';

import {PrismaService} from '@n-database/prisma/prisma.service';
import {GenericRepository} from "@n-modules/generic-service/genericRepository";

@Injectable()
export class TeachersRepository extends GenericRepository<Teacher> {
    constructor(private readonly prismaService: PrismaService) {
        super(prismaService, 'teacher');
    }
}
