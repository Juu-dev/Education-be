import { Permission } from '@n-constants';
import { AuthClaims, Roles } from '@n-decorators';
import { PaginationParamsDto } from '@n-dtos';
import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFiles
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {CreateDocumentDto, FilterDocumentDto, SearchDocumentDto, UpdateDocumentDto} from '@n-modules/education-service/documents/dto';
import { DocumentsService } from '@n-modules/education-service/documents/documents.service';
import { CategoryEntity } from './entities/category.entity';
import {ApiFile} from "@n-decorators/api-file.decorator";
import {IFile} from "../../../interfaces";

@Controller('documents')
@ApiTags('Document')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService
  ) {}

  @Post()
  @ApiFile({ name: 'files', isArray: true })
  @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  @ApiOkResponse({ description: 'Upload document thành công.' })
  create(
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFiles() files: IFile[],
  ) {
    return this.documentsService.createDocument(createDocumentDto, files);
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
  @Query() filter: FilterDocumentDto,
  @Query() {search}: SearchDocumentDto,
  ) {
    return this.documentsService.getListDocument(
        {
          page,
          pageSize,
          filter,
          search
        },
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
  @Query() filter: FilterDocumentDto,
  @Query() {search}: SearchDocumentDto,
  @Param('teacherId') teacherId: string,
  ) {
    return this.documentsService.getListDocument(
        {
          page,
          pageSize,
          teacherId,
          filter,
          search
        }
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
