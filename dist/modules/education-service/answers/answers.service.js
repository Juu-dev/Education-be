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
exports.AnswersService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const answers_repository_1 = require("./answers.repository");
const users_repository_1 = require("../../auth-service/users/users.repository");
let AnswersService = class AnswersService {
    constructor(answersRepository, usersRepository) {
        this.answersRepository = answersRepository;
        this.usersRepository = usersRepository;
    }
    async countMark(answers, exerciseId) {
        const countRightAnswer = this.answersRepository.countRightAnswer(answers);
        const countQuestion = this.answersRepository.countQuestionsInQuiz(exerciseId);
        const result = await Promise.all([countRightAnswer, countQuestion]);
        return result[0] / result[1] * 10;
    }
    async createAnswer(createAnswerDto) {
        const student = await this.usersRepository.findById(createAnswerDto.studentId);
        if (!student) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.USER.STUDENT_NOT_FOUND);
        }
        const mark = await this.countMark(createAnswerDto.answers, createAnswerDto.exerciseId);
        const data = { ...createAnswerDto, mark };
        return this.answersRepository.createAnswer(data);
    }
    async getListAnswer(page, pageSize) {
        const count = this.answersRepository.count();
        const items = this.answersRepository.findAllPagination({
            page,
            pageSize,
        });
        const parallelPromise = await Promise.all([count, items]);
        return {
            pagination: {
                page,
                pageSize,
                totalPage: Math.ceil(parallelPromise[0] / pageSize),
            },
            count,
            data: parallelPromise[1],
        };
    }
    async getAnswerById(id) {
        const task = await this.answersRepository.findById(id);
        if (!task) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.TASK.TASK_NOT_FOUND);
        }
        return task;
    }
    async updateAnswer(id, updateAnswerDto) {
        const task = await this.answersRepository.findById(id);
        if (!task) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.TASK.TASK_NOT_FOUND);
        }
        return this.answersRepository.updateById(id, updateAnswerDto);
    }
    async deleteAnswer(id) {
        const task = await this.answersRepository.findById(id);
        if (!task) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.TASK.TASK_NOT_FOUND);
        }
        return this.answersRepository.hardDeleteById(id);
    }
};
AnswersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [answers_repository_1.AnswersRepository,
        users_repository_1.UsersRepository])
], AnswersService);
exports.AnswersService = AnswersService;
//# sourceMappingURL=answers.service.js.map