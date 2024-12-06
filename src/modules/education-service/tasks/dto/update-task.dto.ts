import {PartialType} from '@nestjs/swagger';
import {CreateTaskDto} from "@n-modules/education-service/tasks/dto/create-task.dto";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
}
