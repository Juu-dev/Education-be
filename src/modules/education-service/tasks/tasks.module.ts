import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { TasksController } from '@n-modules/education-service/tasks/tasks.controller';
import { TasksRepository } from '@n-modules/education-service/tasks/tasks.repository';
import { TasksService } from './tasks.service';
import {UsersRepository} from "@n-modules/auth-service/users/users.repository";

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, UsersRepository],
  imports: [PrismaModule],
})
export class TasksModule {
}
