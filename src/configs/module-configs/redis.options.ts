import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  useFactory: (configService: ConfigService) => ({
    isGlobal: true,
    store: redisStore,
    host: configService.get<string>('redis.host'),
    port: configService.get<number>('redis.port'),
  }),
  inject: [ConfigService],
};
