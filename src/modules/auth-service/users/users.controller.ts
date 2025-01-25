import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {AuthClaims, GetUser, Permissions, Roles} from '@n-decorators';
import { Permission } from '@n-constants';
import { PaginationParamsDto } from '@n-dtos';
import { Request } from 'express';

import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, Req,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  CreateUserDto, FilterUserDto, SearchUserDto, UpdateUserDto,
} from './dto';
import {CategoryEntity} from "@n-modules/education-service/students/entities/category.entity";
import {CreateStudentDto} from "@n-modules/auth-service/users/dto/create-student.dto";

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  @Permissions([Permission.CREATE_USER])
  @AuthClaims()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @Permissions([Permission.GET_USERS])
  @AuthClaims()
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
  })
  findAll(
  @Req() request: Request,
    @Query() {
      page,
      pageSize,
    }: PaginationParamsDto,
    @Query() filter?: FilterUserDto,
    @Query() search?: SearchUserDto,
  ) {
    return this.usersService.getListUser(
      page,
      pageSize,
      // filter,
      // search,
    );
  }

  @Get('export')
  @Permissions([Permission.EXPORT_USERS])
  @AuthClaims()
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
  })
  findAllNotPagination(
    @Query() filter?: FilterUserDto,
    @Query() search?: SearchUserDto,
  ) {
    return this.usersService.getListUserNotPagination(
      // filter,
      // search,
    );
  }

  @Get('except-student')
  @Permissions([Permission.EXPORT_USERS])
  @AuthClaims()
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
  })
  findAllUserExceptStudent(
      @GetUser() user: any,
  ) {
    return this.usersService.getListUserExceptStudent(user?.id);
  }

  @Get('librarian-and-teacher')
  @Permissions([Permission.EXPORT_USERS])
  @AuthClaims()
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
  })
  findAllLibrarianAndTeacher() {
    return this.usersService.getListLibrarianAndTeacher();
  }

  @Get(':id')
  @Permissions([Permission.GET_USER])
  @AuthClaims()
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch('profile')
  @Permissions([Permission.UPDATE_USER])
  @AuthClaims()
  @ApiOkResponse({ type: UserEntity })
  updateProfile(
      @GetUser() user: any,
      @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(
        user?.id,
        updateUserDto,
    );
  }

  @Patch(':id')
  @Permissions([Permission.UPDATE_USER])
  @AuthClaims()
  @ApiOkResponse({ type: UserEntity })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(
      id,
      updateUserDto,
    );
  }

  @Patch('student/:id')
  @Permissions([Permission.UPDATE_USER])
  @AuthClaims()
  @ApiOkResponse({ type: UserEntity })
  updateStudent(
      @Param('id') id: string,
      @Body() updateStudentDto: CreateStudentDto,
  ) {
    return this.usersService.updateStudentById(
        id,
        updateStudentDto,
    );
  }

  @Delete(':id')
  @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  delete(@Param('id') id: string) {
    return this.usersService.deleteStudentById(id);
  }
}
