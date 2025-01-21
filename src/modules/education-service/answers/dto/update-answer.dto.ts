import {PartialType} from '@nestjs/swagger';
import {CreateAnswerDto} from "@n-modules/education-service/answers/dto/create-answer.dto";

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
}
