import { Permission } from '@n-constants';
import { AuthClaims, Roles } from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';
import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CreateDocumentDto, UpdateDocumentDto } from '@n-modules/education-service/documents/dto';
import { DocumentsService } from '@n-modules/education-service/documents/documents.service';
import { CategoryEntity } from './entities/category.entity';

@Controller('documents')
@ApiTags('Document')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {
  }

  @Post()
  @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  @ApiCreatedResponse({ type: CategoryEntity })
  create(
  @Body() createCategoryDto: CreateDocumentDto,
  ) {
    return this.documentsService.createDocument(createCategoryDto);
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
    return this.documentsService.getListDocument(
      page,
      pageSize,
    );
  }

  @Get('pagination/:teacherId')
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  findAllByTeacherId(
  @Query() {
    page,
    pageSize,
  }: PaginationParamsDto,
  @Param('teacherId') teacherId: string,
  ) {
    return this.documentsService.getListDocument(
      page,
      pageSize,
      teacherId,
    );
  }

  @Get(':id')
  @Roles([Permission.GET_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  findOne(@Param('id') id: string) {
    return this.documentsService.getDocumentById(id);
  }

  @Patch(':id')
  @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateDocumentDto) {
    return this.documentsService.updateDocument(
      id,
      updateCategoryDto,
    );
  }

  @Delete(':id')
  @Roles([Permission.UPDATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ type: CategoryEntity })
  remove(@Param('id') id: string) {
    return this.documentsService.deleteById(id);
  }
}
