import { PartialType } from '@nestjs/swagger';
import {CreateBookImportDto} from "@n-modules/education-service/books-import/dto/create-book-import.dto";

export class UpdateBookImportDto extends PartialType(CreateBookImportDto) {
}
