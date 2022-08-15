import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { StatusField } from 'src/main-engine/common/enum';

export class ChangeStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber({}, { each: true, message: 'each value in  must be a number' })
  ids: number[];

  @ApiProperty({
    enum: StatusField,
    examples: [
      StatusField.ACTIVE,
      StatusField.INACTIVE,
      StatusField.DRAFT,
      StatusField.DELETED,
    ],
  })
  @IsNotEmpty()
  @IsEnum(StatusField)
  status: StatusField;
}
