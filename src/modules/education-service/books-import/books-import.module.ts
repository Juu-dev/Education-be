import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { BooksImportService } from './books-import.service';
import { BooksImportController } from './books-import.controller';
import { BooksImportRepository } from './books-import.repository';

@Module({
  controllers: [BooksImportController],
  providers: [BooksImportService, BooksImportRepository],
  imports: [PrismaModule],
})
export class BooksImportModule {
}
