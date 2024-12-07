import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import {FileUploadService} from "@n-modules/file-upload/file-upload.service";

@Module({
  controllers: [BooksController],
  providers: [BooksService, BooksRepository, FileUploadService],
  imports: [PrismaModule],
})
export class BooksModule {
}
