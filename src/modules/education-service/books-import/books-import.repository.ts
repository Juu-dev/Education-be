import { Injectable } from '@nestjs/common';
import {BookImport} from '@prisma/client';

import { PrismaService } from '@n-database/prisma/prisma.service';
import { GenericRepository } from '@n-modules/generic-service/generic.repository';

@Injectable()
export class BooksImportRepository extends GenericRepository<BookImport> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'bookImport');
  }

  deleteAllBooks(): Promise<any> {
    return this.prismaService.bookImport.updateMany({
      where: {
        isDeleted: false
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      }
    })
  }

  async getOverviewBook(): Promise<any> {
    const result = await this.prismaService.bookImport.aggregate({
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
        borrowedAmount: true,
      },
      where: {
        isDeleted: false,
      },
    });

    return {
      totalBookTitles: result._count.id,
      totalBooks: result._sum.amount || 0,
      totalBorrowedBooks: result._sum.borrowedAmount || 0,
    };
  }
}
