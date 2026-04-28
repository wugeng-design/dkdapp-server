import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsPhoneNumber('CN')
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  code: string;
}