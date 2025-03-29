import { Injectable } from '@nestjs/common';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import { CreateBookImportDto, UpdateBookImportDto } from './dto';
import { BooksImportRepository } from './books-import.repository';

@Injectable()
export class BooksImportService {
  constructor(
      private readonly booksImportRepository: BooksImportRepository,
  ) {}

  async createBook(createBookDto: CreateBookImportDto) {
    const book = await this.booksImportRepository.create({
      ...createBookDto,
    } as any);

    return {
      data: book,
    }
  }

  async getOverviewBook() {
    const overview = await this.booksImportRepository.getOverviewBook();

    return {
      data: overview,
    }
  }

  async bulkBook(bulkBookDto: CreateBookImportDto[]) {
    const books = await this.booksImportRepository.createMany(bulkBookDto as any);

    return {
      data: books,
    }
  }

  async bulkOverrideBook(bulkBookDto: CreateBookImportDto[]) {
    await this.booksImportRepository.deleteAllBooks();
    const books = await this.booksImportRepository.createMany(bulkBookDto as any);

    return {
      data: books,
    }
  }

  async getListBook(
    page?: number,
    pageSize?: number,
  ) {
    const count = await this.booksImportRepository.count({
      where: {
        isDeleted: false,
      }
    });

    const items = await this.booksImportRepository.findAllPagination({
      page,
      pageSize,
      where: {
        isDeleted: false,
      }
    });

    return {
      pagination: {
        page,
        pageSize,
        totalPage: Math.ceil(count / pageSize),
      },
      count,
      data: items,
    };
  }

  async getBookById(id: string) {
    const book = await this.booksImportRepository.findById(id);

    if (!book) {
      throw new BaseException(Errors.BOOK.BOOK_NOT_FOUND);
    }

    return { data: book };
  }

  async updateBook(id: string, updateBookDto: UpdateBookImportDto) {
    const book = await this.booksImportRepository.findById(id);
    if (!book) {
      throw new BaseException(Errors.BOOK.BOOK_NOT_FOUND);
    }

    return this.booksImportRepository.updateById(
      id,
      updateBookDto as any,
    );
  }

  async softDeleteAllBook() {
    return this.booksImportRepository.deleteAllBooks();
  }
}
