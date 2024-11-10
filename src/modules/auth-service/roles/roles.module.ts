import { Module } from '@nestjs/common';
import { PrismaModule } from '@n-database/prisma/prisma.module';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
  imports: [PrismaModule],
})
export class RolesModule {
}
