import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const JwtOptions: JwtModuleAsyncOptions = {
  global: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('app.accessTokenSecret'),
    signOptions: {
      expiresIn: `${configService.get('app.accessTokenExpTime')}`,
    },
  }),
};
