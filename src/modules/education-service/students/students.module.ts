import {Module} from '@nestjs/common';
import {PrismaModule} from '@n-database/prisma/prisma.module';
import {StudentsService} from './students.service';
import {StudentsController} from './students.controller';
import {StudentsRepository} from './students.repository';

@Module({
    controllers: [StudentsController],
    providers: [StudentsService, StudentsRepository],
    imports: [PrismaModule],
    exports: [StudentsService], // export StudentService to getStudentId in task comtroller
})
export class StudentsModule {
}
