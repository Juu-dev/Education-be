import {Module} from '@nestjs/common';
import {PrismaModule} from '@n-database/prisma/prisma.module';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {UsersRepository} from './users.repository';
import {RolesRepository} from '../roles/roles.repository';

@Module({
    controllers: [UsersController],
    providers: [
        UsersRepository,
        RolesRepository,
        UsersService,
    ],
    imports: [PrismaModule],
    exports: [UsersService],
})
export class UsersModule {
}
