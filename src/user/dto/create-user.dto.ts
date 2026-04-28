import { IsNotEmpty, IsPhoneNumber, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsPhoneNumber('CN')
  phone: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nickname: string;

  @IsString()
  avatar?: string;
}