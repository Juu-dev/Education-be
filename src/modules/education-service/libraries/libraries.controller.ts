import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
  Res,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { LibrariesService } from "./libraries.service";
import { ApiTags, ApiConsumes, ApiBody, ApiOkResponse } from "@nestjs/swagger";
import { Response } from "express";

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
  constructor(private readonly librariesService: LibrariesService) {}

  /**
   * Upload an Excel file to update library data and generate a chart.
   *
   * @param res - Response object to send the chart as an image.
   * @param file - Uploaded Excel file containing library data.
   */
  @Post("chart")
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description:
      "Upload an Excel file to update library data and generate a chart",
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary", 
        },
      },
    },
  })
  @ApiOkResponse({
    description: "Chart generated successfully",
    content: {
      "image/png": {
        schema: {
          type: "string",
          format: "binary", 
        },
      },
    },
  })
  async uploadAndGenerateChart(
    @Res() res: Response,
    @UploadedFile() file: IExcelFile
  ) {
    try {
      if (!file || !file.buffer) {
        throw new HttpException("No file provided", HttpStatus.BAD_REQUEST);
      }

      const fileBuffer = Buffer.isBuffer(file.buffer)
        ? file.buffer
        : Buffer.from(file.buffer);

      const chartBuffer =
        await this.librariesService.processExcelAndGenerateChart(fileBuffer);
      res.setHeader("Content-Type", "image/png");
      res.send(chartBuffer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
