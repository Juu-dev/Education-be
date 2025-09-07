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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const exercises_repository_1 = require("./exercises.repository");
const users_repository_1 = require("../../auth-service/users/users.repository");
const classes_repository_1 = require("../classes/classes.repository");
const quizzes_repository_1 = require("../quizzes/quizzes.repository");
let ExercisesService = class ExercisesService {
    constructor(exercisesRepository, usersRepository, classesRepository, quizzesRepository) {
        this.exercisesRepository = exercisesRepository;
        this.usersRepository = usersRepository;
        this.classesRepository = classesRepository;
        this.quizzesRepository = quizzesRepository;
    }
    async createExercise(createExerciseDto) {
        const newExerciseData = {
            ...createExerciseDto,
        };
        const assignerExists = await this.usersRepository.findById(createExerciseDto.assignerId);
        if (!assignerExists) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.EXERCISE.ASSIGNER_NOT_EXISTS);
        }
        const classExists = await this.classesRepository.findById(createExerciseDto.classAssigneeId);
        if (!classExists) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.EXERCISE.CLASS_NOT_EXISTS);
        }
        const quizExists = await this.quizzesRepository.findById(createExerciseDto.quizId);
        if (!quizExists) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.EXERCISE.CLASS_NOT_EXISTS);
        }
        return this.exercisesRepository.create(newExerciseData);
    }
    getListExercise() {
        return this.exercisesRepository.findAll();
    }
    async getListPaginatedExercise(page, pageSize, userId) {
        const condition = { where: { assignerId: userId } };
        const count = this.exercisesRepository.count(condition);
        const items = this.exercisesRepository.findAllPaginationModeStudent({
            page,
            pageSize,
            ...condition
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
    async getListPaginatedExerciseModeStudent(page, pageSize, classId) {
        const condition = { where: { classAssigneeId: classId } };
        const count = this.exercisesRepository.count(condition);
        const items = this.exercisesRepository.findAllPaginationModeStudent({
            page,
            pageSize,
            ...condition
        });
        const promise = await Promise.all([count, items]);
        const itemFilter = promise[1].map((exercise) => {
            const { answers, ...rest } = exercise;
            const distinctAnswers = new Set(answers.map(answer => answer.userId));
            return {
                ...rest,
                countDoneStudent: distinctAnswers.size
            };
        });
        return {
            pagination: {
                page,
                pageSize,
                totalPage: Math.ceil(promise[0] / pageSize),
            },
            count: promise[0],
            data: itemFilter,
        };
    }
    async getExerciseById(id) {
        const exercise = await this.exercisesRepository.findByIdWithQuestion(id);
        if (!exercise) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.EXERCISE.EXERCISE_NOT_FOUND);
        }
        return { data: exercise };
    }
    async getStudentsByExerciseId(id) {
        const exercise = await this.exercisesRepository.findStudentsByExerciseId(id);
        if (!exercise) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.EXERCISE.EXERCISE_NOT_FOUND);
        }
        return { data: exercise };
    }
    async updateExercise(id, updateExerciseDto) {
        const exercise = await this.exercisesRepository.findById(id);
        if (!exercise) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.EXERCISE.EXERCISE_NOT_FOUND);
        }
        const updateExerciseData = {
            ...updateExerciseDto,
        };
        const updatedExercise = await this.exercisesRepository.updateById(id, updateExerciseData);
        return updatedExercise;
    }
    async deleteExerciseById(id) {
        const exercise = await this.exercisesRepository.findById(id);
        if (!exercise) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.EXERCISE.EXERCISE_NOT_FOUND);
        }
        return this.exercisesRepository.softDeleteById(id);
    }
};
ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [exercises_repository_1.ExercisesRepository,
        users_repository_1.UsersRepository,
        classes_repository_1.ClassesRepository,
        quizzes_repository_1.QuizzesRepository])
], ExercisesService);
exports.ExercisesService = ExercisesService;
//# sourceMappingURL=exercises.service.js.map