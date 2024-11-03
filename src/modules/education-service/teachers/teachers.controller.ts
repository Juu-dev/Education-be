import {Permission} from '@n-constants';
import {AuthClaims, Roles} from '@n-decorators';
import {PaginationParamsDto} from '@n-dtos';
import {Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {CategoryEntity} from './entities/category.entity';
import {CreateTeacherDto, UpdateTeacherDto} from "@n-modules/education-service/teachers/dto";
import {TeachersService} from "@n-modules/education-service/teachers/teachers.service";

@Controller('teachers')
@ApiTags('Teacher')
export class TeachersController {
    constructor(private readonly teachersService: TeachersService) {
    }

    @Post()
    @Roles([Permission.CREATE_CATEGORY])
    @AuthClaims()
    @ApiCreatedResponse({type: CategoryEntity})
    create(
        @Body() createCategoryDto: CreateTeacherDto,
    ) {
        return this.teachersService.createTeacher(createCategoryDto);
    }

    @Get('pagination')
    @Roles([Permission.GET_CATEGORIES])
    @AuthClaims()
    @ApiOkResponse({
        type: CategoryEntity,
        isArray: true
    })
    findAll(
        @Query() {
            page,
            pageSize
        }: PaginationParamsDto,
    ) {
        return this.teachersService.getListTeacher(
            page,
            pageSize,
        );
    }

    @Get(':id')
    @Roles([Permission.GET_CATEGORY])
    @AuthClaims()
    @ApiOkResponse({type: CategoryEntity})
    findOne(@Param('id') id: string) {
        return this.teachersService.getTeacherById(id);
    }

    @Patch(':id')
    @Roles([Permission.UPDATE_CATEGORY])
    @AuthClaims()
    @ApiOkResponse({type: CategoryEntity})
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateTeacherDto) {
        return this.teachersService.updateTeacher(
            id,
            updateCategoryDto,
        );
    }
}
