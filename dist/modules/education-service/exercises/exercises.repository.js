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
exports.ExercisesRepository = void 0;
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const generic_repository_1 = require("../../generic-service/generic.repository");
let ExercisesRepository = class ExercisesRepository extends generic_repository_1.GenericRepository {
    constructor(prismaService) {
        super(prismaService, 'exercise');
        this.prismaService = prismaService;
    }
    async findByIdWithQuestion(id) {
        return this.prismaService.exercise.findUnique({
            where: {
                id: id
            },
            include: {
                quiz: {
                    include: {
                        questions: {
                            include: {
                                options: {
                                    select: {
                                        id: true,
                                        questionId: true,
                                        content: true,
                                    }
                                },
                            }
                        }
                    }
                }
            }
        });
    }
    async findStudentsByExerciseId(id) {
        return this.prismaService.exercise.findUnique({
            where: {
                id: id
            },
            include: {
                answers: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
};
ExercisesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExercisesRepository);
exports.ExercisesRepository = ExercisesRepository;
//# sourceMappingURL=exercises.repository.js.map