import { Module } from '@nestjs/common';
import { {{Service_s_or_es}}Module } from './{{service_s_or_es}}/{{service_s_or_es}}.module';

@Module({
  imports: [{{Service_s_or_es}}Module],
  providers: [],
  controllers: [],
  exports: [],
})
export class {{Parent_Service}}Module {}
