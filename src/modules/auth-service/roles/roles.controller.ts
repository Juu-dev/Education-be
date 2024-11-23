import { Permission } from '@n-constants';
import { AuthClaims, Permissions } from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';
import {
  Body, Controller, Get, Param, Patch, Post, Query, Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('Role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {
  }

  @Post()
  @Permissions([Permission.CREATE_ROLE])
  @AuthClaims()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  @Permissions([Permission.GET_ROLES])
  @AuthClaims()
  findAll(
  @Query() {
    page,
    pageSize,
  }: PaginationParamsDto,
  ) {
    return this.rolesService.getRoles(page, pageSize);
  }

  @Get(':id')
  @Permissions([Permission.GET_ROLE])
  @AuthClaims()
  findOne(@Param('id') id: string) {
    return this.rolesService.getRoleById(id);
  }

  @Patch(':id')
  @Permissions([Permission.UPDATE_ROLE])
  @AuthClaims()
  update(
  @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.updateRole(id, updateRoleDto);
  }
}
