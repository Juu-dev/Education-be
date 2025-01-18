import { Injectable } from '@nestjs/common';
import { Quiz } from '@prisma/client';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import { CreateQuizDto, UpdateQuizDto } from './dtos';
import { QuizzesRepository } from './quizzes.repository';

@Injectable()
export class QuizzesService {
  constructor(
    private readonly quizzesRepository: QuizzesRepository,
  ) {}

  createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    return this.quizzesRepository.createQuiz(createQuizDto as any);
  }

  async getListQuiz() {
    const quizzes = await this.quizzesRepository.findAll();
    return {
      data: quizzes,
    };
  }

  async getListPaginatedQuiz(
    page?: number,
    pageSize?: number,
    userId?: string,
  ) {
    const condition = {where: {creatorId: userId}};

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

  async getQuizById(id: string): Promise<Quiz> {
    const quiz = await this.quizzesRepository.findById(id);
    if (!quiz) {
      throw new BaseException(Errors.QUIZ.QUIZ_NOT_FOUND);
    }
    return quiz;
  }

  async updateQuiz(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = await this.quizzesRepository.findByIdAndQuestion(id);
    if (!quiz) {
      throw new BaseException(Errors.QUIZ.QUIZ_NOT_FOUND);
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

    const updatedQuiz = await this.quizzesRepository.updateByIdWithAnswer(
      id,
      updateQuizData,
      newQuestion
    );
    return updatedQuiz;
  }

  async deleteQuizById(id: string) {
    const quiz = await this.quizzesRepository.findQuizAndExercise(id);
    if (!quiz) {
      throw new BaseException(Errors.QUIZ.QUIZ_NOT_FOUND);
    }

    if (quiz?.exercise.length > 0) {
      throw new BaseException(Errors.QUIZ.EXERCISE_EXISTEDS);
    }

    // return this.quizzesRepository.softDeleteById(id);
    return this.quizzesRepository.hardDeleteById(id);
  }

  private async doesQuizContainAllQuestions(quizId: string, questionIds: string[]): Promise<boolean> {
    const matchingQuestionsCount = await this.quizzesRepository.countQuestions(quizId, questionIds);
    return matchingQuestionsCount === questionIds.length;
  }

  async deleteQuestionsWithCascade(quizId: string, questionIds: string[]) {
    if (!questionIds || questionIds.length === 0) {
      throw new BaseException(Errors.QUIZ.QUESTION_NEED);
    }

    const isValidQuestion = await this.doesQuizContainAllQuestions(quizId, questionIds);
    if (!isValidQuestion) {
      throw new BaseException(Errors.QUIZ.QUESTION_NOT_FOUND);
    }

    return this.quizzesRepository.deleteQuestionsWithCascade(questionIds);
  }
}
