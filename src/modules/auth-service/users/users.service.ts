import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import {Errors} from '@n-constants';
import {BaseException} from '@n-exceptions';
import {CreateUserDto, UpdateUserDto,} from './dto';
import {UsersRepository} from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {
    }

    async createUser(createUserDto: CreateUserDto) {
        const {
            password,
            ...rest
        } = createUserDto;

        const newUserData: any = {
            ...rest,
        };

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        newUserData.password = hashedPassword;

        return await this.usersRepository.create(newUserData);

    }

    async getListUser(
        page?: number,
        pageSize?: number,
    ) {
        const count = await this.usersRepository.count
        (
        );

        const items = await this.usersRepository.findAllPagination(
            page,
            pageSize,
        );

        return {
            page,
            pageSize: pageSize,
            totalPage: Math.ceil(count / pageSize),
            count,
            items,
        };
    }

    async getListUserNotPagination() {
        const items = await this.usersRepository.findAll(
        );

        return {
            count: items.length,
            items,
        };
    }

    async getUserById(id: string) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new BaseException(Errors.USER.USER_NOT_FOUND);
        }

        return user;
    }

    async updateUserById(id: string, updateUserDto: UpdateUserDto) {
        const {
            password,
            ...rest
        } = updateUserDto;

        const updateUserData: any = {
            ...rest,
        };

        // Get user by id
        const getUserById = await this.usersRepository.findById(id);
        if (!getUserById) {
            throw new BaseException(Errors.USER.USER_NOT_FOUND);
        }

        // Hash password
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateUserData.password = hashedPassword;
        }

        return await this.usersRepository.updateById(id, updateUserData);
    }

}
