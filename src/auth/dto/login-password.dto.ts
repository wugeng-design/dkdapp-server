import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginPasswordDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}