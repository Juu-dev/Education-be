import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentsRepository } from './documents.repository';
import {FileUploadService} from "@n-modules/file-upload/file-upload.service";

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository, FileUploadService],
  imports: [PrismaModule],
})
export class DocumentsModule {
}
