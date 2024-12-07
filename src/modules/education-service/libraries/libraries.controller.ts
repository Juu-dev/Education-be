import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthClaims, Roles } from "@n-decorators";
import { ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LibrariesService } from "./libraries.service";
import { LibraryBooks } from "@prisma/client";
import { Permission } from "@n-constants";
import { File as MulterFile } from "multer";
import { CategoryEntity } from "./entities/category.entity";

@Controller("libraries")
@ApiTags("Library")
export class LibrariesController {
  constructor(private readonly librariesService: LibrariesService) {}

  /**
   * Upload a library book file (Excel) and store data in the database.
   * @param file - Excel file containing library books data.
   */
  @Post("upload")
  @Roles([Permission.CREATE_CATEGORY])
  @ApiConsumes("multipart/form-data")
  @AuthClaims()
  @UseInterceptors(FileInterceptor("file"))
  async uploadLibraryBooks(@UploadedFile() file: MulterFile) {
    if (!file) {
      throw new HttpException("File is required", HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.librariesService.createLibraryBooks(file.buffer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get all library books.
   */
  @Get()
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    type: CategoryEntity,
    isArray: true,
  })
  async getLibraryBooks() {
    return this.librariesService.getLibraryBooks();
  }
}
