import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  imports: [PrismaModule],
})
export class BooksModule {
}
