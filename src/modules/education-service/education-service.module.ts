import { Module } from '@nestjs/common';
import { ClassesModule } from '@n-modules/education-service/classes/classes.module';
import { StudentsModule } from '@n-modules/education-service/students/students.module';
import { DocumentsModule } from './documents/documents.module';
import { TeachersModule } from './teachers/teachers.module';
import { LibrariesModule } from './libraries/libraries.module';

@Module({
  imports: [DocumentsModule, TeachersModule, ClassesModule, StudentsModule, LibrariesModule],
  providers: [],
  controllers: [],
  exports: [],
})
export class EducationServiceModule {
}
