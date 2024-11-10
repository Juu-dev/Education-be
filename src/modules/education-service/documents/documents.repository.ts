import { Injectable } from '@nestjs/common';
import { Document } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/genericRepository';

@Injectable()
export class DocumentsRepository extends GenericRepository<Document> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'document');
  }
}
