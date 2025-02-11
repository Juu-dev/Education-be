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
exports.AnswersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const generic_repository_1 = require("../../generic-service/generic.repository");
let AnswersRepository = class AnswersRepository extends generic_repository_1.GenericRepository {
    constructor(prismaService) {
        super(prismaService, 'answer');
        this.prismaService = prismaService;
    }
    createAnswer(data) {
        return this.prismaService.answer.create({
            data: {
                mark: data.mark,
                user: {
                    connect: {
                        id: data.studentId,
                    },
                },
                exercise: {
                    connect: {
                        id: data.exerciseId,
                    },
                },
                questionAnswers: {
                    create: data.answers.map((e) => ({
                        question: {
                            connect: {
                                id: e.questionId
                            }
                        },
                        selectedOption: {
                            connect: {
                                id: e.optionId
                            }
                        },
                    }))
                }
            }
        });
    }
    countRightAnswer(data) {
        const questionIds = data.map((item) => item.questionId);
        const selectedOptionIds = data.map((item) => item.optionId);
        return this.prismaService.question.count({
            where: {
                id: { in: questionIds },
                options: {
                    some: {
                        id: { in: selectedOptionIds },
                        isCorrect: true,
                    },
                },
            },
        });
    }
    countQuestionsInQuiz(exerciseId) {
        return this.prismaService.question.count({
            where: {
                quiz: {
                    exercise: {
                        some: {
                            id: exerciseId,
                        },
                    }
                },
            },
        });
    }
};
AnswersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnswersRepository);
exports.AnswersRepository = AnswersRepository;
//# sourceMappingURL=answers.repository.js.map