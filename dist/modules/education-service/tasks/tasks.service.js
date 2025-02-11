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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const tasks_repository_1 = require("./tasks.repository");
const users_repository_1 = require("../../auth-service/users/users.repository");
let TasksService = class TasksService {
    constructor(tasksRepository, usersRepository) {
        this.tasksRepository = tasksRepository;
        this.usersRepository = usersRepository;
    }
    async createTask(createTaskDto) {
        if (createTaskDto.assigneeId === "all")
            return this.bulkCreateTask(createTaskDto);
        const assigneeExists = await this.usersRepository.findById(createTaskDto.assignerId);
        if (!assigneeExists) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.TASK.ASSIGNEE_NOT_EXISTS);
        }
        const assignerExists = await this.usersRepository.findById(createTaskDto.assigneeId);
        if (!assignerExists) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.TASK.ASSIGNER_NOT_EXISTS);
        }
        return this.tasksRepository.create(createTaskDto);
    }
    async bulkCreateTask(createTaskDto) {
        const assigneeExists = await this.usersRepository.findById(createTaskDto.assignerId);
        if (!assigneeExists) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.TASK.ASSIGNEE_NOT_EXISTS);
        }
        const assignees = await this.usersRepository.findAllExceptStudent(createTaskDto.assignerId);
        const assigneeIds = assignees.map((e) => e.id);
        const tasks = assigneeIds.map((id) => ({
            ...createTaskDto,
            assigneeId: id
        }));
        return this.tasksRepository.createMany(tasks);
    }
    async getListTask(page, pageSize) {
        const count = this.tasksRepository.count();
        const items = this.tasksRepository.findAllPagination({
            page,
            pageSize
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
    async findFiveLatest(userId) {
        const items = await this.tasksRepository.findFiveLatest(userId);
        return { data: items };
    }
    async getListTaskWithSpecificMode(props) {
        const { page, pageSize, mode, id } = props;
        const where = {};
        if (mode === "sent") {
            where.assignerId = id;
        }
        else if (mode === "received") {
            where.assigneeId = id;
        }
        const count = this.tasksRepository.count({ where });
        const items = this.tasksRepository.findAllPaginationWithSpecificMode(props);
        const parallelPromise = await Promise.all([count, items]);
        return {
            pagination: {
                page,
                pageSize,
                totalPage: Math.ceil(parallelPromise[0] / pageSize),
            },
            count: parallelPromise[0],
            data: parallelPromise[1],
        };
    }
    async getTaskById(id) {
        const task = await this.tasksRepository.findById(id);
        if (!task) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.TASK.TASK_NOT_FOUND);
        }
        return task;
    }
    async updateTask(id, UpdateTaskDto) {
        const task = await this.tasksRepository.findById(id);
        if (!task) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.TASK.TASK_NOT_FOUND);
        }
        return this.tasksRepository.updateById(id, UpdateTaskDto);
    }
    async deleteTask(id) {
        const task = await this.tasksRepository.findById(id);
        if (!task) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.TASK.TASK_NOT_FOUND);
        }
        return this.tasksRepository.softDeleteById(id);
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tasks_repository_1.TasksRepository,
        users_repository_1.UsersRepository])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map