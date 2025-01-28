import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { Errors } from '@n-constants';
import { BaseException } from '@n-exceptions';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UsersRepository } from './users.repository';

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

    return this.usersRepository.create(newUserData);
  }

  async getListUser(
    page?: number,
    pageSize?: number,
  ) {
    const count = await this.usersRepository.count();

    const items = await this.usersRepository.findAllPagination(
      page,
      pageSize,
    );

    return {
      page,
      pageSize,
      totalPage: Math.ceil(count / pageSize),
      count,
      items,
    };
  }

  async getListUserNotPagination() {
    const items = await this.usersRepository.findAll();

    return {
      count: items.length,
      items,
    };
  }

  async getListUserExceptStudent(id?: string) {
    const items = await this.usersRepository.findAllExceptStudent(id);

    return {
      count: items.length,
      data: items,
    };
  }

  async getListLibrarianAndTeacher() {
    const items = await this.usersRepository.findAllLibrarianAndTeacher();

    return {
      count: items.length,
      data: items
    }
  }

  async getListTeacher() {
    const items = await this.usersRepository.findListTeacher();

    return {
      count: items.length,
      data: items
    }
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

    return this.usersRepository.updateById(id, updateUserData);
  }

  async updateStudentById(id: string, updateUserDto: UpdateUserDto) {
    const getUserById = await this.usersRepository.findById(id);
    if (!getUserById) {
      throw new BaseException(Errors.USER.USER_NOT_FOUND);
    }

    return this.usersRepository.updateStudentById(id, updateUserDto);
  }

  async deleteStudentById(id: string) {
    const student = await this.usersRepository.findById(id);
    if (!student) {
      throw new BaseException(Errors.USER.USER_NOT_FOUND);
    }

    return this.usersRepository.softDeleteById(id);
  }
}
