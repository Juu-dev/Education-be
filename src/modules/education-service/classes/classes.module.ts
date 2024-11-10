import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import { ClassesRepository } from './classes.repository';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, ClassesRepository],
  imports: [PrismaModule],
})
export class ClassesModule {
}
