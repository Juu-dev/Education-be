import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { LibrariesService } from "./libraries.service";
import { ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { AuthClaims, Roles } from "@n-decorators";
import { Permission } from "@n-constants";
import { Response } from "express";

@Controller("libraries")
@ApiTags("Library")
export class LibrariesController {
  constructor(private readonly librariesService: LibrariesService) {}

  /**
   * Get all library books.
   */
  @Get()
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    description: "Get a list of all library books",
  })
  async getLibraryBooks() {
    return this.librariesService.getLibraryBooks();
  }

  /**
   * Generate a chart of library book statistics.
   * @param res - Response object to send the chart as an image.
   */
  @Get("chart")
  @Roles([Permission.GET_CATEGORIES])
  @AuthClaims()
  @ApiOkResponse({
    description: "Get a chart of library book statistics",
  })
  async getLibraryBooksChart(@Res() res: Response) {
    try {
      const chartBuffer = await this.librariesService.getVisualizeData();

      res.setHeader("Content-Type", "image/png");
      res.send(chartBuffer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
