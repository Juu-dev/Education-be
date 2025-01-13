import { Module } from '@nestjs/common';
import { ClassesModule } from '@n-modules/education-service/classes/classes.module';
import { StudentsModule } from '@n-modules/education-service/students/students.module';
import { DocumentsModule } from './documents/documents.module';
import { TeachersModule } from './teachers/teachers.module';
import {TasksModule} from "@n-modules/education-service/tasks/tasks.module";
import {BooksModule} from "@n-modules/education-service/books/books.module";
import {QuizzesModule} from "@n-modules/education-service/quizzes/quizzes.module";
import {ExercisesModule} from "@n-modules/education-service/exercises/exercises.module";
import {BooksImportModule} from "@n-modules/education-service/books-import/books-import.module";

@Module({
  imports: [
    DocumentsModule,
    TeachersModule,
    ClassesModule,
    StudentsModule,
    TasksModule,
    BooksModule,
    QuizzesModule,
    ExercisesModule,
    BooksImportModule
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class EducationServiceModule {
}
