import { IsNotEmpty, IsString, IsArray, IsOptional, MinLength } from 'class-validator';

export class CreateSectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  dynasty: string;

  @IsNotEmpty()
  @IsString()
  practice: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsOptional()
  @IsArray()
  info?: Array<{ key: string; value: string }>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  representatives?: string[];
}