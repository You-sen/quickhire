import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  salary?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
