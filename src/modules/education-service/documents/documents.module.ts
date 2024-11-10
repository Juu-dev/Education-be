import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { DocumentsRepository } from './documents.repository';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, DocumentsRepository],
  imports: [PrismaModule],
})
export class DocumentsModule {
}
