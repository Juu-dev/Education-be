import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { TasksController } from '@n-modules/education-service/tasks/tasks.controller';
import { TasksRepository } from '@n-modules/education-service/tasks/tasks.repository';
import { TasksService } from './tasks.service';
import {TeachersRepository} from "@n-modules/education-service/teachers/teachers.repository";
import {StudentsRepository} from "@n-modules/education-service/students/students.repository";

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, TeachersRepository, StudentsRepository],
  imports: [PrismaModule],
})
export class TasksModule {
}
