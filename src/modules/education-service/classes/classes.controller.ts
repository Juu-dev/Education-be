import { Permission } from '@n-constants';
import { AuthClaims, Roles } from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';
import {
  Body, Controller, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateClassDto, UpdateClassDto } from '@n-modules/education-service/classes/dto';
import { ClassesService } from '@n-modules/education-service/classes/classes.service';
import { CategoryEntity } from './entities/category.entity';

@Controller('classes')
@ApiTags('Class')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {
  }

  @Post()
  @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  @ApiCreatedResponse({ type: CategoryEntity })
  create(
  @Body() createCategoryDto: CreateClassDto,
  ) {
    return this.classesService.createClass(createCategoryDto);
  }

  @Get('pagination')
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  findAll(
  @Query() {
    page,
    pageSize,
  }: PaginationParamsDto,
  ) {
    return this.classesService.getListClass(
      page,
      pageSize,
    );
  }

  @Get(':id')
  @Roles([Permission.GET_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  findOne(@Param('id') id: string) {
    return this.classesService.getClassById(id);
  }

  @Patch(':id')
  @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateClassDto) {
    return this.classesService.updateClass(
      id,
      updateCategoryDto,
    );
  }
}
