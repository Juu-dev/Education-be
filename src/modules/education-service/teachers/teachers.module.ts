import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TeachersRepository } from './teachers.repository';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService, TeachersRepository],
  imports: [PrismaModule],
})
export class TeachersModule {
}
