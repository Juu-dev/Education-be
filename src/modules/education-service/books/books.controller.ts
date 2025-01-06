import { IsArray } from 'class-validator';
import { Permission } from '@n-constants';
import { AuthClaims, Roles } from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';
import {
  Body, Controller, Get, Param, Patch, Post, Query, UploadedFiles,
} from '@nestjs/common';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

import { CreateBookDto, UpdateBookDto } from '@n-modules/education-service/books/dto';
import { BooksService } from '@n-modules/education-service/books/books.service';
import { CategoryEntity } from './entities/category.entity';
import {ApiFile} from "@n-decorators/api-file.decorator";
import {IFile} from "../../../interfaces";

@Controller('books')
@ApiTags('Book')
export class BooksController {
  constructor(
      private readonly booksService: BooksService,
  ) {}

  @Post()
  @ApiFile({ name: 'files', isArray: true })
  @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ description: 'Upload sách thành công.' })
  async create(
    @Body() createCategoryDto: CreateBookDto,
    @UploadedFiles() files: IFile[],
  ) {
    return this.booksService.createBook(createCategoryDto, files);
  }

  @Post('excel')
  @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ description: 'Upload sách từ excel thành công.' })
  async createFromExcel(
    @Body() createCategoryDto: CreateBookDto[],
  ) {
    return this.booksService.createBookFromExcel(createCategoryDto);
  }

  @Get('all')
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  findAllBook() {
    return this.booksService.getAllBooks();
  }

  @Get('type')
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  groupBooksByType(){
    return this.booksService.getBooksGroupedByType();
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
