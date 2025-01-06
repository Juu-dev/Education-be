import { Injectable } from '@nestjs/common';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import { CreateBookDto, UpdateBookDto } from './dto';
import { BooksRepository } from './books.repository';
import {FileUploadService} from "@n-modules/file-upload/file-upload.service";
import {IFile} from "../../../interfaces";

@Injectable()
export class BooksService {
  constructor(
      private readonly booksRepository: BooksRepository,
      private readonly fileUploadService: FileUploadService
  ) {}

  async createBook(createBookDto: CreateBookDto, files: IFile[]) {
    const fileMappings = this.mapFiles(files);
    const [coverImageUrl, contentPdfUrl] = await this.uploadFiles(fileMappings);

    const book = await this.booksRepository.create({
      ...createBookDto,
      evaluate: Number(createBookDto.evaluate),
      coverImageUrl,
      contentPdfUrl,
    } as any);

    return {
      data: book,
    }
  }

  async createBookFromExcel(createBookDto :CreateBookDto[]) {
    const books = [];
    for (const book of createBookDto) {
      const bookData = {
        ...book,
        totalBooks: Number(book.totalBooks),
        borrowedBooks: Number(book.borrowedBooks),
        evaluate: Number(book.evaluate),
      };
      await this.booksRepository.create(bookData as any);
      books.push(bookData);
    }

    return {
      data: books,
    }
  }


  private mapFiles(files: IFile[]): { coverImage: IFile; contentPdf: IFile } {
    const coverImage = files.find(file => file.mimetype.startsWith('image/'));
    const contentPdf = files.find(file => file.mimetype === 'application/pdf');

    if (!coverImage || !contentPdf) {
      throw new Error('Cover image or content PDF is missing');
    }

    return { coverImage, contentPdf };
  }

  private async uploadFiles({
                              coverImage,
                              contentPdf,
                            }: {
    coverImage: IFile;
    contentPdf: IFile;
  }): Promise<[string, string]> {
    const [coverImageUpload, contentPdfUpload] = await Promise.all([
      this.fileUploadService.uploadFile(coverImage),
      this.fileUploadService.uploadFile(contentPdf),
    ]);

    return [coverImageUpload.Location, contentPdfUpload.Location];
  }

  async getAllBooks() {
    const books = await this.booksRepository.findAll();
    return {
      data: {
        books,
      }
    }
  }

  async getBooksGroupedByType() {
    const chartData = await this.booksRepository.getBooksGroupedByType();
    return {
      data: {
        chartData,
      }
  }
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
