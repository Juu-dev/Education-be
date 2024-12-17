import {
  Controller,
  Post,
  Get,
  HttpException,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Res,
  Body,
} from "@nestjs/common";
import { CategoryEntity } from './entities/category.entity';
import { FileInterceptor } from "@nestjs/platform-express";
import { LibrariesService } from "./libraries.service";
import { ApiTags, ApiConsumes, ApiBody, ApiOkResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { Response } from "express";
import { CreateLibBookDto } from "./dto";
import { Roles } from "@n-decorators/roles.decorator";
import { Permission } from "@n-constants";
import { AuthClaims } from "@n-decorators/claims-auth.decorator";

interface IExcelFile {
  encoding: string;
  buffer: Buffer | Uint8Array;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

@Controller("libraries")
@ApiTags("Library")
export class LibrariesController {
  constructor(
    private readonly librariesService: LibrariesService,
  ) {}
  /**
   * Get all book entries from the library.
   *
   * @returns - All book entries from the library.
   */

  @Get()
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  findAll() {
    return this.librariesService.getBook();
  }
  /**
   * Save a new book entry to the library.
   *
   * @param createCategoryDto - Data to create a new book entry.
   * @returns - The created book entry.
   */

  @Post("save")
  @Roles([Permission.CREATE_CATEGORY])
  @AuthClaims()
  @ApiCreatedResponse({ type: CategoryEntity })
  create(
  @Body() createCategoryDto: CreateLibBookDto,
  ) {
    return this.librariesService.saveBook(createCategoryDto);
  }

  @Get("chartData")
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  getDataForChart(
  @Body() query: Record<string, string>,
  ) 
{
    return this.librariesService.getDataForChart(query);
  }
}
