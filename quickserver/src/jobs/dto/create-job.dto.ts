import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  salary?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  type?: string; // Full-time, Part-time, Contract, Internship

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
