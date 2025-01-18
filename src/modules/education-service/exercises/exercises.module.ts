import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { ExercisesRepository } from './exercises.repository';
import {ClassesModule} from "@n-modules/education-service/classes/classes.module";
import {ClassesRepository} from "@n-modules/education-service/classes/classes.repository";
import {QuizzesRepository} from "@n-modules/education-service/quizzes/quizzes.repository";
import {QuizzesModule} from "@n-modules/education-service/quizzes/quizzes.module";
import {UsersModule} from "@n-modules/auth-service/users/users.module";
import {UsersRepository} from "@n-modules/auth-service/users/users.repository";

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService, ExercisesRepository, ClassesRepository, QuizzesRepository, UsersRepository],
  imports: [PrismaModule, ClassesModule, QuizzesModule, UsersModule],
  exports: [ExercisesService],
})
export class ExercisesModule {}
