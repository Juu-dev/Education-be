import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { AnswersService } from './answers.service';
import {UsersRepository} from "@n-modules/auth-service/users/users.repository";
import {AnswersController} from "@n-modules/education-service/answers/answers.controller";
import {AnswersRepository} from "@n-modules/education-service/answers/answers.repository";

@Module({
  controllers: [AnswersController],
  providers: [AnswersService, AnswersRepository, UsersRepository],
  imports: [PrismaModule],
})
export class AnswersModule {
}
