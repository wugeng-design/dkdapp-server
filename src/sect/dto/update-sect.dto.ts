import { IsString, IsArray, IsOptional, MinLength } from 'class-validator';

export class UpdateSectDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  dynasty?: string;

  @IsOptional()
  @IsString()
  practice?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;

  @IsOptional()
  @IsArray()
  info?: Array<{ key: string; value: string }>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  representatives?: string[];

  @IsOptional()
  isActive?: boolean;
}