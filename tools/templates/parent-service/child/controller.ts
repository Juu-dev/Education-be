import {
  Body,
  Controller, Delete, Get, Param, Patch, Post, Query, Req,
} from '@nestjs/common';
import { Permission } from '@n-constants';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthClaims, Permissions } from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';

import { {{Service_s_or_es}}Service } from './{{service_s_or_es}}.service';
import { Create{{Service_not_s}}Dto, Update{{Service_not_s}}Dto } from './dtos';
import { {{Service_not_s}}Entity } from './entities/{{service_not_s}}.entity';

@Controller('{{service_s_or_es}}')
@ApiTags('{{Service_not_s}}')
export class {{Service_s_or_es}}Controller {
  constructor(private readonly {{service_s_or_es}}Service: {{Service_s_or_es}}Service) {}

  @Post()
  @Permissions([Permission.CREATE_USER])
  @AuthClaims()
  @ApiCreatedResponse({ type: {{Service_not_s}}Entity })
  create(@Body() create{{Service_not_s}}Dto: Create{{Service_not_s}}Dto, @Req() request) {
    return this.{{service_s_or_es}}Service.create{{Service_not_s}}(create{{Service_not_s}}Dto, request.user.platformId);
  }

  @Get('pagination')
  @Permissions([Permission.GET_USERS])
  @AuthClaims()
  @ApiOkResponse({ type: {{Service_not_s}}Entity, isArray: true })
  findAllByPagination(
  @Req() request,
    @Query() { page, pageSize }: PaginationParamsDto,
  ) {
    return this.{{service_s_or_es}}Service.getListPaginated{{Service_not_s}}(
      request?.user?.platformId,
      page,
      pageSize,
    );
  }

  @Get('')
  @Permissions([Permission.GET_USERS])
  @AuthClaims()
  @ApiOkResponse({ type: {{Service_not_s}}Entity, isArray: true })
  findAll(@Req() request) {
    return this.{{service_s_or_es}}Service.getList{{Service_not_s}}(
      request?.user?.platformId,
    );
  }

  @Get(':id')
  @Permissions([Permission.GET_USER])
  @AuthClaims()
  @ApiOkResponse({ type: {{Service_not_s}}Entity })
  findOne(@Req() request, @Param('id') id: string) {
    const user: any = request?.user;
    return this.{{service_s_or_es}}Service.get{{Service_not_s}}ById(user?.platformId, id);
  }

  @Patch(':id')
  @Permissions([Permission.UPDATE_USER])
  @AuthClaims()
  @ApiOkResponse({ type: {{Service_not_s}}Entity })
  update(@Req() request, @Param('id') id: string, @Body() update{{Service_not_s}}Dto: Update{{Service_not_s}}Dto) {
    return this.{{service_s_or_es}}Service.update{{Service_not_s}}(
      request?.user?.platformId,
      id,
      update{{Service_not_s}}Dto,
    );
  }

  @Delete(':id')
  @Permissions([Permission.DELETE_USER])
  @AuthClaims()
  @ApiOkResponse({ type: {{Service_not_s}}Entity })
  remove(@Req() request, @Param('id') id: string) {
    return this.{{service_s_or_es}}Service.delete{{Service_not_s}}ById(request?.user?.platformId, id);
  }
}
