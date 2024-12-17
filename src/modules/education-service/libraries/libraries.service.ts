import { Injectable } from "@nestjs/common";
import { UpdateLibBookDto } from "./dto";
import { LibrariesRepository } from "./libraries.repository";

@Injectable()
export class LibrariesService {
  constructor(private readonly librariesRepository: LibrariesRepository) {}

  private parseFilters(query: Record<string, string>) {
    const validFields = ['bookType', 'bookTitle', 'publisher', 'publishedYear'];
    const filters: Record<string, any> = {};
    for (const key in query) {
      if (validFields.includes(key)) {
        filters[key] = isNaN(Number(query[key])) ? query[key] : Number(query[key]);
      }
    }
    return filters;
  }

  async saveBook(updateLibBookDto: UpdateLibBookDto) {
    const {
      id,
      bookTitle,
      remainingBooks,
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
      remainingBooks,
      borrowedBooks,
      publisher,
      publishedYear,
      bookType,
      createdAt: createdAt || new Date(),
      updatedAt: updatedAt || new Date(),
    };

    return await this.librariesRepository.createMany([libBook]);
  }

  async getDataForChart(query: Record<string, string>) {
    const filters = this.parseFilters(query);
    return await this.librariesRepository.findByFilter(filters);

  }

  async getBook(){
    return await this.librariesRepository.findAll();
  }
}
