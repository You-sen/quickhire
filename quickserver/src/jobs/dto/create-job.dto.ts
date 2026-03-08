import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({
    description: 'Job title',
    example: 'Senior Full Stack Developer',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Company name',
    example: 'TechCorp Inc.',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({
    description: 'Job location',
    example: 'San Francisco, CA',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Job category',
    example: 'Software Development',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Short job description',
    example: 'We are looking for an experienced Full Stack Developer to join our team...',
    minLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Full detailed job description',
    example: 'We are seeking an experienced Full Stack Developer...',
  })
  @IsString()
  @IsOptional()
  fullDescription?: string;

  @ApiPropertyOptional({
    description: 'List of job responsibilities',
    example: ['Develop and maintain web applications', 'Collaborate with design team'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  responsibilities?: string[];

  @ApiPropertyOptional({
    description: 'List of job requirements',
    example: ['5+ years of experience with React', 'Bachelor\'s degree in Computer Science'],
    type: [String],
  })
  @IsArray()
  @IsOptional()
  requirements?: string[];

  @ApiPropertyOptional({
    description: 'Salary range or compensation details',
    example: '$120,000 - $150,000 per year',
  })
  @IsString()
  @IsOptional()
  salary?: string;

  @ApiPropertyOptional({
    description: 'Employment type',
    example: 'Full-time',
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    description: 'Whether the job posting is active',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the job is featured',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    description: 'Job posting date',
    example: '2024-03-01',
  })
  @IsString()
  @IsOptional()
  postedDate?: string;

  @ApiPropertyOptional({
    description: 'Company logo URL',
    example: '/companies/techcorp.svg',
  })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiPropertyOptional({
    description: 'Logo background color class',
    example: 'bg-blue-500',
  })
  @IsString()
  @IsOptional()
  logoColor?: string;
}
