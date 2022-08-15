import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class FilterDataDto {
  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  readonly filter: any;

  @ApiProperty()
  @IsEnum(SortOrder)
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.toUpperCase())
  @IsDefined()
  sortOrder: SortOrder;

  @ApiProperty()
  @IsString()
  @IsDefined()
  sortField: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @Min(1)
  pageNumber: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @Min(1)
  pageSize: number;
}
