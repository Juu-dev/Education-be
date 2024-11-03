import {Module} from '@nestjs/common';
import {CacheModule} from '@nestjs/cache-manager';
import {PassportModule} from '@nestjs/passport';

import {RedisOptions} from '@n-configs/module-configs';

import {PrismaModule} from '@n-database/prisma/prisma.module';

import {UsersRepository} from '../users/users.repository';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {RolesModule} from '../roles/roles.module';
import {RolesRepository} from '../roles/roles.repository';
import {UsersModule} from '../users/users.module';

@Module({
    imports: [
        PrismaModule,
        UsersModule,
        RolesModule,
        PassportModule,
        CacheModule.registerAsync(RedisOptions),
    ],
    providers: [
        AuthService,
        UsersRepository,
        RolesRepository,
    ],
    controllers: [AuthController],
})
export class AuthModule {
}
