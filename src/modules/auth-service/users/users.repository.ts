import { PrismaService } from '@n-database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { GenericRepository } from '@n-modules/generic-service/generic.repository';

@Injectable()
export class UsersRepository extends GenericRepository<User> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'user');
  }

  findByUsername(username: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        username,
      },
      include: {
        Student: true,
        Teacher: {
          include: {
            class: true
          }
        },
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }
}
