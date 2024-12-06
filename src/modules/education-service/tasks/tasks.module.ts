import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { TasksController } from '@n-modules/education-service/tasks/tasks.controller';
import { TasksRepository } from '@n-modules/education-service/tasks/tasks.repository';
import { StudentsModule } from '@n-modules/education-service/students/students.module';
import { TeachersModule } from '@n-modules/education-service/teachers/teachers.module';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  imports: [PrismaModule, StudentsModule, TeachersModule],
})
export class TasksModule {
}
