import { Injectable } from '@nestjs/common';
import { Book } from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/generic.repository';

@Injectable()
export class BooksRepository extends GenericRepository<Book> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'book');
  }
}
