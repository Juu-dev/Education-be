import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }

  getHello(): string {
    const port = this.configService.get<number>('appConfig.port');
    const dbHost = this.configService.get<string>('databaseConfig.host');

    return `Hello! App is running on port ${port}. Database is hosted on ${dbHost}.`;
  }
}
