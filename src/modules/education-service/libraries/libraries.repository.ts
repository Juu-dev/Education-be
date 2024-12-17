import { Injectable } from "@nestjs/common";
import { LibraryBooks } from "@prisma/client";

import { PrismaService } from "@n-database/prisma/prisma.service";
import { GenericRepository } from "@n-modules/generic-service/generic.repository";

@Injectable()
export class LibrariesRepository extends GenericRepository<LibraryBooks> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, "libraryBooks");
  }

  async createMany(data: LibraryBooks[]) {
    return this.prismaService.libraryBooks.createMany({
      data,
    });
  }

  async findByFilter(filters: Record<string, any>) : Promise<LibraryBooks[]> {
    return this.prismaService.libraryBooks.findMany({
      where :{ 
        ...filters,
      },
    });
  }

 

  async deleteAll() {
    return this.prismaService.libraryBooks.deleteMany();
  }
}
