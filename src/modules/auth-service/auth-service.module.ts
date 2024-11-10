import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, RolesModule, UsersModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class AuthServiceModule {
}
