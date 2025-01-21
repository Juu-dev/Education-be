import { Injectable } from '@nestjs/common';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import {AnswerDto, CreateAnswerDto, UpdateAnswerDto} from './dto';
import { AnswersRepository } from './answers.repository';
import {UsersRepository} from "@n-modules/auth-service/users/users.repository";

@Injectable()
export class AnswersService {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  private async countMark(answers: AnswerDto[], exerciseId: string) {
    const countRightAnswer = this.answersRepository.countRightAnswer(answers);
    const countQuestion = this.answersRepository.countQuestionsInQuiz(exerciseId)

    const result = await Promise.all([countRightAnswer, countQuestion])

    return result[0]/result[1] * 10;
  }

  async createAnswer(createAnswerDto: CreateAnswerDto) {
    const student = await this.usersRepository.findById(createAnswerDto.studentId);
    if (!student) {
      throw new BaseException(Errors.USER.STUDENT_NOT_FOUND);
    }

    const mark =　await this.countMark(createAnswerDto.answers, createAnswerDto.exerciseId)

    const data = {...createAnswerDto, mark}

    return this.answersRepository.createAnswer(data as any);
  }

  async getListAnswer(
    page?: number,
    pageSize?: number,
  ) {
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

  async getAnswerById(id: string) {
    const task = await this.answersRepository.findById(id);

    if (!task) {
      throw new BaseException(Errors.TASK.TASK_NOT_FOUND);
    }

    return task;
  }

  async updateAnswer(id: string, updateAnswerDto: UpdateAnswerDto) {
    const task = await this.answersRepository.findById(id);
    if (!task) {
      throw new BaseException(Errors.TASK.TASK_NOT_FOUND);
    }

    return this.answersRepository.updateById(
      id,
      updateAnswerDto as any,
    );
  }

  async deleteAnswer(id: string) {
    const task = await this.answersRepository.findById(id);
    if (!task) {
      throw new BaseException(Errors.TASK.TASK_NOT_FOUND);
    }

    return this.answersRepository.hardDeleteById(id);
  }
}
