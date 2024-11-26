import {Module} from '@nestjs/common';
import {DocumentsModule} from './documents/documents.module';
import {TeachersModule} from './teachers/teachers.module';
import {ClassesModule} from "@n-modules/education-service/classes/classes.module";
import {StudentsModule} from "@n-modules/education-service/students/students.module";
import {TasksModule} from "@n-modules/education-service/tasks/tasks.module";

@Module({
    imports: [DocumentsModule, TeachersModule, ClassesModule, StudentsModule,TasksModule],
    providers: [],
    controllers: [],
    exports: [],
})
export class EducationServiceModule {
}
