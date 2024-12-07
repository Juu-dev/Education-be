import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { FileUploadService } from '@n-modules/file-upload/file-upload.service';
import { LibrariesController } from './libraries.controller';
import { LibrariesRepository } from './libraries.repository';
import { LibrariesService } from './libraries.service';


@Module({
  controllers: [LibrariesController],
  providers: [LibrariesService, LibrariesRepository, FileUploadService],
  imports: [PrismaModule],
})
export class LibrariesModule {
}
