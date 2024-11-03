import {Permission} from '@n-constants';
import {AuthClaims, Roles} from '@n-decorators';
import {PaginationParamsDto} from '@n-dtos';
import {Body, Controller, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';

import {CategoryEntity} from './entities/category.entity';
import {CreateStudentDto, UpdateStudentDto} from "@n-modules/education-service/students/dto";
import {StudentsService} from "@n-modules/education-service/students/students.service";

@Controller('students')
@ApiTags('Student')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {
    }

    @Post()
    @Roles([Permission.CREATE_CATEGORY])
    @AuthClaims()
    @ApiCreatedResponse({type: CategoryEntity})
    create(
        @Body() createCategoryDto: CreateStudentDto,
    ) {
        return this.studentsService.createStudent(createCategoryDto);
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
        return this.studentsService.getListStudent(
            page,
            pageSize,
        );
    }

    @Get(':id')
    @Roles([Permission.GET_CATEGORY])
    @AuthClaims()
    @ApiOkResponse({type: CategoryEntity})
    findOne(@Param('id') id: string) {
        return this.studentsService.getStudentById(id);
    }

    @Patch(':id')
    @Roles([Permission.UPDATE_CATEGORY])
    @AuthClaims()
    @ApiOkResponse({type: CategoryEntity})
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateStudentDto) {
        return this.studentsService.updateStudent(
            id,
            updateCategoryDto,
        );
    }
}
