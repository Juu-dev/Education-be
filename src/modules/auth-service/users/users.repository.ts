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
        class: {
          include: {
            _count: {
              select: {
                user: {
                  where: {
                    roles: {
                      some: {
                        role: {
                          name: 'student',
                        },
                      },
                    }
                  }
                }
              }
            }
          }
        },
        librarian: true,
        student: true,
        teacher: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  findAllExceptStudent(id: string): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: {
        id: {
          not: id
        },
        roles: {
          none: {
            role: {
              name: {
                in: ['student', 'librarian'],
              },
            },
          },
        },
      },
      include: {
        teacher: true,
        roles: {
          include: {
            role: true,
          },
        }
      }
    });
  }

  findAllLibrarianAndTeacher(): Promise<User[]> {
    return this.prismaService.user.findMany({
      where: {
        roles: {
          some: {
            role: {
              name: {
                in: ['teacher', 'librarian'],
              },
            },
          },
        },
      },
    });
  }
}
