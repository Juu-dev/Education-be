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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const quizzes_repository_1 = require("./quizzes.repository");
let QuizzesService = class QuizzesService {
    constructor(quizzesRepository) {
        this.quizzesRepository = quizzesRepository;
    }
    createQuiz(createQuizDto) {
        return this.quizzesRepository.createQuiz(createQuizDto);
    }
    async getListQuiz(userId) {
        const condition = { where: { creatorId: userId } };
        const quizzes = await this.quizzesRepository.findAll(condition);
        return {
            data: quizzes,
        };
    }
    async getListPaginatedQuiz(page, pageSize, userId) {
        const condition = { where: { creatorId: userId } };
        const count = this.quizzesRepository.count(condition);
        const items = this.quizzesRepository.findAllPagination({
            page,
            pageSize,
            ...condition,
        });
        const promise = await Promise.all([count, items]);
        return {
            pagination: {
                page,
                pageSize,
                totalPage: Math.ceil(promise[0] / pageSize),
            },
            count: promise[0],
            data: promise[1],
        };
    }
    async getQuizById(id) {
        const quiz = await this.quizzesRepository.findById(id);
        if (!quiz) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.QUIZ.QUIZ_NOT_FOUND);
        }
        return quiz;
    }
    async updateQuiz(id, updateQuizDto) {
        const quiz = await this.quizzesRepository.findByIdAndQuestion(id);
        if (!quiz) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.QUIZ.QUIZ_NOT_FOUND);
        }
        const updateQuizQuestionIds = updateQuizDto.questions.map((question) => question.id).filter(id => id !== "");
        const questionIds = quiz.questions.map((e) => e.id);
        const removeQuestionIds = questionIds.filter(e => !updateQuizQuestionIds.includes(e));
        const newQuestion = updateQuizDto.questions.filter((question) => question.id === "");
        const updateQuizData = {
            ...updateQuizDto,
            questions: updateQuizDto.questions.filter((question) => question.id !== "")
        };
        if (removeQuestionIds.length > 0) {
            await this.quizzesRepository.deleteQuestionsWithCascade(removeQuestionIds);
        }
        const updatedQuiz = await this.quizzesRepository.updateByIdWithAnswer(id, updateQuizData, newQuestion);
        return updatedQuiz;
    }
    async deleteQuizById(id) {
        const quiz = await this.quizzesRepository.findQuizAndExercise(id);
        if (!quiz) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.QUIZ.QUIZ_NOT_FOUND);
        }
        if (quiz?.exercise.length > 0) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.QUIZ.EXERCISE_EXISTEDS);
        }
        return this.quizzesRepository.hardDeleteById(id);
    }
    async doesQuizContainAllQuestions(quizId, questionIds) {
        const matchingQuestionsCount = await this.quizzesRepository.countQuestions(quizId, questionIds);
        return matchingQuestionsCount === questionIds.length;
    }
    async deleteQuestionsWithCascade(quizId, questionIds) {
        if (!questionIds || questionIds.length === 0) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.QUIZ.QUESTION_NEED);
        }
        const isValidQuestion = await this.doesQuizContainAllQuestions(quizId, questionIds);
        if (!isValidQuestion) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.QUIZ.QUESTION_NOT_FOUND);
        }
        return this.quizzesRepository.deleteQuestionsWithCascade(questionIds);
    }
};
QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [quizzes_repository_1.QuizzesRepository])
], QuizzesService);
exports.QuizzesService = QuizzesService;
//# sourceMappingURL=quizzes.service.js.map