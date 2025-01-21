import {AuthClaims, GetUser} from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';
import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AnswersService } from '@n-modules/education-service/answers/answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
@ApiTags('Answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {
  }

  @Post()
  // @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  create(
  @Body() createAnswerDto: CreateAnswerDto,
  ) {
    console.log("createAnswerDto: ", createAnswerDto)
    return this.answersService.createAnswer(createAnswerDto);
  }

  @Get('pagination')
  // @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  findAll(
  @Query() {
    page,
    pageSize,
  }: PaginationParamsDto,
  ) {
    return this.answersService.getListAnswer(
      page,
      pageSize,
    );
  }

  @Get(':id')
  // @Roles([Permission.GET_CATEGORY])
  @AuthClaims()
  findOne(@Param('id') id: string) {
    return this.answersService.getAnswerById(id);
  }

  @Patch(':id')
  // @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.updateAnswer(id, updateAnswerDto);
  }

  @Delete(':id')
  // @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  remove(@Param('id') id: string) {
    return this.answersService.deleteAnswer(id);
  }
}
