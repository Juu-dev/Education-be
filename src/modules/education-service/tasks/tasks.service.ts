import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksRepository } from './tasks.repository';
import { StudentsService } from '../students/students.service';
import { TeachersService } from '../teachers/teachers.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly studentsService: StudentsService,
    private readonly teachersService: TeachersService,
  ) {
  }

  async createTask(createTaskDto: CreateTaskDto) {
    //Check if the assignee exists
    const assigneeExists = await this.teachersService.getTeacherById(createTaskDto.assigneeId);
    if (!assigneeExists) {
        console.log(`Assignee with ID ${createTaskDto.assigneeId} does not exist`)
        throw new NotFoundException(`Assignee with ID ${createTaskDto.assigneeId} does not exist`);
    }

    // Check if the assigner exists
    const assignerExists = await this.studentsService.getStudentById(createTaskDto.assignerId) //await this.tasksRepository.findUserById(createTaskDto.assignerId);
    if (!assignerExists) {
        throw new NotFoundException(`Assigner with ID ${createTaskDto.assignerId} does not exist`);
    }

    return this.tasksRepository.create(createTaskDto as any);
  }

  async getListTask(
    page?: number,
    pageSize?: number,
  ) {
    const count = await this.tasksRepository.count();

    const items = await this.tasksRepository.findAllPagination(page, pageSize);

    return {
      pagination: {
        page,
        pageSize,
        totalPage: Math.ceil(count / pageSize),
      },
      count,
      data: items,
    };
  }

  async getTaskById(id: string) {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
    }

    return task;
  }

  async updateTask(id: string, UpdateTaskDto: UpdateTaskDto) {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
    }

    return this.tasksRepository.updateById(
      id,
      UpdateTaskDto as any,
    );
  }

  async deleteTask(id: string) {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new BaseException(Errors.CATEGORY.CATEGORY_NOT_FOUND);
    }

    return this.tasksRepository.deleteById(id);
  }
}
