import { Injectable } from '@nestjs/common';
import { Quiz } from '@prisma/client';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import { CreateQuizDto, UpdateQuizDto } from './dtos';
import { QuizzesRepository } from './quizzes.repository';

@Injectable()
export class QuizzesService {
  constructor(private readonly quizzesRepository: QuizzesRepository) {}

  createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizzesRepository.createQuiz(createQuizDto as any);
  }

  getListQuiz() {
    return this.quizzesRepository.findAll();
  }

  async getListPaginatedQuiz(
    page?: number,
    pageSize?: number,
  ) {
    const count = this.quizzesRepository.count();
    const items = this.quizzesRepository.findAllPagination(page, pageSize);

    const promise = await Promise.all([count, items])

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

  async getQuizById(id: string): Promise<Quiz> {
    const quiz = await this.quizzesRepository.findById(id);
    if (!quiz) {
      throw new BaseException(Errors.QUIZ.QUIZ_NOT_FOUND);
    }
    return quiz;
  }

  async updateQuiz(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.quizzesRepository.findById(id);
    if (!quiz) {
      throw new BaseException(Errors.QUIZ.QUIZ_NOT_FOUND);
    }

    const updateQuizData = {
      ...updateQuizDto,
    } as any;

    const updatedQuiz = await this.quizzesRepository.updateById(
      id,
      updateQuizData,
    );
    return updatedQuiz;
  }

  async deleteQuizById( id: string) {
    const quiz = await this.quizzesRepository.findById(id);
    if (!quiz) {
      throw new BaseException(Errors.QUIZ.QUIZ_NOT_FOUND);
    }

    return this.quizzesRepository.softDeleteById(id);
  }
}
