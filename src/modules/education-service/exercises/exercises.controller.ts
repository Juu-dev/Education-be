import {
  Body,
  Controller, Delete, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import { Permission } from '@n-constants';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {AuthClaims, GetUser, Permissions} from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';

import { ExercisesService } from './exercises.service';
import { CreateExerciseDto, UpdateExerciseDto } from './dtos';

@Controller('exercises')
@ApiTags('Exercise')
export class ExercisesController {
  constructor(private readonly exerciseService: ExercisesService) {}

  @Post()
  @Permissions([Permission.CREATE_USER])
  @AuthClaims()
  @ApiCreatedResponse()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.createExercise(createExerciseDto);
  }

  @Get('pagination')
  @Permissions([Permission.GET_USERS])
  @AuthClaims()
  findAllByPagination(
    @GetUser() user: any,
    @Query() { page, pageSize }: PaginationParamsDto,
  ) {
    return this.exerciseService.getListPaginatedExercise(
      page,
      pageSize,
      user?.id
    );
  }

  @Get('pagination/class')
  @Permissions([Permission.GET_USERS])
  @AuthClaims()
  findAllByPaginationModeStudent(
    @GetUser() user: any,
    @Query() { page, pageSize }: PaginationParamsDto,
  ) {
    return this.exerciseService.getListPaginatedExerciseModeStudent(
      page,
      pageSize,
      user?.classId
    );
  }

  @Get('pagination/:classId')
  @Permissions([Permission.GET_USERS])
  @AuthClaims()
  findAllByPaginationAndTeacherId(
      @Query() { page, pageSize }: PaginationParamsDto,
      @Param('classId') classId: string
  ) {
    return this.exerciseService.getListPaginatedExerciseModeStudent(
        page,
        pageSize,
        classId
    );
  }

  @Get('')
  @Permissions([Permission.GET_USERS])
  @AuthClaims()
  findAll() {
    return this.exerciseService.getListExercise();
  }

  @Get(':id')
  @Permissions([Permission.GET_USER])
  @AuthClaims()
  findOne(@Param('id') id: string) {
    return this.exerciseService.getExerciseById(id);
  }

  @Get('student/:id')
  @Permissions([Permission.GET_USER])
  @AuthClaims()
  findStudentsByExerciseId(@Param('id') id: string) {
    return this.exerciseService.getStudentsByExerciseId(id);
  }

  @Patch(':id')
  @Permissions([Permission.UPDATE_USER])
  @AuthClaims()
  update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exerciseService.updateExercise(
      id,
      updateExerciseDto,
    );
  }

  @Delete(':id')
  @Permissions([Permission.DELETE_USER])
  @AuthClaims()
  remove(@Param('id') id: string) {
    return this.exerciseService.deleteExerciseById(id);
  }
}
