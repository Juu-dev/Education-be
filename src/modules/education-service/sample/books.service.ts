import { Injectable } from '@nestjs/common';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import { CreateBookDto, UpdateBookDto } from './dto';
import { BooksRepository } from './books.repository';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {
  }

  async createBook(createBookDto: CreateBookDto) {
    return this.booksRepository.create(createBookDto as any);
  }

  async getListBook(
    page?: number,
    pageSize?: number,
  ) {
    const count = await this.booksRepository.count();

    const items = await this.booksRepository.findAllPagination(page, pageSize);

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
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
    }

    return { data: book };
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.booksRepository.findById(id);
    if (!book) {
      throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
    }

    return this.booksRepository.updateById(
      id,
      updateBookDto as any,
    );
  }
}
