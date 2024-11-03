import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {IsArray, IsOptional} from 'class-validator';

export class FilterUserDto {
    @ApiProperty({
        required: false,
        example: [1, 2, 3],
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @Transform(({value}) => {
        if (!Array.isArray(value)) {
            return [Number(value)];
        }
        return value.map(Number);
    })
    categoryIds: number[];

    @ApiProperty({
        example: ['true', 'false'],
        description: 'Filter by isActive. Accepts true or false as strings.',
        required: false,
    })
    @IsArray()
    @IsOptional()
    @Transform(({value}) => {
        if (!Array.isArray(value)) {
            return [value === 'true'];
        }
        return value.map((item) => {
            if (item === 'true') {
                return true;
            }
            if (item === 'false') {
                return false;
            }
            return item;
        });
    })
    isActive?: boolean[];
}
