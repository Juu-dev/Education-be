import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthClaims, Permissions } from '@n-decorators';
import { Permission } from '@n-constants';
import { PaginationParamsDto } from '@n-dtos';
import { Request } from 'express';

import {
  Body, Controller, Get, Param, Patch, Post, Query, Req,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  CreateUserDto, FilterUserDto, SearchUserDto, UpdateUserDto,
} from './dto';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  @Permissions([Permission.CREATE_USER])
  @AuthClaims()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto, @Req() request) {
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
    const user: any = request?.user;

    return this.usersService.getListUser(
      page,
      pageSize,
      filter,
      search,
      user?.platformId,
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
  @Req() request: Request,
    @Query() filter?: FilterUserDto,
    @Query() search?: SearchUserDto,
  ) {
    const user: any = request?.user;
    return this.usersService.getListUserNotPagination(
      filter,
      search,
      user?.platformId,
    );
  }

  @Get(':id')
  @Permissions([Permission.GET_USER])
  @AuthClaims()
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @Permissions([Permission.UPDATE_USER])
  @AuthClaims()
  @ApiOkResponse({ type: UserEntity })
  update(
  @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ) {
    return this.usersService.updateUserById(
      id,
      updateUserDto,
    );
  }
}
