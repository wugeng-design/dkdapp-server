import { IsNotEmpty, IsString, IsArray, IsOptional, MinLength } from 'class-validator';

export class CreateFigureDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  era: string;

  @IsOptional()
  eraOrder?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  bio: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coreThoughts?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  works?: string[];
}