import { Injectable } from "@nestjs/common";
import XLSX from "xlsx";
import { BaseException } from "@n-exceptions";
import { Errors } from "@n-constants";
import { CreateLibBookDto } from "./dto";
import { LibrariesRepository } from "./libraries.repository";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class LibrariesService {
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
}
