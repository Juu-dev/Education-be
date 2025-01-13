import { Injectable } from '@nestjs/common';
import { BookImport } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/generic.repository';

@Injectable()
export class BooksImportRepository extends GenericRepository<BookImport> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'bookImport');
  }
}
