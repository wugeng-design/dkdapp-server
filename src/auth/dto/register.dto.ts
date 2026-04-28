import { IsNotEmpty, IsPhoneNumber, IsString, Length, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsPhoneNumber('CN')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nickname: string;
}