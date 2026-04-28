import { IsString, IsArray, IsOptional, MinLength } from 'class-validator';

export class UpdateFigureDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  era?: string;

  @IsOptional()
  eraOrder?: number;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coreThoughts?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  works?: string[];

  @IsOptional()
  isActive?: boolean;
}