import { Injectable } from '@nestjs/common';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksRepository } from './tasks.repository';
import {UsersRepository} from "@n-modules/auth-service/users/users.repository";

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
  ) {
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const assigneeExists = await this.usersRepository.findById(createTaskDto.assignerId);
    if (!assigneeExists) {
      throw new BaseException(Errors.TASK.ASSIGNEE_NOT_EXISTS);
    }

    const assignerExists = await this.usersRepository.findById(createTaskDto.assigneeId)
    if (!assignerExists) {
      throw new BaseException(Errors.TASK.ASSIGNER_NOT_EXISTS);
    }

    return this.tasksRepository.create(createTaskDto as any);
  }

  async getListTask(
    page?: number,
    pageSize?: number,
  ) {
    const count = this.tasksRepository.count();

    const items = this.tasksRepository.findAllPagination(page, pageSize);

    const parallelPromise = await Promise.all([count, items])

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

  async getTaskById(id: string) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new BaseException(Errors.TASK.TASK_NOT_FOUND);
    }

    return task;
  }

  async updateTask(id: string, UpdateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new BaseException(Errors.TASK.TASK_NOT_FOUND);
    }

    return this.tasksRepository.updateById(
      id,
      UpdateTaskDto as any,
    );
  }

  async deleteTask(id: string) {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new BaseException(Errors.TASK.TASK_NOT_FOUND);
    }

    return this.tasksRepository.deleteById(id);
  }
}
