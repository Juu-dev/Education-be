"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const generic_repository_1 = require("../../generic-service/generic.repository");
let UsersRepository = class UsersRepository extends generic_repository_1.GenericRepository {
    constructor(prismaService) {
        super(prismaService, 'user');
        this.prismaService = prismaService;
    }
    updateStudentById(id, data) {
        const { parentName, ...rest } = data;
        const payload = rest;
        if (data?.parentName) {
            payload.student = {
                update: {
                    parentName: data?.parentName
                }
            };
        }
        return this.prismaService.user.update({
            where: { id },
            data: payload,
        });
    }
    findByUsername(username) {
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
    findAllExceptStudent(id) {
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
    findAllLibrarianAndTeacher() {
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
            include: {
                class: true,
            }
        });
    }
    findListTeacher() {
        return this.prismaService.user.findMany({
            where: {
                roles: {
                    some: {
                        role: {
                            name: {
                                in: ['teacher'],
                            },
                        },
                    },
                },
            },
            orderBy: {
                name: 'asc'
            },
            include: {
                class: true,
            }
        });
    }
    createStudent(props) {
        const { email, password, classId, name } = props;
        const data = {
            username: email,
            password: password,
            email: email,
            name: name,
            classId: classId,
            roles: {
                create: [
                    {
                        role: {
                            connect: {
                                name: "student",
                            },
                        },
                    },
                ],
            },
            student: {
                create: {
                    metadataUrl: ""
                },
            }
        };
        return this.prismaService.user.create({ data });
    }
    async assignTeacher(assignments) {
        return this.prismaService.$transaction(async (prisma) => {
            await prisma.user.updateMany({
                where: {
                    classId: { not: null },
                },
                data: {
                    classId: null,
                },
            });
            for (const assignment of assignments) {
                const { classId, teacherId } = assignment;
                await prisma.user.update({
                    where: { id: teacherId },
                    data: { classId },
                });
            }
        });
    }
};
UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map