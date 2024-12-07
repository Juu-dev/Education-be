import { Injectable } from "@nestjs/common";
import XLSX from "xlsx";
import { BaseException } from "@n-exceptions";
import { Errors } from "@n-constants";
import { CreateLibBookDto } from "./dto";
import { LibrariesRepository } from "./libraries.repository";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ChartJSNodeCanvas } from "chartjs-node-canvas";

@Injectable()
export class LibrariesService {
  private chartJsNodeCanvas: ChartJSNodeCanvas;
  constructor(private readonly librariansRepository: LibrariesRepository) {}

  //Đọc file excel và lưu dữ liệu vào database theo định dạng của file output.xlsx
  async createLibraryBooks(fileBuffer: Buffer) {
    try {
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(sheet);

      if (!data || data.length === 0) {
        throw new BaseException(Errors.UPLOAD.FILE_EMPTY);
      }

      const libBooks: CreateLibBookDto[] = [];
      for (const item of data) {
        const dto = plainToInstance(CreateLibBookDto, item);
        const error = await validate(dto);
        if (error.length > 0) {
          throw new BaseException(Errors.UPLOAD.FILE_CONTENT_INVALID);
        }
        libBooks.push(dto);
      }

      await this.librariansRepository.deleteAll();
      const libraryBooks = libBooks.map((book) => ({
        id: book.id || "",
        bookTitle: book.bookTitle,
        remainingBooks: book.remainingBooks,
        borrowedBooks: book.borrowedBooks,
        publisher: book.publisher,
        publishedYear: book.publishedYear,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      return this.librariansRepository.createMany(libraryBooks);
    } catch (error) {
      throw new BaseException(Errors.UPLOAD.FILE_CONTENT_INVALID);
    }
  }

  async getLibraryBooks() {
    return this.librariansRepository.findAll();
  }

  /**
   * Tạo biểu đồ từ dữ liệu sách trong database
   */
  async getVisualizeData() {
    // Lấy dữ liệu từ database
    const books = await this.librariansRepository.findAll();

    // Chuẩn bị dữ liệu cho biểu đồ
    const labels = books.map((book) => book.bookTitle); // Tên sách
    const totalBooks = books.map((book) => book.remainingBooks); // Tổng số sách
    const borrowedBooks = books.map((book) => book.borrowedBooks); // Số sách đã mượn

    // Cấu hình biểu đồ
    const configuration = {
      type: "bar" as const,
      data: {
        labels: labels,
        datasets: [
          {
            label: "Tổng số sách",
            data: totalBooks,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Số sách đã mượn",
            data: borrowedBooks,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    // Tạo hình ảnh biểu đồ
    return this.chartJsNodeCanvas.renderToBuffer(configuration);
  }
}
