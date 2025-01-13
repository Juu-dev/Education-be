import {
  Body,
  Controller, Delete, Get, Param, Patch, Post, Query, Req,
} from '@nestjs/common';
import { Permission } from '@n-constants';
import { ApiTags } from '@nestjs/swagger';
import {AuthClaims, GetUser, Permissions} from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';

import { QuizzesService } from './quizzes.service';
import { CreateQuizDto, UpdateQuizDto } from './dtos';

@Controller('quizzes')
@ApiTags('Quiz')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @Permissions([Permission.CREATE_USER])
  @AuthClaims()
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.createQuiz(createQuizDto);
  }

  @Get('pagination')
  @Permissions([Permission.GET_USERS])
  @AuthClaims()
  findAllByPagination(
    @GetUser() user: any,
    @Query() { page, pageSize }: PaginationParamsDto,
  ) {
    return this.quizzesService.getListPaginatedQuiz(
      page,
      pageSize,
      user?.id
    );
  }

  @Get('')
  @Permissions([Permission.GET_USERS])
  @AuthClaims()
  findAll() {
    return this.quizzesService.getListQuiz();
  }

  @Get(':id')
  @Permissions([Permission.GET_USER])
  @AuthClaims()
  findOne(@Param('id') id: string) {
    return this.quizzesService.getQuizById(id);
  }

  @Patch(':id')
  @Permissions([Permission.UPDATE_USER])
  @AuthClaims()
  update( @Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.updateQuiz(id, updateQuizDto);
  }

  @Delete(':id')
  @Permissions([Permission.DELETE_USER])
  @AuthClaims()
  remove(@Param('id') id: string) {
    return this.quizzesService.deleteQuizById(id);
  }
}
