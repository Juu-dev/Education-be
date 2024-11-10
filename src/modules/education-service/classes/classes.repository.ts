import { Injectable } from '@nestjs/common';
import { Class } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/genericRepository';

@Injectable()
export class ClassesRepository extends GenericRepository<Class> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'class');
  }
}
