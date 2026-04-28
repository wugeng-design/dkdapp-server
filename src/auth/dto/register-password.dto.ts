import { IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class RegisterPasswordDto {
  @IsNotEmpty()
  @IsPhoneNumber('CN')
  phone: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nickname: string;
}