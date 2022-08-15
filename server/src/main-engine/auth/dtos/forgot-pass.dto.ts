import { UserTypesEnum } from 'src/main-engine/common/enum/user-types.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator';
export class ForgotPassDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsEnum(UserTypesEnum)
  @IsNotEmpty()
  readonly userTypeSlug: UserTypesEnum;
}
