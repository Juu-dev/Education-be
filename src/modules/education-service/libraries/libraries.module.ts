import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { LibrariesController } from './libraries.controller';
import { LibrariesRepository } from './libraries.repository';
import { LibrariesService } from './libraries.service';


@Module({
  controllers: [LibrariesController],
  providers: [LibrariesService, LibrariesRepository],
  imports: [PrismaModule],
})
export class LibrariesModule {
}
