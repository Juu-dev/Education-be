import { Module } from '@nestjs/common';
import { ClassesModule } from '@n-modules/education-service/classes/classes.module';
import { StudentsModule } from '@n-modules/education-service/students/students.module';
import { DocumentsModule } from './documents/documents.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [DocumentsModule, TeachersModule, ClassesModule, StudentsModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class EducationServiceModule {
}
