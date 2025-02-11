import {
  INestApplication, Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { red } from 'colorette';
import cookieParser from 'cookie-parser';
import 'module-alias/register';

import { Errors } from '@n-constants';
import { BaseException } from '@n-exceptions';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://miraischool.org'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        console.log("exceptionFactory: ", errors)
        const { constraints } = errors[0];
        let validationErrFormat = Errors.VALIDATION_ERROR;
        validationErrFormat = {
          ...validationErrFormat,
          message: `${constraints[Object.keys(constraints)[0]]}. <Ref: CO06>`,
        };
        return new BaseException(validationErrFormat);
      },
    }),
  );

  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);
  setupOpenApi(app);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${red(
      `http://localhost:${port}/${globalPrefix}`,
    )}`,
  );
  Logger.log(
    `🚀 Application Swagger is running on: ${red(
      `http://localhost:${port}/swagger`,
    )}`,
  );
}

function setupOpenApi(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('EDUCATION API')
    .setDescription('NestJS application for Education Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
