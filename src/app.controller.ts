import { Get, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Default')
export class AppController {
  @Get()
  root(): string {
    return 'Hello, Welcome to Education BE !!!!';
  }
}
