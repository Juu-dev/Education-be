import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
import { PassportModule } from '@nestjs/passport';

// import { RedisOptions } from '@n-configs/module-configs';

import { PrismaModule } from '@n-database/prisma/prisma.module';

import { UsersRepository } from '../users/users.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolesModule } from '../roles/roles.module';
import { RolesRepository } from '../roles/roles.repository';
import { UsersModule } from '../users/users.module';
import { StudentsRepository } from '../../education-service/students/students.repository';
import { StudentsModule } from '../../education-service/students/students.module';
import { ClassesRepository } from '@n-modules/education-service/classes/classes.repository';
import { ClassesModule } from './../../education-service/classes/classes.module';
import { RefreshTokensRepository } from './refresh-tokens.repository';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    StudentsModule,
    RolesModule,
    PassportModule,
    ClassesModule,
    // CacheModule.registerAsync(RedisOptions),
  ],
  providers: [
    AuthService,
    UsersRepository,
    StudentsRepository,
    RolesRepository,
    ClassesRepository,
    RefreshTokensRepository,
  ],
  controllers: [AuthController],
})
export class AuthModule {
}
