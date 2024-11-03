import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { {{Service_s_or_es}}Service } from './{{service_s_or_es}}.service';
import { {{Service_s_or_es}}Controller } from './{{service_s_or_es}}.controller';
import { {{Service_s_or_es}}Repository } from './{{service_s_or_es}}.repository';

@Module({
  controllers: [{{Service_s_or_es}}Controller],
  providers: [{{Service_s_or_es}}Service, {{Service_s_or_es}}Repository],
  imports: [PrismaModule],
  exports: [{{Service_s_or_es}}Service],
})
export class {{Service_s_or_es}}Module {}
