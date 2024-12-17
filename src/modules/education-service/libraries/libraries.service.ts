import { Injectable } from "@nestjs/common";
import { UpdateLibBookDto } from "./dto";
import { LibrariesRepository } from "./libraries.repository";

@Injectable()
export class LibrariesService {
  constructor(private readonly librariesRepository: LibrariesRepository) {}

  async saveBook(updateLibBookDto: UpdateLibBookDto) {
    const {
      id,
      bookTitle,
      totalBooks,
      borrowedBooks,
      publisher,
      publishedYear,
      bookType,
      createdAt,
      updatedAt,
    } = updateLibBookDto;

    const libBook = {
      id,
      bookTitle,
      totalBooks,
      borrowedBooks,
      publisher,
      publishedYear,
      bookType,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    };

    return await this.librariesRepository.createMany([libBook]);
  }


  async getBook(){
    return await this.librariesRepository.findAll();
  }
}
