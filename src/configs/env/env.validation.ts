import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsNumber()
    PORT: number;

  @IsEnum(Environment)
    APP_ENV: Environment;

  @IsString()
  @IsOptional()
    CLIENT_URL: string;

  @IsString()
    DB_CONNECTION: string;

  @IsString()
    DB_HOST: string;

  @IsNumber()
    DB_PORT: number;

  @IsString()
    DB_DATABASE: string;

  @IsString()
    DB_USERNAME: string;

  @IsString()
    DB_PASSWORD: string;

  @IsString()
    REDIS_HOST: string;

  @IsNumber()
    REDIS_PORT: number;

  @IsNumber()
  @IsOptional()
    EMAIL_PORT: number;

  @IsString()
  @IsOptional()
    EMAIL_USERNAME: string;

  @IsString()
  @IsOptional()
    EMAIL_PASSWORD: string;

  @IsString()
  @IsOptional()
    EMAIL_FROM_NAME: string;

  @IsString()
  @IsOptional()
    EMAIL_FROM_ADDRESS: string;

  @IsString()
    ACCESS_TOKEN_SECRET: string;

  @IsString()
    ACCESS_TOKEN_EXPIRATION_TIME: string;

  @IsString()
    REFRESH_TOKEN_SECRET: string;

  @IsString()
    REFRESH_TOKEN_EXPIRATION_TIME: string;

  @IsBoolean()
    ENABLE_SWAGGER: boolean;

  @IsBoolean()
    ENABLE_CORS: boolean;

  @IsString()
    DATABASE_URL: string;
}

function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    // throw new Error(errors.toString());
    // console.log(errors.toString());
  }

  return validatedConfig;
}

export default validate;
