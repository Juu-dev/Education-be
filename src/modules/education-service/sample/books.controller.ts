import { Permission } from '@n-constants';
import { AuthClaims, Roles } from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';
import {
  Body, Controller, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateBookDto, UpdateBookDto } from '@n-modules/education-service/books/dto';
import { BooksService } from '@n-modules/education-service/books/books.service';
import { CategoryEntity } from './entities/category.entity';

@Controller('books')
@ApiTags('Book')
export class BooksController {
  constructor(private readonly booksService: BooksService) {
  }

  @Post()
  @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  @ApiCreatedResponse({ type: CategoryEntity })
  create(
  @Body() createCategoryDto: CreateBookDto,
  ) {
    return this.booksService.createBook(createCategoryDto);
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
    return this.booksService.getListBook(
      page,
      pageSize,
    );
  }

  @Get(':id')
  @Roles([Permission.GET_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  findOne(@Param('id') id: string) {
    return this.booksService.getBookById(id);
  }

  @Patch(':id')
  @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateBookDto) {
    return this.booksService.updateBook(
      id,
      updateCategoryDto,
    );
  }
}
