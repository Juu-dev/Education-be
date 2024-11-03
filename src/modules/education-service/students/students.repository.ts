import {Injectable} from '@nestjs/common';
import {Student} from '@prisma/client';

import {PrismaService} from '@n-database/prisma/prisma.service';
import {GenericRepository} from "@n-modules/generic-service/genericRepository";

@Injectable()
export class StudentsRepository extends GenericRepository<Student> {
    constructor(private readonly prismaService: PrismaService) {
        super(prismaService, 'student');
    }
}
