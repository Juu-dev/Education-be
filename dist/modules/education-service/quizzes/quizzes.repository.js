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
exports.QuizzesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const generic_repository_1 = require("../../generic-service/generic.repository");
let QuizzesRepository = class QuizzesRepository extends generic_repository_1.GenericRepository {
    constructor(prismaService) {
        super(prismaService, 'quiz');
        this.prismaService = prismaService;
    }
    createQuiz(data) {
        return this.prismaService.quiz.create({
            data: {
                title: data.title,
                creator: {
                    connect: {
                        id: data.creatorId,
                    },
                },
                questions: {
                    create: data.questions.map((q) => ({
                        content: q.content,
                        options: {
                            create: q.answers.map((a) => ({
                                content: a.content,
                                isCorrect: a.isCorrect,
                            })),
                        },
                    })),
                },
            },
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });
    }
    findQuizAndExercise(quizId) {
        return this.prismaService.quiz.findUnique({
            where: {
                id: quizId,
            },
            select: {
                exercise: true,
            },
        });
    }
    findByIdAndQuestion(quizId) {
        return this.prismaService.quiz.findUnique({
            where: {
                id: quizId,
            },
            select: {
                id: true,
                questions: {
                    select: {
                        id: true,
                        options: true,
                    }
                }
            }
        });
    }
    updateByIdWithAnswer(id, updateQuizData, newQuestion) {
        return this.prismaService.quiz.update({
            where: {
                id,
            },
            data: {
                title: updateQuizData.title,
                questions: {
                    update: updateQuizData.questions.map((q) => ({
                        where: {
                            id: q.id,
                        },
                        data: {
                            content: q.content,
                            options: {
                                update: q.answers.map((a) => ({
                                    where: {
                                        id: a.id,
                                    },
                                    data: {
                                        content: a.content,
                                        isCorrect: a.isCorrect,
                                    },
                                })),
                            },
                        },
                    })),
                    create: newQuestion.map((q) => ({
                        content: q.content,
                        options: {
                            create: q.answers.map((a) => ({
                                content: a.content,
                                isCorrect: a.isCorrect,
                            })),
                        },
                    })),
                },
            },
        });
    }
    countQuestions(quizId, questionIds) {
        return this.prismaService.question.count({
            where: {
                quizId,
                id: {
                    in: questionIds,
                },
            },
        });
    }
    deleteQuestionsWithCascade(questionIds) {
        return this.prismaService.question.deleteMany({
            where: {
                id: {
                    in: questionIds,
                },
            },
        });
    }
};
QuizzesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizzesRepository);
exports.QuizzesRepository = QuizzesRepository;
//# sourceMappingURL=quizzes.repository.js.map