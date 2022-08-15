import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserTypesEnum } from 'src/main-engine/common/enum/user-types.enum';

export class CheckActiveEmailDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsEnum(UserTypesEnum, { each: true })
  @IsString()
  @IsNotEmpty()
  readonly userTypeSlug: UserTypesEnum;
}
