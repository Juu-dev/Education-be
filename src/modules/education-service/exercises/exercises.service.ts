import { Injectable } from '@nestjs/common';
import { Exercise } from '@prisma/client';
import { BaseException } from '@n-exceptions';
import { Errors } from '@n-constants';
import { CreateExerciseDto, UpdateExerciseDto } from './dtos';
import { ExercisesRepository } from './exercises.repository';
import {UsersRepository} from "@n-modules/auth-service/users/users.repository";
import {ClassesRepository} from "@n-modules/education-service/classes/classes.repository";
import {QuizzesRepository} from "@n-modules/education-service/quizzes/quizzes.repository";

@Injectable()
export class ExercisesService {
  constructor(
      private readonly exercisesRepository: ExercisesRepository,
      private readonly usersRepository: UsersRepository,
      private readonly classesRepository: ClassesRepository,
      private readonly quizzesRepository: QuizzesRepository
  ) {}

  async createExercise(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const newExerciseData = {
      ...createExerciseDto,
    } as any;

    const assignerExists = await this.usersRepository.findById(createExerciseDto.assignerId)
    if (!assignerExists) {
      throw new BaseException(Errors.EXERCISE.ASSIGNER_NOT_EXISTS);
    }

    const classExists = await this.classesRepository.findById(createExerciseDto.classAssigneeId)
    if (!classExists) {
      throw new BaseException(Errors.EXERCISE.CLASS_NOT_EXISTS);
    }

    const quizExists = await this.quizzesRepository.findById(createExerciseDto.quizId)
    if (!quizExists) {
      throw new BaseException(Errors.EXERCISE.CLASS_NOT_EXISTS);
    }

    return this.exercisesRepository.create(newExerciseData);
  }

  getListExercise() {
    return this.exercisesRepository.findAll();
  }

  async getListPaginatedExercise(
    page?: number,
    pageSize?: number,
    userId?: string
  ) {
    const condition = {where: {assignerId: userId}}
    const count = this.exercisesRepository.count(condition);
    const items = this.exercisesRepository.findAllPaginationModeStudent({
      page,
      pageSize,
      ...condition
    });

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

  async getListPaginatedExerciseModeStudent(
    page?: number,
    pageSize?: number,
    classId?: string
  ) {
    const condition = {where: {classAssigneeId: classId}}
    const count = this.exercisesRepository.count(condition);
    const items = this.exercisesRepository.findAllPaginationModeStudent({
      page,
      pageSize,
      ...condition
    });

    const promise = await Promise.all([count, items])

    const itemFilter = promise[1].map((exercise: any) => {
      const {answers, ...rest} = exercise;
      const distinctAnswers = new Set(answers.map(answer => answer.userId))

      return {
        ...rest,
        countDoneStudent: distinctAnswers.size
      }}
    )

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

  async getExerciseById(id: string): Promise<{data: Exercise }> {
    const exercise = await this.exercisesRepository.findByIdWithQuestion(id);
    if (!exercise) {
      throw new BaseException(Errors.EXERCISE.EXERCISE_NOT_FOUND);
    }
    return {data: exercise};
  }

  async getStudentsByExerciseId(id: string): Promise<{ data: Exercise }> {
    const exercise = await this.exercisesRepository.findStudentsByExerciseId(id);
    if (!exercise) {
      throw new BaseException(Errors.EXERCISE.EXERCISE_NOT_FOUND);
    }
    return {data: exercise};
  }

  async updateExercise(id: string, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findById(id);
    if (!exercise) {
      throw new BaseException(Errors.EXERCISE.EXERCISE_NOT_FOUND);
    }

    const updateExerciseData = {
      ...updateExerciseDto,
    } as any;

    const updatedExercise = await this.exercisesRepository.updateById(
      id,
      updateExerciseData,
    );
    return updatedExercise;
  }

  async deleteExerciseById( id: string) {
    const exercise = await this.exercisesRepository.findById(id);
    if (!exercise) {
      throw new BaseException(Errors.EXERCISE.EXERCISE_NOT_FOUND);
    }

    return this.exercisesRepository.softDeleteById(id);
  }
}
