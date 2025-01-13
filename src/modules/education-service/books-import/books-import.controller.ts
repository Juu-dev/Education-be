import { Permission } from '@n-constants';
import { AuthClaims, Roles } from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';
import {
  Body, Controller, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import { CreateBookImportDto, UpdateBookImportDto } from '@n-modules/education-service/books-import/dto';
import {BooksImportService} from "@n-modules/education-service/books-import/books-import.service";

@Controller('books-imports')
@ApiTags('Book Import')
export class BooksImportController {
  constructor(
      private readonly booksImportService: BooksImportService,
  ) {}

  @Post()
  @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  async create(
    @Body() createBookDto: CreateBookImportDto,
  ) {
    return this.booksImportService.createBook(createBookDto);
  }

  @Post("bulk")
  @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  async bulk(
      @Body() bulkBookDto: CreateBookImportDto[],
  ) {
    return this.booksImportService.bulkBook(bulkBookDto);
  }

  @Get('pagination')
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  findAll(
  @Query() {
    page,
    pageSize,
  }: PaginationParamsDto,
  ) {
    return this.booksImportService.getListBook(
      page,
      pageSize,
    );
  }

  @Get(':id')
  @Roles([Permission.GET_CATEGORY])
  @AuthClaims()
  findOne(@Param('id') id: string) {
    return this.booksImportService.getBookById(id);
  }

  @Patch(':id')
  @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateBookImportDto) {
    return this.booksImportService.updateBook(
      id,
      updateCategoryDto,
    );
  }
}
