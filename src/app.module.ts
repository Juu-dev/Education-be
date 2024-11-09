import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { LoggerModule } from 'nestjs-pino';

import appConfig from '@n-configs/env/app.config';
import databaseConfig from '@n-configs/env/database.config';
import emailConfig from '@n-configs/env/email.config';
import validate from '@n-configs/env/env.validation';
import redisConfig from '@n-configs/env/redis.config';
import {
  JwtOptions,
  LoggerOptions,
  RedisOptions,
} from '@n-configs/module-configs';

import { PrismaModule } from '@n-database/prisma/prisma.module';
import { HttpExceptionFilter } from '@n-exceptions';
import { ResponseInterceptor } from '@n-interceptors';
import { ScheduledJobService } from '@n-jobs/sync-categories.auth-service';
import { AuthServiceModule } from '@n-modules/auth-service/auth-service.module';
import {EducationServiceModule} from '@n-modules/education-service/education-service.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './modules/file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig, emailConfig, redisConfig],
      validate,
    }),
    CacheModule.registerAsync(RedisOptions),
    JwtModule.registerAsync(JwtOptions),
    LoggerModule.forRoot(LoggerOptions),
    PrismaModule,
    AuthServiceModule,
    EducationServiceModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ScheduledJobService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
